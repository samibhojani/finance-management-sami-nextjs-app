"use client"

import "./globals.css";
import Nav from "@/components/Navigation";
import FinanceContextProvider from "@/libs/store/finance-context";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <FinanceContextProvider>
        <Nav />
        {children}
        </FinanceContextProvider>
      </body>
    </html>
  );
}
