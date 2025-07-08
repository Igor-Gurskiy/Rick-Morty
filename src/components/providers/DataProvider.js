import axios from 'axios';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback
} from 'react';

const API_URL = 'https://rickandmortyapi.com/api/character/';

export function DataProvider({ children }) {
  const [activePage, setActivePage] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [info, setInfo] = useState({});
  const [apiURL, setApiURL] = useState(API_URL);
  const [allCharacters, setAllCharacters] = useState([]);

  const fetchAllCharacters = async (baseUrl) => {
    let allCharacters = [];
    let nextUrl = baseUrl;

    try {
      while (nextUrl) {
        const { data } = await axios.get(nextUrl);
        allCharacters = [...allCharacters, ...data.results];
        nextUrl = data.info.next;
      }

      return allCharacters;
    } catch (error) {
      throw error;
    }
  };

  const loadAllCharacters = useCallback(async () => {
    setIsFetching(true);
    setIsError(false);
    try {
      const chars = await fetchAllCharacters(API_URL);
      setAllCharacters(chars);
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
      setIsError(true);
    }
  }, []);

  useEffect(() => {
    loadAllCharacters();
  }, [loadAllCharacters]);

  const fetchData = useCallback(
    async (url) => {
      setIsFetching(true);
      setIsError(false);

      try {
        const { data } = await axios.get(url);
        setIsFetching(false);
        setCharacters(data.results);
        setInfo(data.info);
      } catch (error) {
        setIsFetching(false);
        setIsError(true);
        console.error(error);
      }
    },
    [setIsFetching, setIsError, setCharacters, setInfo]
  );

  useEffect(() => {
    fetchData(apiURL);
  }, [apiURL, fetchData]);

  const dataValue = useMemo(
    () => ({
      activePage,
      setActivePage,
      apiURL,
      setApiURL,
      characters,
      allCharacters,
      fetchData,
      isFetching,
      isError,
      info
    }),
    [
      activePage,
      apiURL,
      characters,
      allCharacters,
      isFetching,
      isError,
      info,
      fetchData
    ]
  );

  return (
    <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
  );
}

const DataContext = createContext({});

export const useData = () => useContext(DataContext);
