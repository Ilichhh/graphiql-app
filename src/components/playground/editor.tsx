import React from 'react';
import styled from 'styled-components';
import theme from '../../theme';
import { CodeEditor } from './codemirror';
import { DocsPanel } from './docsExplorer/docsPanel';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  background: ${theme.colors.bgDarkBlue};
  flex: 1 1 0;
`;

const EditorBox = styled.section`
  position: relative;
  display: flex;
  flex: 1 1 0;
  flex-flow: column;
`;

const EditorTools = styled.section`
  display: flex;
  background: ${theme.colors.bgBlack};
  flex-direction: column;
`;

const Bar = styled.div`
  display: flex;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.5px;
  font-size: 0.9rem;
  padding: 10px 14px 15px 21px;
  user-select: none;
  @media (max-width: 600px) {
    padding: 8px;
    font-size: 0.6rem;
  }
`;

const Tab = styled.span`
  display: flex;
  margin-right: 20px;
  flex-shrink: 0;
  cursor: pointer;
  color: ${(props) => props.color || `${theme.colors.textInactive}`};
`;

interface EditorProps {
  endpoint: string;
  query: string;
  onChange: (query: string) => void;
}

export const Editor = ({ endpoint, query, onChange }: EditorProps) => {
  return (
    <Container>
      <EditorBox>
        <CodeEditor value={query} onChange={onChange} />
      </EditorBox>
      <EditorTools>
        <Bar>
          <Tab color={`${theme.colors.textGrey}`}>Query Variables</Tab>
          <Tab>HTTP Headers</Tab>
        </Bar>
      </EditorTools>
      <DocsPanel endpoint={endpoint} />
    </Container>
  );
};
