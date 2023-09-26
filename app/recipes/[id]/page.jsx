import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const getRecipe = async (id) => {
  const recipe = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  if (!recipe.ok) {
    notFound();
  }
  return recipe.json();
};

export default async function page({ params }) {
  const id = params.id;
  const recipe = await getRecipe(id);
  var ingredents = [];
  var measure = [];
  if (recipe.meals == null) {
    notFound();
  }
  try {
    for (let i = 1; i < 21; i++) {
      if (
        recipe !== null &&
        recipe.meals[0][`strIngredient${i}`] !== null &&
        recipe.meals[0][`strIngredient${i}`] !== ""
      ) {
        ingredents = [...ingredents, recipe.meals[0][`strIngredient${i}`]];
      }
    }
    for (let i = 1; i < 21; i++) {
      if (
        recipe !== null &&
        recipe.meals[0][`strMeasure${i}`] !== null &&
        recipe.meals[0][`strMeasure${i}`] !== ""
      ) {
        measure = [...measure, recipe.meals[0][`strMeasure${i}`]];
      }
    }
  } catch {}
  return (
    <>
      {recipe.meals && (
        <div className=" w-full flex flex-col items-center">
          <h1 className="text-center text-green-500">
            {recipe.meals[0].strMeal}
          </h1>
          <div className="w-2/5 max-md:w-2/3 p-1 mt-2 border-[2px] border-green-500">
            <Image
              src={`${recipe.meals[0].strMealThumb}/preview`}
              className="object-contain"
              alt="MealLogo"
              width={100}
              height={100}
              quality={100}
              layout="responsive"
            />
          </div>
          <div className="w-full mt-2 flex flex-col gap-3 instructions">
            <p>
              <span className=" text-green-500">Category : </span>
              {recipe.meals[0].strCategory}
            </p>
            <p>
              <span className=" text-green-500">Country : </span>
              {recipe.meals[0].strArea}
            </p>
            <p>
              <span className=" text-green-500">Instruction : </span>
              {recipe.meals[0].strInstructions}
            </p>
            <Link href={recipe.meals[0].strYoutube}>
              <span className=" text-green-500">Youtube : </span>
              {recipe.meals[0].strYoutube}
            </Link>
            <div className=" flex gap-1">
              <span className=" text-green-500">Ingredents : </span>
              <ul className="">
                {ingredents.map((i, index) => {
                  return (
                    <li key={index}>
                      {i} ({measure[index]})
                    </li>
                  );
                })}
              </ul>
            </div>
            {/* <p className=" flex gap-1">
        <span className=" text-green-500">Measures : </span>
        <ul className="">
          {measure.map((m, index) => {
            return <li key={index}>{m}</li>;
          })}
        </ul>
      </p> */}
            <p>
              <span className=" pb-4 text-green-500">Category : </span>
              {recipe.meals[0].strCategory}
            </p>
            {/* <p>
              <span className=" text-green-500">Category : </span>
              {recipe.meals[0].strCategory}
            </p> */}
          </div>
        </div>
      )}
    </>
  );
}
