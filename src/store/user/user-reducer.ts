import { AuthError, AuthErrorCodes } from 'firebase/auth';
import { AnyAction } from 'redux';
import { UserData } from '../../utils/firebase/firbase.utils';
import {
    signInFailed,
    signInSucess,
    signOutFailed,
    signOutSuccess,
    signUpFailed,
} from './user.action';

export type UserReudcerState = {
    readonly currentUser: UserData | null;
    readonly isLoading: boolean;
    readonly error: Error | null;
};

const INITIAL_STATE: UserReudcerState = {
    currentUser: null,
    isLoading: false,
    error: null,
};

export const userReducer = (
    state = INITIAL_STATE,
    action: AnyAction
): UserReudcerState => {
    if (signInSucess.match(action)) {
        return {
            ...state,
            currentUser: action.payload,
        };
    }

    if (signOutSuccess.match(action)) {
        return {
            ...state,
            currentUser: null,
        };
    }

    if (
        signOutFailed.match(action) ||
        signInFailed.match(action) ||
        signUpFailed.match(action)
    ) {
        const error = action.payload;
        if ((error as AuthError)?.code) {
            if ((error as AuthError).code === AuthErrorCodes.WEAK_PASSWORD) {
                alert('Weak Password');
            } else if (
                (error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS
            ) {
                alert('Cannot create user, email already in use.');
            } else if (
                (error as AuthError).code === AuthErrorCodes.INVALID_PASSWORD
            ) {
                alert('Incorrect password for this email');
            } else if (
                (error as AuthError).code === AuthErrorCodes.USER_DELETED
            ) {
                alert('No user is associated with this email');
            } else {
                alert('Something went wrong. Please try again later.');
            }
        }
        return {
            ...state,
            error: action.payload,
        };
    }

    return state;
};
