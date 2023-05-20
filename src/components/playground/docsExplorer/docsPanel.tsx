import React, { useEffect, useState } from 'react';
import { useTabsState } from '../../../hooks/useTabsState';
import { DocsNavProvider } from './docsContext';
import styled from 'styled-components';
import { DocsTab } from './docsTab';
import { Explorer } from './explorer';
import { useGraphQLSchema } from '../../../hooks/useGraphQLSchema';

interface ExplorerWrapperProps {
  isOpen: boolean;
}

const DocsPanelWrapper = styled.div<ExplorerWrapperProps>`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 15;
  width: ${(props) => (props.isOpen ? '420px' : 0)};
  height: 100%;
  @media (max-width: 600px) {
    width: ${(props) => (props.isOpen ? '250px' : 0)};
  }
`;

const DocsPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { endpoint } = useTabsState();
  const { schema } = useGraphQLSchema(endpoint);

  useEffect(() => {
    if (!schema) {
      setIsOpen(false);
    }
  }, [schema]);

  return (
    <>
      {schema && (
        <DocsPanelWrapper isOpen={isOpen}>
          <DocsNavProvider>
            <Explorer />
            <DocsTab
              isOpen={isOpen}
              onChange={() => {
                setIsOpen((prev) => !prev);
              }}
            />
          </DocsNavProvider>
        </DocsPanelWrapper>
      )}
    </>
  );
};

export default DocsPanel;
