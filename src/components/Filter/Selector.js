import styled from 'styled-components';
import { useCallback } from 'react';

const OptionList = styled.ul`
  background-color: #fff;
  border: 1px solid #d9d9d9;
  box-shadow: 0px 1px 4px rgba(12, 12, 13, 0.1),
    0px 1px 4px rgba(12, 12, 13, 0.05);
  border-radius: 8px;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 10;
  margin-top: 5px;
  list-style: none;
  background-color: #fff;
  border-radius: 8px;
  box-sizing: border-box;
  max-height: 200px;
  overflow-y: overlay;
  &::-webkit-scrollbar {
    width: 12px;
  }
  &::-webkit-scrollbar-track {
    margin: 8px 0;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #d9d9d9;
    border-radius: 6px;
    border: 4px solid transparent;
    background-clip: content-box;
  }
`;

const Option = styled.li`
  padding: 8px 0 8px 8px;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: ${({ isSelected }) => (isSelected ? 'bold' : 'normal')};

  &:hover {
    background: rgba(131, 191, 70, 0.2);
  }

  &:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  &:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

const SelectContainer = styled.div`
  position: relative;
  display: flex;
  width: 240px;

  @media (min-width: 530px) {
    max-width: 180px;
  }
`;

const IconButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 12px;
  border: none;
  width: 16px;
  height: 16px;
  background: transparent;
`;

const CrossIcon = styled(IconButton)`
  &:before,
  &:after {
    content: '';
    position: absolute;
    display: block;
    width: 8px;
    height: 1px;
    background: #fff;
    left: 50%;
    top: 50%;
    transform-origin: center;
  }

  &:before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  &:hover:before,
  &:hover:after {
    background-color: #83bf46;
  }
`;

const ArrowIcon = styled(IconButton)`
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '';
    display: block;
    width: 4px;
    height: 4px;
    border-right: 1px solid #fff;
    border-bottom: 1px solid #fff;
    transform: ${({ isOpened }) =>
      isOpened ? 'rotate(-135deg)' : 'rotate(45deg)'};
    margin-top: ${({ isOpened }) => (isOpened ? '2px' : '-2px')};
  }
`;

const CurrentOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ selected }) => (selected ? '#fff' : '#b3b3b3')};
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #83bf46;

  padding: 8px 0 8px 8px;
  width: 100%;
  background-color: ${({ isOpened }) => (isOpened ? '#334466' : 'transparent')};
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 40px;

  position: relative;

  &:hover {
    background-color: #334466;
  }
`;

export function Selector({
  options,
  isOpened,
  type,
  selected = null,
  onSelect,
  onClear,
  onToggle
}) {
  const handleClearClick = useCallback(
    (e) => {
      e.stopPropagation();
      onClear();
    },
    [onClear]
  );

  const handleOptionClick = useCallback(
    (option) => {
      onSelect(option.label);
    },
    [onSelect]
  );

  return (
    <>
      <SelectContainer>
        <CurrentOption
          selected={selected !== null}
          isOpened={isOpened}
          onClick={onToggle}
        >
          {selected !== null ? selected : type}
        </CurrentOption>
        {selected !== null ? (
          <CrossIcon onClick={handleClearClick} />
        ) : (
          <ArrowIcon isOpened={isOpened} onClick={onToggle} />
        )}
        {isOpened && (
          <OptionList>
            {options.map((option) => (
              <Option
                key={option.value}
                isSelected={option.label === selected}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </Option>
            ))}
          </OptionList>
        )}
      </SelectContainer>
    </>
  );
}
