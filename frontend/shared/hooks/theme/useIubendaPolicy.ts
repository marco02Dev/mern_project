import { useEffect, useMemo } from "react";
import { iubendaPolicyId } from "@shared/config/env.config";

/**
 * Represents the return type of the `useIubendaPolicy` hook.
 *
 * @property {string} privacyPolicyUrl - Full URL of the Iubenda Privacy Policy.
 * @property {string} cookiePolicyUrl - Full URL of the Iubenda Cookie Policy.
*/

export type UseIubendaPolicy = {
  /** Full URL to the Iubenda Privacy Policy */
  privacyPolicyUrl: string;
  /** Full URL to the Iubenda Cookie Policy */
  cookiePolicyUrl: string;
};

/**
 * Custom hook to generate the URLs for Iubenda Privacy and Cookie policies
 * based on the configured policy ID, and to dynamically load the Iubenda script.
 * 
 * @returns {UseIubendaPolicy} Object containing the privacyPolicyUrl and cookiePolicyUrl.
 *
 * @example
 * const { privacyPolicyUrl, cookiePolicyUrl } = useIubendaPolicy();
 * // Use privacyPolicyUrl and cookiePolicyUrl in your components
*/

export const useIubendaPolicy = (): UseIubendaPolicy => {
  const urls = useMemo(() => {
    return {
      privacyPolicyUrl: `https://www.iubenda.com/privacy-policy/${iubendaPolicyId}`,
      cookiePolicyUrl: `https://www.iubenda.com/privacy-policy/${iubendaPolicyId}/cookie-policy`,
    };
  }, [iubendaPolicyId]);

  useEffect(() => {
    const existingScript = document.querySelector('script[src="https://cdn.iubenda.com/iubenda.js"]');
    if (existingScript) return;

    const script = document.createElement("script");
    script.src = "https://cdn.iubenda.com/iubenda.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return urls;
};
