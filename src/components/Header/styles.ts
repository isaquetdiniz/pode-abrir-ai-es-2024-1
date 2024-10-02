import { CgProfile } from "react-icons/cg";
import { IoMdArrowDropdown } from "react-icons/io";
import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  height: 100px;
  background-color: #ff5e03;
  position: relative;
  z-index: 2;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 150px;
`;

export const LoginTextContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 70%;
  width: 100vw;
  margin-left: 70px;
`;

export const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  p {
    margin: 0;
    font-size: 16px;
    color: #ffffff;
  }

  svg {
    color: #ffffff;
  }
`;

export const ProfileContainer = styled.div`
  display: flex;
  margin-right: 150px;
  gap: 50px;
  align-items: center;
`;

export const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  svg {
    color: white;
  }

  p {
    font-size: 16px;
    color: white;
    margin: 0;
  }
`;

export const ProfileIcon = styled(CgProfile)`
  font-size: 40px;
`;

export const ArrowIcon = styled(IoMdArrowDropdown)`
  font-size: 20px;
`;
