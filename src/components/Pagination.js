import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useData } from './providers';

export function Pagination({ filters }) {
  const [pages, setPages] = useState([]);
  const { apiURL, info, activePage, setActivePage, setApiURL } = useData();

  const pageClickHandler = (index) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActivePage(index);
    const newURL = new URL(apiURL);
    Object.entries(filters).forEach(([key, value]) => {
      if (value) newURL.searchParams.set(key, value);
    });
    newURL.searchParams.set('page', index + 1);
    setApiURL(newURL);
  };

  useEffect(() => {
    const createdPages = Array.from({ length: info.pages }, (_, i) => i);

    setPages(createdPages);
  }, [info]);

  if (pages.length <= 1) return null;

  const showFirst = activePage > 1;
  const showLast = activePage < pages.length - 2;
  const showLeftEllipsis = activePage > 1;
  const showRightEllipsis = activePage < pages.length - 3;

  return (
    <StyledPagination>
      {showFirst && (
        <>
          <Page onClick={() => pageClickHandler(0)}>« First</Page>
          {showLeftEllipsis && <Ellipsis>...</Ellipsis>}
        </>
      )}

      {activePage > 0 && (
        <Page onClick={() => pageClickHandler(activePage - 1)}>
          {activePage}
        </Page>
      )}

      <Page active>{activePage + 1}</Page>

      {activePage < pages.length - 1 && (
        <Page onClick={() => pageClickHandler(activePage + 1)}>
          {activePage + 2}
        </Page>
      )}

      {showRightEllipsis && <Ellipsis>...</Ellipsis>}
      {showLast && (
        <Page onClick={() => pageClickHandler(pages.length - 1)}>Last »</Page>
      )}
    </StyledPagination>
  );
}

const StyledPagination = styled.div`
  width: 100%;
  text-align: center;
`;

const Page = styled.span`
  color: #fff;
  font-size: 18px;
  padding: 5px;
  cursor: pointer;
  transition: color 0.2s;
  ${({ active }) => active && 'color: #83bf46'};

  &:hover {
    color: #83bf46;
  }
`;

const Ellipsis = styled(Page)`
  cursor: default;

  &:hover {
    color: #fff;
  }
`;
