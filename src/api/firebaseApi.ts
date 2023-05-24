import { UseFormSetError, FieldValues } from 'react-hook-form';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import {
  doc,
  setDoc,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  collection,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from '../firebase';

import { DocumentData } from '@firebase/firestore';

import i18n from '../i18n';

export const signUp = async (
  email: string,
  password: string,
  setError: UseFormSetError<FieldValues>
) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email,
    });
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

    if (expirationTime - now < 360000) {
      await auth.signOut();
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error getting token:', error);
    return false;
  }
};

export const saveQueryTemplate = async (templateData: DocumentData) => {
  try {
    const userUid = auth.currentUser?.uid;
    if (!userUid) return;

    const templatesRef = collection(doc(db, 'users', userUid), 'queryTemplates');
    const docRef = await addDoc(templatesRef, templateData);

    return docRef.id;
  } catch (error) {
    console.error(error);
  }
};

export const getAllQueryTemplates = async () => {
  try {
    const userUid = auth.currentUser?.uid;
    if (!userUid) return [];

    const templatesRef = collection(doc(db, 'users', userUid), 'queryTemplates');
    const querySnapshot = await getDocs(templatesRef);
    const templates = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));

    return templates;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const deleteQueryTemplate = async (templateId: string) => {
  try {
    const userUid = auth.currentUser?.uid;
    if (!userUid) return;

    const templateRef = doc(db, 'users', userUid, 'queryTemplates', templateId);
    await deleteDoc(templateRef);
  } catch (error) {
    console.error(error);
  }
};

export const renameQueryTemplate = async (templateId: string, newName: string) => {
  try {
    const userUid = auth.currentUser?.uid;
    if (!userUid) return;

    const templateRef = doc(db, 'users', userUid, 'queryTemplates', templateId);
    await updateDoc(templateRef, { name: newName });
  } catch (error) {
    console.error(error);
  }
};

export const saveQueryRunToHistory = async (queryRunData: DocumentData) => {
  try {
    const userUid = auth.currentUser?.uid;
    if (!userUid) return;

    const queryRunRef = collection(doc(db, 'users', userUid), 'runHistory');
    const docRef = await addDoc(queryRunRef, { ...queryRunData, date: serverTimestamp() });

    return docRef.id;
  } catch (error) {
    console.error(error);
  }
};

export const getAllQueriesHistory = async () => {
  try {
    const userUid = auth.currentUser?.uid;
    if (!userUid) return [];

    const queriesHistoryRef = collection(doc(db, 'users', userUid), 'runHistory');
    const querySnapshot = await getDocs(queriesHistoryRef);
    const history = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));

    return history;
  } catch (error) {
    console.error(error);
    return [];
  }
};
