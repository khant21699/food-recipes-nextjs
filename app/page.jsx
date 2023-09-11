import Image from "next/image";
import Link from "next/link";

async function getRandomDish(id) {
  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php",
    {
      next: {
        revalidate: 60,
      },
    }
  );
  if (!res.ok) {
    notFound();
  }
  return res.json();
}
export default async function Home() {
  const random = await getRandomDish();
  const randomMeal = random.meals[0];
  return (
    <main className="flex flex-1 flex-col items-center">
      <h2 className=" text-green-500">Random recipe</h2>
      <Link href={`/recipes/${randomMeal.idMeal}`}>
        <div className="w-full border-green-500 border-[2px] p-2 flex flex-col gap-4 justify-center items-center mt-4">
          <div className="w-1/4 max-md:w-1/2">
            <Image
              src={`${randomMeal.strMealThumb}/preview`}
              className="object-contain"
              alt="MealLogo"
              width={100}
              height={100}
              quality={100}
              layout="responsive"
            />
          </div>
          <p className="text-green-500">{randomMeal.strMeal}</p>
          <p className="text-green-500">
            Category :{" "}
            <span className="text-black">{randomMeal.strCategory}</span>
          </p>
          <p className="text-green-500">
            Country : <span className="text-black">{randomMeal.strArea}</span>
          </p>
          <p className="text-green-500">
            instruction :{" "}
            <span className="text-black">
              {randomMeal.strInstructions.slice(0, 300)}...
            </span>
          </p>
        </div>
      </Link>
    </main>
  );
}
