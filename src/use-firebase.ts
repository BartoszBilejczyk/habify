import firebase from 'firebase';
import 'firebase/firestore';

if (firebase.apps.length === 0) {
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
  };
  firebase.initializeApp(firebaseConfig);
}

export default function () {
  const db = firebase.firestore();

  const getCurrentUser = () => firebase.auth().currentUser;

  const getDoc = async (path: string) => {
    return await db
      .doc(path)
      .get()
      .then(doc => {
        return { id: doc.id, ...doc.data() };
      });
  };

  const getCollection = async (path: string) => {
    return await db
      .collection(path)
      .get()
      .then((doc: any) => {
        return { id: doc.id, ...doc.data() };
      });
  };

  const getCollectionWhere = async (path: string, where: any[]) => {
    return await db
      .collection(path)
      .where(where[0], where[1], where[2])
      .get()
      .then((doc: any) => {
        return { id: doc.id, ...doc.data() };
      });
  };

  const getCollectionFirstItem = async (path: string) => {
    return await db
      .collection(path)
      .get()
      .then((querySnapshot: any) => {
        const resultArray: any = [];

        querySnapshot.forEach((doc: any) => {
          resultArray.push({ id: doc.id, ...doc.data() });
        });

        return resultArray[0];
      });
  };

  const updateDoc = async (path: string, update: any) => {
    await db.doc(path).update(update);
  };

  const setDoc = async (path: string, update: any) => {
    await db.doc(path).set(update);
  };

  const addDoc = async (path: string, object: any) => {
    return await db
      .collection(path)
      .add({
        ...object,
        createdOn: Date.now(),
      })
      .then(docRef => {
        return docRef.get();
      });
  };

  const addDocId = async (path: string, object: any) => {
    return await db
      .collection(path)
      .add({
        ...object,
        createdOn: Date.now(),
      })
      .then(docRef => {
        return docRef.get();
      })
      .then(doc => {
        return doc.id;
      });
  };

  return {
    getCurrentUser,
    getDoc,
    getCollection,
    getCollectionFirstItem,
    updateDoc,
    addDoc,
    addDocId,
    setDoc,
    getCollectionWhere,
  };
}
