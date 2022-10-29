import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyBSxqWCFFruoqPeOVm5bBsV9Qb6E2ERFII',
    authDomain: 'crown-clothing-db-41da5.firebaseapp.com',
    projectId: 'crown-clothing-db-41da5',
    storageBucket: 'crown-clothing-db-41da5.appspot.com',
    messagingSenderId: '23125264780',
    appId: '1:23125264780:web:ff0efe715437a661c12ea9',
    measurementId: 'G-M1SWKBR7DV',
};


initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
    signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
    signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {}
) => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdOn = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdOn,
                ...additionalInformation,
            });
        } catch (err) {
            alert('Something went wrong. Please try again later.');
        }
    }
    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};
