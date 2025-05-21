import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLoggedIn } from '@shared/store/slices/login.slice';
import { AppDispatch } from '@shared/store';
import { endpoints } from '../../config/endpoints.config';

/**
 * Custom hook that restores the user's session by fetching session data
 * from the server. If the session is valid, it dispatches the user data to
 * the Redux store to mark the user as logged in.
 * 
 * @returns void
 * 
 * @description
 * This hook runs once on component mount. It sends a request to the session 
 * endpoint and, if the user session is valid, stores the user data in the Redux store. 
 * If there's an error or the session is invalid, nothing happens.
*/

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
