import {initializeApp} from 'firebase/app';
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from 'firebase/auth';
import {collection, doc, getDoc, getDocs, getFirestore, query, setDoc, writeBatch,} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyDBb4PtGx1YWbtYVrNXq8EmYfwSNzHT2qQ',
    authDomain: 'crwn-clothing-8734c.firebaseapp.com',
    projectId: 'crwn-clothing-8734c',
    storageBucket: 'crwn-clothing-8734c.appspot.com',
    messagingSenderId: '602494924797',
    appId: '1:602494924797:web:35ff5847f536729cb98b94'
};

// Initialize Firebase
initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log('batch done');
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapShot = await getDocs(q);

    return querySnapShot.docs.map(docSnapShot => docSnapShot.data());
}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (e) {
            console.log('Error creating the user', e.message);
        }
    }

    return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);