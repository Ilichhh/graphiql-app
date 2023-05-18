import React, { useEffect, useState } from 'react';
import { getAllQueryTemplates } from '../../../api/firebaseApi';

import { QueryPreview } from './QueryPreview';
import { IconButton } from '@mui/material';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';

import theme from '../../../theme';
import styled from 'styled-components';

const Container = styled.aside`
  display: flex;
  flex-direction: column;
  width: 300px;
  color: ${theme.colors.textGrey};
  background-color: ${theme.colors.bgBlue};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 52px;
`;

const Tabs = styled.div`
  // height: 52px;
  // padding: 10px;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  padding-right: 0;
  border-top: 1px solid ${theme.colors.bgDarkBlue};
`;

interface SidebarProps {
  close: () => void;
}

export const Sidebar = ({ close }: SidebarProps) => {
  const [queriesArray, setQueriesArray] = useState<React.ReactNode[]>([]);

  const fetchData = async () => {
    const data = await getAllQueryTemplates();
    const qArr = data.map((template) => (
      <QueryPreview key={template.id} templateId={template.id} data={template.data} />
    ));
    setQueriesArray(qArr);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <Header>
        <Tabs>
          <IconButton>
            <BookmarkBorderOutlinedIcon />
          </IconButton>
          <IconButton disabled>
            <HistoryOutlinedIcon />
          </IconButton>
        </Tabs>
        <IconButton onClick={close}>
          <KeyboardDoubleArrowLeftIcon />
        </IconButton>
      </Header>
      <ContentBox>{queriesArray}</ContentBox>
    </Container>
  );
};
