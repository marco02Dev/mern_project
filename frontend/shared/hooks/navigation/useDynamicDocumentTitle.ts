import { useEffect } from "react";
import { useLocation, Location } from "react-router-dom";
import { capitalizeFirstLetter } from "@shared/utils/common/capitalize-first-letter.util";

/**
 * Custom hook that dynamically sets the document title based on the current path.
 * It capitalizes the last segment of the URL and appends a suffix to create the title.
 * 
 * @param suffix The suffix to be appended to the page title (default is "WebCourses").
 * 
 * @returns void
 * 
 * @description
 * This hook listens for changes in the URL path and updates the document title based
 * on the last segment of the path. If the path has segments, it capitalizes the last 
 * one and sets it as the title followed by the suffix. If there are no segments, it 
 * sets the title to just the suffix.
*/

export const useDynamicTitle = (suffix = "WebCourses"): void => {
  const location: Location = useLocation();

  useEffect(() => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const lastSegment = pathSegments.length > 0 ? pathSegments[pathSegments.length - 1] : null;

    if (lastSegment !== null) {
      const pageTitle: string = capitalizeFirstLetter(lastSegment);
      document.title = `${pageTitle} / ${suffix}`;
    } else {
      document.title = suffix;
    }
  }, [location, suffix]);
};
