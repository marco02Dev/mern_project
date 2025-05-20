import { iubendaLinks } from "./iubenda-links.config";

export type FooterLinkItem = {
    href: string;
    text: string;
    targetBlank?: boolean;
    className?: string;
};

export const footerLinks: FooterLinkItem[] = [
    {
        href: iubendaLinks.privacyPolicy,
        text: "Privacy Policy",
        targetBlank: true,
    },
    {
        href: iubendaLinks.cookiePolicy,
        text: "Cookie Policy",
        targetBlank: true,
    },
    {
        href: "#",
        text: "Cookie Preferences",
        className: "cky-banner-element",
    },
];