import { useEffect, useMemo } from "react";
import { iubendaPolicyId } from "@shared/config/env.config";

type UseIubendaPolicy = {
    privacyPolicyUrl: string,
    cookiePolicyUrl: string
}

export const useIubendaPolicy = (): UseIubendaPolicy => {

  const urls: UseIubendaPolicy = useMemo(() => {
    return {
      privacyPolicyUrl: `https://www.iubenda.com/privacy-policy/${iubendaPolicyId}`,
      cookiePolicyUrl: `https://www.iubenda.com/privacy-policy/${iubendaPolicyId}/cookie-policy`,
    };
  }, [iubendaPolicyId]);

  useEffect(() => {
    const existingScript: Element = document.querySelector(
      'script[src="https://cdn.iubenda.com/iubenda.js"]'
    );
    if (existingScript) return;

    const script: HTMLScriptElement = document.createElement("script");
    script.src = "https://cdn.iubenda.com/iubenda.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return urls;
}
