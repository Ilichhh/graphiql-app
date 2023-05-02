import React from 'react';
import { Header } from '../components/Header';
import { Form } from '../components/Form';

interface FormPageProps {
  mode: 'login' | 'register';
}

export const FormPage = ({ mode }: FormPageProps) => (
  <>
    <Header />
    <Form mode={mode} />
  </>
);
