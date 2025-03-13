import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import { Metadata } from "next";
import { Inter } from "next/font/google";

import { Client } from "./client";

const inter = Inter({ subsets: ["latin"] });

const APP_NAME = "Zupper";
const APP_DEFAULT_TITLE = "Zupper App";
const APP_TITLE_TEMPLATE = "%s - Zupper";
const APP_DESCRIPTION = "Order food and drinks seamlessly. Pay with Crypto.";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  themeColor: "#FFFFFF",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-theme="winter" lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤤</text></svg>"
        ></link>
      </head>
      <body className={inter.className}>
        <Client>{children}</Client>
      </body>
    </html>
  );
}
