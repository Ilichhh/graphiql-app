import React from 'react';
import { Header, Footer, Form } from '../components';

import { FormMode } from '../types';

import styled from 'styled-components';
import theme from '../theme';

const Container = styled.div`
  min-height: 100vh;
  background-color: ${theme.colors.bgBlue};
`;

interface FormPageProps {
  mode: FormMode;
}

export const FormPage = ({ mode }: FormPageProps) => (
  <Container>
    <Header currentPage="form" />
    <Form mode={mode} />
    <Footer />
  </Container>
);
