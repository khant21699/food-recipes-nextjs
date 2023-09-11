import Link from "next/link";
import React from "react";
import NavComponents from "./NavComponents";

const getData = async () => {
  //   await new Promise((resolve) => setTimeout(resolve, 300000));
  try {
    const [categoryResponse, ingredientResponse] = await Promise.all([
      fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list", {
        next: {
          revalidate: 60 * 60,
        },
      }),
      fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list", {
        next: {
          revalidate: 60 * 60,
        },
      }),
    ]);

    if (!categoryResponse.ok || !ingredientResponse.ok) {
      throw new Error("Failed to fetch data");
    }

    const categoryData = await categoryResponse.json();
    const areaData = await ingredientResponse.json();

    // Extract the relevant data from the API responses
    const categories = categoryData.meals.map((item) => item.strCategory);
    const area = areaData.meals.map((item) => item.strArea);

    // Return the data in the desired format
    return { category: categories, area: area };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default async function Nav() {
  const data = await getData();
  return (
    <nav className="NavBar h-[100px]">
      <Link href="/">
        <h1 className="Logo">Tasty</h1>
      </Link>
      <NavComponents key="Categories" name="Categories" list={data.category} />
      <NavComponents key="Country" name="Country" list={data.area} />
      {/* <NavComponents /> */}
    </nav>
  );
}
