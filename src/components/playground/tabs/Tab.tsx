import React from 'react';
import styled from 'styled-components';
import theme from '../../../theme';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch } from '../../../hooks/reduxTypedHooks';
import { addTab, deleteTab, selectTab } from '../../../store/tabsSlice';

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

const CloseBtn = styled(CloseIcon)`
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
  index: number;
  name: string;
  isActive: boolean;
  showCloseBtn: boolean;
}
export const Tab = ({ index, name, isActive, showCloseBtn }: TabProps) => {
  const dispatch = useAppDispatch();
  const handleDelete = (e: React.MouseEvent<SVGSVGElement>) => {
    dispatch(deleteTab(index));
    e.stopPropagation();
  };

  return (
    <>
      <TabWrapper isActive={isActive} onClick={() => dispatch(selectTab(index))}>
        <TabName isActive={isActive}>{name}</TabName>
        {showCloseBtn && (
          <CloseBtn
            fontSize="small"
            onClick={handleDelete}
            sx={{ opacity: isActive ? '1' : '0' }}
          />
        )}
      </TabWrapper>
    </>
  );
};

export const TabPlus = () => {
  const dispatch = useAppDispatch();

  return (
    <TabWrapper onClick={() => dispatch(addTab('New Tab'))}>
      <AddBtn fontSize="medium" />
    </TabWrapper>
  );
};
