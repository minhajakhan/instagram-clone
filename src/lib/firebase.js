// import Firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/auth';

import Firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const config = {
    apiKey: "AIzaSyBQ8ni9o7sNpLmNofbvSAh5NBCfcbsTq1I",
    authDomain: "instagram-f1a2d.firebaseapp.com",
    projectId: "instagram-f1a2d",
    storageBucket: "instagram-f1a2d.appspot.com",
    messagingSenderId: "940833251634",
    appId: "1:940833251634:web:160821804b607d101e772b",
    measurementId: "G-NDVV3X9CFG"
};

const firebase = Firebase.initializeApp(config)
const { FieldValue } = Firebase.firestore;

export { firebase, FieldValue }