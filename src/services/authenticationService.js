import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

const signIn = async (email, password){
    try{
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        return userCredential.user;
    } catch (error){
        console.error("Error signing in:", error);
        throw error;
    }
};

const signOut = async () => {
    try{
        await auth.signOut();
    } catch(error){
        console.error("Error signing out:", error);
        throw error;
    }
}

export { auth, signIn, signOut};

  