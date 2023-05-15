import { Meal, MealCatagory, SingleCatagoryResponse, singleMealResponse } from "@/Types";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

interface MealPageProps {
    meals: Meal[]
}

interface IParams extends ParsedUrlQuery {
    meals: string;
}

export const getStaticPaths: GetStaticPaths<{}> = async () => {
    return {
        paths: [],
        fallback: "blocking",
    };
}

export const getStaticProps: GetStaticProps<MealPageProps> = async (context) => {
    const { meal }  = context.params as IParams
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + meal);
    const result : singleMealResponse = await response.json();

    return {
        props: { meals: result.meals},
        revalidate: 5 * 60
    }
}

const MealsCatagory = ({ meals } : MealPageProps) => {
    const router = useRouter();

    return (
        <main className="p-20 text-stone-100 max-sm:p-8">
            <header className="pb-2 border-b-4 border-orange-500 w-fit text-orange-500 text-5xl max-sm:text-4xl">
                <h1 className="mt-10">{meals[0].strMeal.toString()} Recipe</h1>
            </header>

            <section className="flex gap-4 my-10 max-md:flex-col">
                <article className="w-1/4 bg-stone-800 p-8 max-md:w-full">
                    <header className="text-3xl">
                        <h2>Ingredient</h2>
                    </header>
                    <p className="text-xl m-4">{meals[0].strIngredient1} <span className="text-orange-500">{meals[0].strMeasure1}</span></p>
                    <p className="text-xl m-4">{meals[0].strIngredient2} <span className="text-orange-500">{meals[0].strMeasure2}</span></p>
                    <p className="text-xl m-4">{meals[0].strIngredient3} <span className="text-orange-500">{meals[0].strMeasure3}</span></p>
                    <p className="text-xl m-4">{meals[0].strIngredient4} <span className="text-orange-500">{meals[0].strMeasure4}</span></p>
                    <p className="text-xl m-4">{meals[0].strIngredient5} <span className="text-orange-500">{meals[0].strMeasure5}</span></p>
                    <p className="text-xl m-4">{meals[0].strIngredient6} <span className="text-orange-500">{meals[0].strMeasure6}</span></p>
                    <p className="text-xl m-4">{meals[0].strIngredient7} <span className="text-orange-500">{meals[0].strMeasure7}</span></p>
                    <p className="text-xl m-4">{meals[0].strIngredient8} <span className="text-orange-500">{meals[0].strMeasure8}</span></p>
                    <p className="text-xl m-4">{meals[0].strIngredient9} <span className="text-orange-500">{meals[0].strMeasure9}</span></p>
                    <p className="text-xl m-4">{meals[0].strIngredient10} <span className="text-orange-500">{meals[0].strMeasure10}</span></p>
                    <p className="text-xl m-4">{meals[0].strIngredient11} <span className="text-orange-500">{meals[0].strMeasure11}</span></p>
                    <p className="text-xl m-4">{meals[0].strIngredient12} <span className="text-orange-500">{meals[0].strMeasure12}</span></p>
                    <p className="text-xl m-4">{meals[0].strIngredient13} <span className="text-orange-500">{meals[0].strMeasure13}</span></p>
                    <p className="text-xl m-4">{meals[0].strIngredient14} <span className="text-orange-500">{meals[0].strMeasure14}</span></p>
                    <p className="text-xl m-4">{meals[0].strIngredient15} <span className="text-orange-500">{meals[0].strMeasure15}</span></p>
                    <p className="text-xl m-4">{meals[0].strIngredient16} <span className="text-orange-500">{meals[0].strMeasure16}</span></p>
                    <p className="text-xl m-4">{meals[0].strIngredient17} <span className="text-orange-500">{meals[0].strMeasure17}</span></p>
                    <p className="text-xl m-4">{meals[0].strIngredient18} <span className="text-orange-500">{meals[0].strMeasure18}</span></p>
                    <p className="text-xl m-4">{meals[0].strIngredient19} <span className="text-orange-500">{meals[0].strMeasure19}</span></p>
                    <p className="text-xl m-4">{meals[0].strIngredient20} <span className="text-orange-500">{meals[0].strMeasure20}</span></p>
                </article>

                <section className="w-3/4 max-md:w-full">
                    <section className="rounded-lg">
                        <img className="w-full" src={meals[0].strMealThumb.toString()} alt={meals[0].strMeal.toString()} />
                    </section>

                    <article className="my-10">
                        <header className="text-4xl my-4 text-orange-500">
                            <h2>Instruction</h2>
                        </header>
                        <p className="text-xl">{meals[0].strInstructions}</p>
                    </article>
                </section>
            </section>
        </main>
    )
}

export default MealsCatagory;