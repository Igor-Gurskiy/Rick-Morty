import styled from 'styled-components';
import { Button } from './Button';
import { Selector } from './Selector';
import { Input } from './Input';
import { useState, useCallback } from 'react';

const FilterContainer = styled.div`
  display: grid;
  justify-content: center;
  gap: 15px;

  @media (min-width: 530px) {
    grid-template-columns: repeat(3, 1fr);

    & > :nth-child(n + 4) {
      grid-row: 2;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 15px;

  @media (min-width: 530px) {
    flex-direction: row;
    gap: 10px;
  }
`;

export const Filter = ({
  filters,
  onFilterChange,
  onApplyFilters,
  onResetFilters,
  statusOptions,
  genderOptions,
  speciesOptions
}) => {
  const [openedSelector, setOpenedSelector] = useState(null);

  const toggleSelector = useCallback((type) => {
    setOpenedSelector((current) => (current === type ? null : type));
  }, []);

  const handleNameChange = useCallback(
    (e) => {
      onFilterChange('name', e.target.value);
    },
    [onFilterChange]
  );

  const handleTypeChange = useCallback(
    (e) => {
      onFilterChange('type', e.target.value);
    },
    [onFilterChange]
  );

  return (
    <FilterContainer>
      <Selector
        type="Status"
        isOpened={openedSelector === 'Status'}
        options={statusOptions}
        selected={filters.status}
        onSelect={(value) => {
          onFilterChange('status', value);
          setOpenedSelector(null);
        }}
        onClear={() => {
          onFilterChange('status', null);
          setOpenedSelector(null);
        }}
        onToggle={() => toggleSelector('Status')}
      />
      <Selector
        type="Gender"
        isOpened={openedSelector === 'Gender'}
        options={genderOptions}
        selected={filters.gender}
        onSelect={(value) => {
          onFilterChange('gender', value);
          setOpenedSelector(null);
        }}
        onClear={() => onFilterChange('gender', null)}
        onToggle={() => toggleSelector('Gender')}
      />
      <Selector
        type="Species"
        isOpened={openedSelector === 'Species'}
        options={speciesOptions}
        selected={filters.species}
        onSelect={(value) => {
          onFilterChange('species', value);
          setOpenedSelector(null);
        }}
        onClear={() => onFilterChange('species', null)}
        onToggle={() => toggleSelector('Species')}
      />
      <Input
        placeholder="Name"
        value={filters.name}
        onChange={handleNameChange}
      />
      <Input
        placeholder="Type"
        value={filters.type}
        onChange={handleTypeChange}
      />
      <ButtonContainer>
        <Button text="Apply" onClick={onApplyFilters} />
        <Button text="Reset" onClick={onResetFilters} />
      </ButtonContainer>
    </FilterContainer>
  );
};
