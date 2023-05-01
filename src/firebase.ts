import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'graphiql-app-bdcaf.firebaseapp.com',
  projectId: 'graphiql-app-bdcaf',
  storageBucket: 'graphiql-app-bdcaf.appspot.com',
  messagingSenderId: '676594385201',
  appId: '1:676594385201:web:6b1bc1a48399f20f8f7010',
};

export const app = initializeApp(firebaseConfig);
