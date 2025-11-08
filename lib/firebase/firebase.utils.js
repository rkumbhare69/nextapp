// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import bcrypt from "bcryptjs";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDI1hhxtpQQ39WB8RwAvLcZf7fXDCVgY34",
    authDomain: "nextlevel-food-dfa67.firebaseapp.com",
    projectId: "nextlevel-food-dfa67",
    storageBucket: "nextlevel-food-dfa67.firebasestorage.app",
    messagingSenderId: "62978423739",
    appId: "1:62978423739:web:d4933a5913cbf24cd5629e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters(
    { prompt: "select_account" }
);

export const signInWithGoogle = async () => signInWithPopup(auth, googleProvider);

export const createUserDocFromAuth = async (userAuth) => {
    const { uid, displayName, email, password } = userAuth;
    const docRef = doc(db, 'users', uid);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
        console.log('user found ' + email);
    } else {
        console.log('user not found ' + email);
        const name = displayName.split(' ');
        const firstname = name && name.length > -1 ? name[0] : 'firstname';
        const lastname = name && name.length > 0 ? name[1] : 'lastname';
        try {
            await setDoc(docRef, {
                firstname,
                lastname,
                email,
                password,
                createdAt: new Date()
            });
            console.log('user is created successfully!');
        } catch (error) {
            throw new Error('Login with Google failed for the google account : ' + email);
        }
    }

    return docRef;
}

export const checkEmailInUsed = async (email) => {
    const userDocRef = doc(db, 'users', email);
    const docSnapshot = await getDoc(userDocRef);
    return docSnapshot.exists();
}

export const authenticateUser = async (credentials) => {
    const {email, password, token} = credentials;

    if(token){
        // if google session is already created and token is valid then return accessToken as is
        return {email, id: credentials, accessToken: credentials.token };
    }

    const docRef = doc(db, 'users', email);
    const docSnapshot = await getDoc(docRef);

    if (!docSnapshot.exists()) {
        throw new Error('User not found!');
    }

    const userData = docSnapshot.data();
    const isValid = await bcrypt.compare(credentials.password, userData.password);

    if (!isValid) {
        throw new Error('Please enter valid email or password!');
    }

    return userData;
}

