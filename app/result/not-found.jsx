import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <main className="w-full  text-center">
      <h1 className="text-green-500">Sorry, Cannot Find the Page.</h1>
      <Link
        className=" underline decoration-double underline-offset-4 text-xl decoration-green-500"
        href="/"
      >
        Go to Home Page
      </Link>
    </main>
  );
}
