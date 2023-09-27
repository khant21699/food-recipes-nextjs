"use client";

import Link from "next/link";
import React, { useState } from "react";

export default function NavComponents({ name, list = [] }) {
  const [show, setShow] = useState(false);

  return (
    <div
      className=" h-[50px] flex items-center"
      onMouseEnter={() => {
        setShow(true);
      }}
      onMouseLeave={() => {
        setShow(false);
      }}
    >
      <div className="relative cursor-pointer">
        <h2>{name}</h2>
        {show && (
          <div className=" bg-white flex flex-col gap-3 absolute mt-3 bottom-100 border-[1px] border-green-500 p-5 max-h-[50vh] overflow-y-auto left-5 max-md:-left-20">
            {list.map((l, index) => {
              return (
                <Link
                  prefetch={false}
                  key={index}
                  href={`/result?category=${name}&param=${l}`}
                  as={`/result?category=${name}&param=${l}`}
                  onClick={() => {
                    setShow(false);
                  }}
                >
                  <p className="hover:bg-gray-200 p-2">{l}</p>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
