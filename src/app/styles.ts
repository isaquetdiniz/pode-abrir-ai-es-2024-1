import styled from "styled-components";

export const BackgroundContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  background-image: url("/images/home_background.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(217, 217, 217, 0.8);
    z-index: 1;
  }

  p {
    position: relative;
    z-index: 2;
  }

  .content {
    position: relative;
    z-index: 2;
  }
`;

export const HomeScreenContainer = styled.div`
  position: relative;
  z-index: 2;
  size: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContentContainer = styled.div`
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ContentText = styled.p`
  color: black;
  margin-top: 40px;
  font-weight: bold;
  font-size: 24px;
`;

export const LoginButton = styled.button`
  background-color: #ff5e03;
  margin-top: 60px;
  font-size: 16px;
  width: 292px;
  height: 52px;
  border-radius: 14px;
`;
