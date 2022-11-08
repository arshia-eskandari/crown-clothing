import { takeLatest, put, all, call } from 'redux-saga/effects';
import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
    getCurrentUser,
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup,
    signOutUser,
} from '../../utils/firebase/firbase.utils';
import {
    signInFailed,
    signInSucess,
    signOutFailed,
    signOutSuccess,
    signUpFailed,
    signUpSucess,
} from './user.action';
import { USER_ACTIONS_TYPE } from './user.types';

export function* getSnapshotFromUserAuth(userAuth, additonalDetails) {
    try {
        const userSnapshot = yield call(
            createUserDocumentFromAuth,
            userAuth,
            additonalDetails
        );
        yield put(
            signInSucess({ id: userSnapshot.id, ...userSnapshot.data() })
        );
    } catch (err) {
        yield put(signInFailed(err));
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield call(signInWithGooglePopup);
        yield call(getSnapshotFromUserAuth, user);
    } catch (err) {
        yield put(signInFailed(err));
    }
}

export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield call(
            signInAuthUserWithEmailAndPassword,
            email,
            password
        );
        yield call(getSnapshotFromUserAuth, user);
    } catch (err) {
        yield put(signInFailed(err));
    }
}

export function* signUp({ payload: { email, password, displayName } }) {
    try {
        const { user } = yield call(
            createAuthUserWithEmailAndPassword,
            email,
            password
        );
        yield put(signUpSucess(user, { displayName }));
    } catch (err) {
        yield signUpFailed(err);
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser);
        if (!userAuth) return;
        yield call(getSnapshotFromUserAuth, userAuth);
    } catch (err) {
        yield put(signInFailed(err));
    }
}

export function* signOut() {
    try {
        yield call(signOutUser);
        yield put(signOutSuccess())
    } catch (err) {
        yield put(signOutFailed(err))
    }
}

export function* signInAfterSignUp({ payload: { user, additonalDetails } }) {
    yield call(getSnapshotFromUserAuth, user, additonalDetails);
}

export function* onGoogleSignInStart() {
    yield takeLatest(USER_ACTIONS_TYPE.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTIONS_TYPE.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onEmailSignInStart() {
    yield takeLatest(USER_ACTIONS_TYPE.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignUpStart() {
    yield takeLatest(USER_ACTIONS_TYPE.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
    yield takeLatest(USER_ACTIONS_TYPE.SIGN_UP_SUCESS, signInAfterSignUp);
}

export function* onSignOutStart() {
    yield takeLatest(USER_ACTIONS_TYPE.SIGN_OUT_START, signOut)
}

export function* userSagas() {
    yield all([
        call(onCheckUserSession),
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onSignOutStart)
    ]);
}
