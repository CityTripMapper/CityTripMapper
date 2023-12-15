import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "a5aedf41-8d90-498f-88fb-cd9553e469e7",
    authDomain: 'citytripmapper.firebaseapp.com',
    databaseURL: 'citytripmapper',
    projectId: 'citytripmapper.appspot.com',
    storageBucket: 'citytripmapper.appspot.com',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId: 'YOUR_APP_ID',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
