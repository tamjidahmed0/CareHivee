// import type {Metadata} from "next"; // First group: type imports

import "./globals.css"; // Second group: CSS imports

import { Baloo_Da_2 as Balooda } from "next/font/google"; // Third group: External modules
import { ThemeProvider } from "next-themes";

import { cn } from "@/lib/utils"; // Fourth group: Local project files


const fontBengali = Balooda({
  subsets: ["bengali"],
  weight: ["700"],
  variable: "--font-sans",
});

// const fontSans = FontSans({
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600", "700"],
//   variable: "--font-sans",
// });

// export const metadata: Metadata = {
//   title: "CareHivee",
//   description:
//     "CareHivee.",
//   icons: {
//     icon: "/assets/icons/logo-icon.svg",
//   },
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-dark-300 font-sans antialiased",
          fontBengali.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
