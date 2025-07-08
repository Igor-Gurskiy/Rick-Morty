import styled from 'styled-components';

const StyledButton = styled.button`
  width: 240px;
  height: 40px;
  color: ${(props) => (props['data-type'] === 'reset' ? '#FF5152' : '#83BF46')};
  background-color: transparent;
  padding: 12px;
  border: solid 1px
    ${(props) => (props['data-type'] === 'reset' ? '#FF5152' : '#83BF46')};
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    color: #fff;
    background-color: ${(props) =>
      props['data-type'] === 'reset' ? '#FF5152' : '#83BF46'};
  }

  @media (min-width: 530px) {
    max-width: 85px;
  }
`;

export function Button({ text, onClick }) {
  const type = text.toLowerCase() === 'reset' ? 'reset' : 'apply';

  return (
    <StyledButton data-type={type} onClick={onClick}>
      {text}
    </StyledButton>
  );
}
