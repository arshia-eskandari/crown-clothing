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
        return {
            ...state,
            error: action.payload,
        };
    }

    return state;
};
