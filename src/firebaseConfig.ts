import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCFVSPwHgWs7r0T8Fr8kg9pExL5d-gEcXU",
  authDomain: "fir-auth-88d21.firebaseapp.com",
  projectId: "fir-auth-88d21",
  storageBucket: "fir-auth-88d21.firebasestorage.app",
  messagingSenderId: "885815206992",
  appId: "1:885815206992:web:edd61338e0e209db3f1d55"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth, firebaseConfig };

