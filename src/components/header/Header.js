import styled from 'styled-components';
import { Logo } from './Logo';

export function Header({ children }) {
  return (
    <HeaderContainer>
      <Logo />
      {children}
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (min-width: 950px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;
