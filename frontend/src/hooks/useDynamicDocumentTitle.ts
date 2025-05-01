import { useEffect } from "react";
import { useLocation, Location } from "react-router-dom";
import { capitalizeFirstLetter } from "../utils/common/capitalize-first-letter.util";
import { multiPageAppMode } from "../config/app.config";

export const useDynamicTitle = (suffix = "WebCourses") => {
  const location: Location = useLocation();

  useEffect(() => {
    if (multiPageAppMode) return;

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
