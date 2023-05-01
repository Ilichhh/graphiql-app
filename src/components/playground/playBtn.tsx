import React from 'react';
import styled from 'styled-components';
import theme from '../../theme';
import playSvg from '../../assets/img/play-arrow-rounded.svg';

const ButtonContainer = styled.div`
  display: flex;
  position: absolute;
  top: 70px;
  left: calc(50% - 55px);
  margin: 0 15px;
  z-index: 10;
  @media (max-width: 600px) {
    top: 10px;
    left: initial;
    right: 5px;
    margin: 0;
  }
`;

const PlayBtnSvgContainer = styled.div`
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.bgPlayBtn};
  border: 6px solid ${theme.colors.bgBlack};
  cursor: pointer;
  border-radius: 50%;
  &:hover {
    background-color: ${theme.colors.bgPlayBtnHover};
  }

  @media (max-width: 600px) {
    width: 40px;
    height: 40px;
  }
`;

const PlayBtnSvg = styled.div`
  background-image: url(${playSvg});
  background-size: contain;
  height: 45px;
  width: 45px;
  @media (max-width: 600px) {
    width: 20px;
    height: 20px;
  }
`;

export const PlayButton = () => {
  return (
    <ButtonContainer>
      <PlayBtnSvgContainer>
        <PlayBtnSvg />
      </PlayBtnSvgContainer>
    </ButtonContainer>
  );
};
