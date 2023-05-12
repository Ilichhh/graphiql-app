import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { UseFormSetError, FieldValues } from 'react-hook-form';
import i18n from './i18n';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'graphiql-app-bdcaf.firebaseapp.com',
  projectId: 'graphiql-app-bdcaf',
  storageBucket: 'graphiql-app-bdcaf.appspot.com',
  messagingSenderId: '676594385201',
  appId: '1:676594385201:web:6b1bc1a48399f20f8f7010',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const signUp = async (
  email: string,
  password: string,
  setError: UseFormSetError<FieldValues>
) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    const signInError = error as { code: string };
    if (signInError.code === 'auth/email-already-in-use') {
      setError('email', {
        type: 'custom',
        message: i18n.t('form.emailInUse') as string,
      });
    } else {
      console.error(error);
    }
  }
};

export const signIn = async (
  email: string,
  password: string,
  setError: UseFormSetError<FieldValues>
) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    const signInError = error as { code: string };
    if (signInError.code === 'auth/wrong-password') {
      setError('currentPassword', {
        type: 'custom',
        message: i18n.t('form.wrongPassword') as string,
      });
    } else if (signInError.code === 'auth/user-not-found') {
      setError('email', {
        type: 'custom',
        message: i18n.t('form.userNotFound') as string,
      });
    } else {
      console.error(error);
    }
  }
};

export const logOut = async () => {
  try {
    signOut(auth);
  } catch (error) {
    console.error(error);
  }
};

export const checkTokenExpiration = async () => {
  const user = auth.currentUser;
  if (!user) {
    return false;
  }

  try {
    const tokenResult = await user.getIdTokenResult();
    const now = new Date().getTime();
    const expirationTime = new Date(tokenResult.expirationTime).getTime();

    if (expirationTime - now < 0) {
      await auth.signOut();
      return true;
    }
  } catch (error) {
    console.error('Error getting token:', error);
    return false;
  }
};
