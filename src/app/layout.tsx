import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { BudgetProvider } from "@/context/ContextProvider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Main from "@/layout/Main";
import { ThemeProvider } from "@/components/ThemeProvider";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Budget App",
  description: "Budget App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full w-full`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <BudgetProvider>
            <ToastContainer position="top-center" />
            <Main>
              {children}
            </Main>
          </BudgetProvider>
        </ThemeProvider>

      </body>
    </html>
  );
}
