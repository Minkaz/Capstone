import { initializeApp } from 'firebase/app';
import { 
    getAuth,
    signInWithPopup, 
    GoogleAuthProvider 
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyDBb4PtGx1YWbtYVrNXq8EmYfwSNzHT2qQ',
    authDomain: 'crwn-clothing-8734c.firebaseapp.com',
    projectId: 'crwn-clothing-8734c',
    storageBucket: 'crwn-clothing-8734c.appspot.com',
    messagingSenderId: '602494924797',
    appId: '1:602494924797:web:35ff5847f536729cb98b94'
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
   prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const  createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (e) {
            console.log('Error creating the user', e.message);
        }
    }

    return userDocRef
}