import firebase from 'firebase';
import 'firebase/firestore';

if (firebase.apps.length === 0) {
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_FIREBASE_APP_ID
  };
  firebase.initializeApp(firebaseConfig);
}

export default function () {
  const db = firebase.firestore();

  const getCurrentUser = () => firebase.auth().currentUser;

  const getData = async () => {
    return await db
      .doc(`data/data`)
      .get()
      .then(doc => {
        return { id: doc.id, ...doc.data() };
      });
  };

  return {
    getCurrentUser,
    getData
  };
}
