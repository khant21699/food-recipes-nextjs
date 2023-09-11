import "./globals.css";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import Loading from "./loading";
import Nav from "./components/Nav";
import SearchBar from "./components/SearchBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tasty",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + " flex flex-col"}>
        <Suspense fallback={<Loading />}>
          <Nav />
          <SearchBar />
          {children}
        </Suspense>
      </body>
    </html>
  );
}
