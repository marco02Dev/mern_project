import { useLocation } from "react-router-dom";
import { Location } from "react-router-dom";

/**
 * Custom hook that returns `true` if the current URL path starts with the specified string.
 * @param path Prefix to compare against the current pathname.
*/

export type UseIsCurrentPath = boolean;

export const useIsCurrentPath = (path: string): UseIsCurrentPath => {
  const location: Location = useLocation();
  return location.pathname.startsWith(path);
}