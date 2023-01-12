import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
    NextOrObserver,
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    query,
    getDocs,
    QueryDocumentSnapshot,
} from 'firebase/firestore';
import { Category } from '../../store/categories/categories.types';

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

// export type ObjectToAdd = {
//    title: string;
// }
// export const addCollectionAndDocuments = async <T extends ObjectToAdd> (
//     collectionKey: string,
//     objectsToAdd: T[],
// ): Promise<void> => {
//     const collectionRef = collection(db, collectionKey);
//     const batch = writeBatch(db);

//     objectsToAdd.forEach(obj => {
//         const docRef = doc(collectionRef, obj.title.toLowerCase());
//         batch.set(docRef, obj);
//     });

//     await batch.commit();
// };

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(
        docSnapshot => docSnapshot.data() as Category
    );
};

export type AdditionalInfo = {
    displayName?: string;
};

export type UserData = {
    createdOn: Date;
    displayName: string;
    email: string;
};

export const createUserDocumentFromAuth = async (
    userAuth: User,
    additionalInformation = {} as AdditionalInfo
): Promise<void | QueryDocumentSnapshot<UserData>> => {
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

    return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (
    email: string,
    password: string
) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
    email: string,
    password: string
) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
    onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            userAuth => {
                unsubscribe();
                resolve(userAuth);
            },
            reject
        );
    });
};
