import React from 'react';
import styled from 'styled-components';
import theme from '../../../theme';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch } from '../../../hooks/reduxTypedHooks';
import { selectTab } from '../../../store/tabsSlice';

const TabWrapper = styled.div<{ isActive?: boolean }>`
  display: flex;
  flex: 0 0 auto;
  gap: 5px;
  height: 43px;
  align-items: center;
  margin-right: 10px;
  padding: 10px;
  background-color: ${({ isActive }) =>
    isActive ? `${theme.colors.bgBlue}` : `${theme.colors.bgDarkBlue}`};
  user-select: none;

  &:hover {
    background-color: ${theme.colors.bgBlue};
    cursor: pointer;

    & .MuiSvgIcon-root {
      opacity: 1;
    }
  }
`;

const TabName = styled.span<{ isActive: boolean }>`
  background: transparent;
  color: ${theme.colors.textWhite};
  opacity: ${({ isActive }) => (isActive ? '1' : '0.5')};
  font-size: 14px;
  font-weight: 400;
  margin-left: 2px;
  letter-spacing: 0.53px;
`;

const CloseBtn = styled(CloseIcon)<{ isActive: boolean }>`
  opacity: ${({ isActive }) => (isActive ? '1' : '0')};

  &.MuiSvgIcon-root {
    fill: ${theme.colors.textInactive};
  }
`;

const AddBtn = styled(AddIcon)`
  &.MuiSvgIcon-root {
    fill: ${theme.colors.textInactive};
  }
`;

interface TabProps {
  id: string;
  name: string;
  isActive: boolean;
}
export const Tab = ({ id, name, isActive }: TabProps) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <TabWrapper isActive={isActive} onClick={() => dispatch(selectTab(id))}>
        <TabName isActive={isActive}>{name}</TabName>
        <CloseBtn isActive={isActive} fontSize="small" />
      </TabWrapper>
    </>
  );
};

export const TabPlus = () => {
  return (
    <TabWrapper>
      <AddBtn fontSize="medium" />
    </TabWrapper>
  );
};
