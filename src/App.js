import styled from 'styled-components';
import { Pagination, ItemsGrid, useData, Header, AppState } from './components';
import { Filter } from './components/Filter/Filter';
import { useState } from 'react';
import { useCallback } from 'react';

const API_URL = 'https://rickandmortyapi.com/api/character/';

export function App() {
  const {
    allCharacters,
    isFetching,
    isError,
    setActivePage,
    setApiURL
  } = useData();
  const [filters, setFilters] = useState({
    name: '',
    type: '',
    status: null,
    gender: null,
    species: null
  });
  const [appliedFilters, setAppliedFilters] = useState({ ...filters });
  const handleFilterChange = useCallback(
    (field, value) => {
      setFilters({
        ...filters,
        [field]: value
      });
    },
    [filters]
  );
  const applyFilters = useCallback(() => {
    setAppliedFilters({ ...filters });
    const newURL = new URL(API_URL);
    Object.entries(filters).forEach(([key, value]) => {
      if (value) newURL.searchParams.set(key, value);
    });
    newURL.searchParams.set('page', 1);
    setApiURL(newURL.toString());
    setActivePage(0);
  }, [filters, setActivePage, setApiURL]);
  const resetFilters = useCallback(() => {
    const newFilters = {
      name: '',
      type: '',
      status: null,
      gender: null,
      species: null
    };
    setFilters(newFilters);
    setAppliedFilters(newFilters);
    const newURL = new URL(API_URL);
    newURL.searchParams.set('page', 1);
    setApiURL(newURL.toString());
    setActivePage(0);
  }, [setActivePage, setApiURL]);

  const statusOptions = [
    ...(new Set(allCharacters?.map((c) => c.status)) || [])
  ]
    .filter(Boolean)
    .map((status) => ({ value: status, label: status }));
  const genderOptions = [
    ...(new Set(allCharacters?.map((c) => c.gender)) || [])
  ]
    .filter(Boolean)
    .map((gender) => ({ value: gender, label: gender }));
  const speciesOptions = [
    ...(new Set(allCharacters?.map((c) => c.species)) || [])
  ]
    .filter(Boolean)
    .map((species) => ({ value: species, label: species }));

  return (
    <Main>
      <Header>
        <Filter
          filters={filters}
          onFilterChange={handleFilterChange}
          onApplyFilters={applyFilters}
          onResetFilters={resetFilters}
          statusOptions={statusOptions}
          genderOptions={genderOptions}
          speciesOptions={speciesOptions}
        />
      </Header>

      <AppState />

      {!isFetching && !isError && (
        <>
          <ItemsGrid filters={appliedFilters} />

          <Pagination filters={appliedFilters} />
        </>
      )}
    </Main>
  );
}

const Main = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px 0;
  max-width: 80%;
  margin: 0 auto;

  @media (max-width: 1200px) {
    max-width: 95%;
  }

  @media (max-width: 930px) {
    max-width: 85%;
  }

  @media (max-width: 600px) {
    max-width: 90%;
  }
`;
