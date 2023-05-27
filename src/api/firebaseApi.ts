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

import { store } from '../store/store';
import { setError as setToastError } from '../store/errorState';

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
      store.dispatch(setToastError({ error: i18n.t('firebase.signUpError') as string }));
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
      store.dispatch(setToastError({ error: i18n.t('firebase.signInError') as string }));
    }
  }
};

export const logOut = async () => {
  try {
    signOut(auth);
  } catch (error) {
    store.dispatch(setToastError({ error: i18n.t('firebase.logOutError') as string }));
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
    store.dispatch(setToastError({ error: i18n.t('sidebar.saveTemplateError') as string }));
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
    store.dispatch(setToastError({ error: i18n.t('sidebar.fetchTemplatesError') as string }));

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
    store.dispatch(setToastError({ error: i18n.t('sidebar.deleteTemplateError') as string }));
  }
};

export const renameQueryTemplate = async (templateId: string, newName: string) => {
  try {
    const userUid = auth.currentUser?.uid;
    if (!userUid) return;

    const templateRef = doc(db, 'users', userUid, 'queryTemplates', templateId);
    await updateDoc(templateRef, { name: newName });
  } catch (error) {
    store.dispatch(setToastError({ error: i18n.t('sidebar.renameTemplateError') as string }));
  }
};

export const saveQueryRunToHistory = async (queryRunData: DocumentData) => {
  try {
    const userUid = auth.currentUser?.uid;
    if (!userUid) return;

    const queryRunRef = collection(doc(db, 'users', userUid), 'runHistory');
    const docRef = await addDoc(queryRunRef, { data: queryRunData, timestamp: serverTimestamp() });

    return docRef.id;
  } catch (error) {
    store.dispatch(setToastError({ error: i18n.t('sidebar.saveHistoryError') as string }));
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
      timestamp: doc.data().timestamp?.toMillis(),
      data: doc.data().data,
    }));

    return history;
  } catch (error) {
    store.dispatch(setToastError({ error: i18n.t('sidebar.fetchHistoryError') as string }));

    return [];
  }
};
