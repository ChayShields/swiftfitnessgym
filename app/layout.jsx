import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import '@mantine/carousel/styles.css';
import React from "react";
import { headers } from "next/headers";
import { Oswald, Source_Sans_3 } from "next/font/google";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { theme } from "../theme";
import { ModalsProvider } from "@mantine/modals";
import Navbar from "../components/Navbar";
import "../styles/styles.css";
import Footer from "../components/Footer";
import CookieConsent from "../components/CookieConsent";
import GoogleAnalytics from "../components/GoogleAnalytics";
import { Notifications } from "@mantine/notifications";
import { getCmsPage, mergeSection, pickItems, pickText } from "../lib/cms";
import { stripCmsHtml } from "../lib/sanitize-html";
import { footerDefaults, navbarDefaults } from "../data/cms-defaults";

const displayFont = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const bodyFont = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export async function generateMetadata() {
  const navbar = await getCmsPage("navbar")
  const seo = mergeSection(navbar?.seo, navbarDefaults.seo)

  return {
    // Every relative canonical / og:url below resolves against this. www is
    // the primary domain on Vercel (the bare domain 308-redirects to it), and
    // it matches the sitemap.
    metadataBase: new URL("https://www.swiftfitnessgym.co.uk"),
    title: stripCmsHtml(pickText(seo.site_title, navbarDefaults.seo.site_title)),
    description: stripCmsHtml(pickText(seo.site_description, navbarDefaults.seo.site_description)),
  }
}

export default async function RootLayout({ children }) {
  const nonce = (await headers()).get("x-nonce") ?? undefined
  const [navbar, footer] = await Promise.all([
    getCmsPage("navbar"),
    getCmsPage("footer"),
  ])

  const brand = mergeSection(navbar?.brand, navbarDefaults.brand)
  const links = pickItems(navbar?.links?.items, navbarDefaults.links.items).filter((item) => item.url !== "/classes")
  const contact = mergeSection(navbar?.contact, navbarDefaults.contact)
  const details = mergeSection(footer?.details, footerDefaults.details)
  const tattooLink = { label: "Swift Ink Tattoo", url: "/swift-ink-tattoo" }
  const pageLinkItems = pickItems(footer?.page_links?.items, footerDefaults.page_links.items).filter((item) => item.url !== "/classes")
  const pageLinks = {
    heading: pickText(footer?.page_links?.heading, footerDefaults.page_links.heading),
    items: pageLinkItems.some((item) => item.url === tattooLink.url)
      ? pageLinkItems
      : [...pageLinkItems, tattooLink],
  }
  const legalLinks = {
    heading: pickText(footer?.legal_links?.heading, footerDefaults.legal_links.heading),
    items: pickItems(footer?.legal_links?.items, footerDefaults.legal_links.items),
  }
  const socials = pickItems(footer?.socials?.items, footerDefaults.socials.items)

  return (
    <html suppressHydrationWarning={true} lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <head>
        <ColorSchemeScript forceColorScheme="light" nonce={nonce} />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body suppressHydrationWarning={true} className={bodyFont.className}>
        <MantineProvider forceColorScheme="light" theme={theme}>
          <ModalsProvider>
            <Notifications position="top-right" zIndex={400} />
            <Navbar brand={brand} links={links} contact={contact} />
            {children}
            <Footer details={details} pageLinks={pageLinks} legalLinks={legalLinks} socials={socials} />
            <CookieConsent />
            <GoogleAnalytics />
          </ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
