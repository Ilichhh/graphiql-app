import React from 'react';
import { Header } from '../components/Header';
import { Form } from '../components/Form';
import { Container } from '../components';

interface FormPageProps {
  mode: 'login' | 'register';
}

export const FormPage = ({ mode }: FormPageProps) => (
  <Container>
    <Header currentPage="form" />
    <Form mode={mode} />
  </Container>
);
