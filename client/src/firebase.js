import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBD5cyB88j7qFNW8mT2RbPO3CCER0zyhRI",
    authDomain: "pwi-project-23da7.firebaseapp.com",
    projectId: "pwi-project-23da7",
    storageBucket: "pwi-project-23da7.appspot.com",
    messagingSenderId: "289391379088",
    appId: "1:289391379088:web:93f40cc87b625418f58e15",
    measurementId: "G-6BX9RTCHR2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export { db };


