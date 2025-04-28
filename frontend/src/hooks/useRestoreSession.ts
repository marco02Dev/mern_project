import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLoggedIn } from '../store/slices/login.slice';
import { AppDispatch } from '../store';
import { endpoints } from '../config/endpoints.config';

export const useRestoreSession = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const res = await fetch(endpoints.sessionEndpoint, {
          credentials: 'include',
        });
        const json = await res.json();

        if (json.success && json.data) {
          dispatch(setLoggedIn({
            _id: json.data._id,
            name: json.data.name,
            surname: json.data.surname,
            email: json.data.email,
            role: json.data.role,
          }));
        }
      } catch (error) {
          return;
      }
    };

    restoreSession();
  }, [dispatch]);
};
