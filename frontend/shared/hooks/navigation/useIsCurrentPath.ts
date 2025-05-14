import { useLocation } from "react-router-dom";
import { Location } from "react-router-dom";

/**
 * Boolean indicating whether the current URL path starts with the specified path.
*/

export type UseIsCurrentPath = boolean;

/**
 * Custom hook that checks if the current URL path starts with the given string.
 * 
 * @param path The path prefix to match against the current pathname.
 * 
 * @returns `true` if the current pathname starts with the provided path, otherwise `false`.
 * 
 * @example
 * const isLoginPage = useIsCurrentPath("/login");
*/

export const useIsCurrentPath = (path: string): UseIsCurrentPath => {
  const location: Location = useLocation();
  return location.pathname.startsWith(path);
}