import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLoggedIn } from '@shared/store/slices/login.slice';
import { AppDispatch } from '@shared/store';
import { endpoints } from '@shared/config/endpoints.config';
import { LoggedUser } from '@shared/types/user.types';
import { checkSession } from '@shared/utils/cookies/check-session.util';

/**
 * Custom React hook that attempts to restore the user's session on component mount.
 *
 * @function useRestoreSession
 * @returns {void}
 *
 * @description
 * On initial render, this hook checks if a session cookie exists using `checkSession()`. 
 * If a session is present, it sends a request to the configured session endpoint. 
 * If the server confirms a valid session and returns user data, the user is marked as 
 * logged in by dispatching `setLoggedIn()` with the retrieved user information.
 * 
 * If an error occurs during the request (e.g. network failure or invalid response),
 * it is caught and printed to the browser console using `console.error()`.
 *
 * @example
 * useRestoreSession(); // Call inside a top-level component to auto-login returning users
*/

export const useRestoreSession = (): void => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const restoreSession = async (): Promise<void> => {
      try {
        const res: Response = await fetch(endpoints.sessionEndpoint, {
          credentials: 'include',
        });
        const json = await res.json();

        if (json.success && json.data as LoggedUser) {
          dispatch(setLoggedIn({
            _id: json.data._id,
            name: json.data.name,
            surname: json.data.surname,
            email: json.data.email,
            role: json.data.role,
          }));
        }
      } catch (error) {
          console.error(error);
          return;
      }
    };

    if(checkSession()) {
      restoreSession();
    }
  }, [dispatch]);
};
