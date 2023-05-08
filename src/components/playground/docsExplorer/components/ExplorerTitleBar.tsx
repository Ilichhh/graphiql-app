import React, { useContext } from 'react';
import styled from 'styled-components';
import { DocsNavContext } from '../docsContext';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import theme from '../../../../theme';

const Bar = styled.div<{ hasPreviousName: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  text-align: ${({ hasPreviousName }) => (hasPreviousName ? 'left' : 'center')};
  padding: 10px 0;
  width: 100%;
`;

const TypeName = styled.div`
  display: flex;
  align-items: center;
  color: ${theme.docs.args};
  cursor: pointer;
`;

const PrevName = styled.span`
  font-size: 0.9rem;
  font-weight: 400;
  letter-spacing: 0.3px;
`;

const Title = styled.h1`
  margin: 0 auto;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.3px;
  overflow-x: hidden;
  text-overflow: ellipsis;
`;

export const ExplorerTitleBar = () => {
  const { getCurrent, getPreviousName, pop } = useContext(DocsNavContext);
  const { name } = getCurrent();
  const previousName = getPreviousName();

  return (
    <Bar hasPreviousName={!!previousName}>
      {previousName && (
        <TypeName onClick={pop}>
          <ArrowBackIosRoundedIcon fontSize="small" />
          <PrevName>{previousName}</PrevName>
        </TypeName>
      )}
      <Title>{name}</Title>
    </Bar>
  );
};
