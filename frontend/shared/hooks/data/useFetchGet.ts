import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { setLoading, setError } from '@shared/store/slices/app-state-slice';

type DataWrapper<T> = {
  data: T; 
};

type UseFetchResult<T> = {
  objectData: DataWrapper<T> | null; 
};

export const useFetchGet = <T>(
  endpoint: string, 
  setProductsNumber?: Dispatch<SetStateAction<number | undefined>>, 
  dataChanged?: boolean
): UseFetchResult<T> => {
  const [objectData, setObjectData] = useState<DataWrapper<T> | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(endpoint, {
          method: 'GET', 
          credentials: 'include', 
        });

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
  }, [endpoint, dataChanged]);

  useEffect(() => {
    if (objectData && Array.isArray(objectData.data) && setProductsNumber) {
      setProductsNumber(objectData.data.length);
    }
  }, [objectData, setProductsNumber]);

  return { objectData };
};
