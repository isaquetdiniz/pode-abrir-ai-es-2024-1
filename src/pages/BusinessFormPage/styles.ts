import styled from "styled-components";

export const BackgroundContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  background-image: url("/images/backgroundmap.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  p {
    position: relative;
    z-index: 2;
  }
  .content {
    position: relative;
    z-index: 2;
  }
`;
