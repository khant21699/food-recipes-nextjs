import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const getData = async (param, id) => {
  if (param == "Categories") {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`,
      { next: { revalidate: 0 }, cache: "no-store" }
    );
    console.log(res);

    return res.json();
  } else if (param == "Country") {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${id}`,
      { next: { revalidate: 0 }, cache: "no-store" }
    );
    console.log(res);

    return res.json();
  } else if (param == "Search") {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${id}`,
      { next: { revalidate: 0 }, cache: "no-store" }
    );
    console.log(res);

    return res.json();
  } else {
    return null;
  }
};

async function page({ searchParams }) {
  console.log(searchParams.category);
  const result = await getData(searchParams.category, searchParams.param);
  // console.log(result);
  if (!result) {
    notFound();
  }
  return (
    <div className="flex flex-col gap-4">
      <h2>Result For : {searchParams.param}</h2>
      {result.meals.map((m, index) => {
        return (
          <Link href={`/recipes/${m.idMeal}`}>
            <div className=" h-[250px] px-4 items-center gap-10 flex  border-green-400 border-[2px]">
              <div className=" w-2/5 aspect-square imgcontainer md:w-[200px]">
                <Image
                  src={`${m.strMealThumb}/preview`}
                  quality={100}
                  alt="foodImg"
                  layout="responsive"
                  className=" object-cover"
                  width={100}
                  height={100}
                />
              </div>
              <h3 className="w-3/5 text-green-500">{m.strMeal}</h3>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default page;
