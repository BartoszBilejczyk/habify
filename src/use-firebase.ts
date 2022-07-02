import firebase from 'firebase';
import 'firebase/firestore';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

if (firebase.apps.length === 0) {
  const firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_FIREBASE_APP_ID
  };
  firebase.initializeApp(firebaseConfig);
}

export default function () {
  const db = firebase.firestore();

  const getCurrentUser = () => firebase.auth().currentUser;
  const { push } = useRouter();

  onMounted(() => {
    firebase.auth().onAuthStateChanged(_user => {
      if (!_user?.email) {
        push({ name: 'login' });
      }
    });
  });

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
