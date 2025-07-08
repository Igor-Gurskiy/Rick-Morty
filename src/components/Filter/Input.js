import styled from 'styled-components';

const InputContainer = styled.div`
  width: 240px;
  position: relative;
  @media (min-width: 530px) {
    max-width: 180px;
  }
`;

const StyledInput = styled.input`
  padding: 8px 0 8px 8px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  border-radius: 8px;
  color: #fff;
  border: 1px solid #83bf46;
  outline: none;
  width: 100%;
  height: 40px;
  background-color: transparent;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &::placeholder {
    color: #b3b3b3;
  }

  &:hover {
    background-color: #334466;
  }
  &:focus {
    background-color: #334466;
  }
`;

export function Input({ placeholder, value, onChange, ...props }) {
  return (
    <InputContainer>
      <StyledInput
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
    </InputContainer>
  );
}
