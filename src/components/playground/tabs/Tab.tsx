import React from 'react';
import styled from 'styled-components';
import theme from '../../../theme';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch, useTabsState } from '../../../hooks';
import { deleteTab, selectTab } from '../../../store/tabsSlice';
import { getDefaultQuery } from '../../../utils/defaultQuery';

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
  id: number;
  name: string;
  isActive: boolean;
  showCloseBtn: boolean;
}
export const Tab = ({ id, name, isActive, showCloseBtn }: TabProps) => {
  const dispatch = useAppDispatch();
  const handleDelete = (e: React.MouseEvent<SVGSVGElement>) => {
    dispatch(deleteTab(id));
    e.stopPropagation();
  };

  return (
    <>
      <TabWrapper isActive={isActive} onClick={() => dispatch(selectTab(id))}>
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
  const { endpoint, addTab } = useTabsState();

  return (
    <TabWrapper
      onClick={() =>
        addTab({
          name: '',
          endpoint: endpoint,
          query: getDefaultQuery(endpoint),
          variables: '',
          headers: '',
        })
      }
    >
      <AddBtn fontSize="medium" />
    </TabWrapper>
  );
};
