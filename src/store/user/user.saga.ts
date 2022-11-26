import { takeLatest, put, all, call } from 'typed-redux-saga/macro';
import { User } from 'firebase/auth';
import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
    getCurrentUser,
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup,
    signOutUser,
    AdditionalInfo,
} from '../../utils/firebase/firbase.utils';
import {
    EmailSignInStart,
    signInFailed,
    signInSucess,
    signOutFailed,
    signOutSuccess,
    signUpFailed,
    signUpSucess,
    SignUpStart,
    SignUpSuccess,
} from './user.action';
import { USER_ACTIONS_TYPE } from './user.types';

export function* getSnapshotFromUserAuth(
    userAuth: User,
    additonalDetails?: AdditionalInfo
) {
    try {
        const userSnapshot = yield* call(
            createUserDocumentFromAuth,
            userAuth,
            additonalDetails
        );

        if (userSnapshot) {
            yield* put(
                signInSucess({ id: userSnapshot.id, ...userSnapshot.data() })
            );
        }
    } catch (err) {
        yield* put(signInFailed(err as Error));
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield* call(signInWithGooglePopup);

        yield* call(getSnapshotFromUserAuth, user);
    } catch (err) {
        yield* put(signInFailed(err as Error));
    }
}

export function* signInWithEmail({
    payload: { email, password },
}: EmailSignInStart) {
    try {
        const userCred = yield* call(
            signInAuthUserWithEmailAndPassword,
            email,
            password
        );

        if (userCred) {
            const { user } = userCred;
            yield* call(getSnapshotFromUserAuth, user);
        }
    } catch (err) {
        yield* put(signInFailed(err as Error));
    }
}

export function* signUp({
    payload: { email, password, displayName },
}: SignUpStart) {
    try {
        const userCred = yield* call(
            createAuthUserWithEmailAndPassword,
            email,
            password
        );

        if (userCred) {
            const { user } = userCred;
            yield* put(signUpSucess(user, { displayName }));
        }
    } catch (err) {
        yield* put(signUpFailed(err as Error));
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield* call(getCurrentUser);
        if (!userAuth) return;
        yield* call(getSnapshotFromUserAuth, userAuth);
    } catch (err) {
        yield* put(signInFailed(err as Error));
    }
}

export function* signOut() {
    try {
        yield* call(signOutUser);
        yield* put(signOutSuccess());
    } catch (err) {
        yield* put(signOutFailed(err as Error));
    }
}

export function* signInAfterSignUp({
    payload: { user, additionalDetails },
}: SignUpSuccess) {
    yield* call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* onGoogleSignInStart() {
    yield* takeLatest(USER_ACTIONS_TYPE.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onCheckUserSession() {
    yield* takeLatest(
        USER_ACTIONS_TYPE.CHECK_USER_SESSION,
        isUserAuthenticated
    );
}

export function* onEmailSignInStart() {
    yield* takeLatest(USER_ACTIONS_TYPE.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignUpStart() {
    yield* takeLatest(USER_ACTIONS_TYPE.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
    yield* takeLatest(USER_ACTIONS_TYPE.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart() {
    yield* takeLatest(USER_ACTIONS_TYPE.SIGN_OUT_START, signOut);
}

export function* userSagas() {
    yield* all([
        call(onCheckUserSession),
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onSignOutStart),
    ]);
}
