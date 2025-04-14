import { useState, useEffect, Dispatch, SetStateAction } from 'react';

type DataWrapper<T> = {
  data: T; 
};

type UseFetchResult<T> = {
  objectData: DataWrapper<T> | null; 
  loading: boolean;
  error: string | null;
};

export const useFetchGet = <T>(endpoint: string, setProductsNumber?: Dispatch<SetStateAction<number | undefined>>): UseFetchResult<T> => {
  const [objectData, setObjectData] = useState<DataWrapper<T> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result: DataWrapper<T> = await response.json();
        setObjectData(result);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  useEffect(() => {
    if (objectData && Array.isArray(objectData.data) && setProductsNumber) {
      setProductsNumber(objectData.data.length);
    }
  }, [objectData, setProductsNumber]);

  return { objectData, loading, error };
};
