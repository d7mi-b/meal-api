import { MealCatagory, SingleCatagoryResponse } from "@/Types";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

interface MealsPageProps {
    meals: MealCatagory[]
}

interface IParams extends ParsedUrlQuery {
    catagory: string;
}

export const getStaticPaths: GetStaticPaths<{}> = async () => {
    const catagories : String[] = ["Beef", "Chicken", "Dessert", "Lamb", "Miscellaneous", "Pasta", "Seafood", "Side"];
    const paths = catagories.map((catagory) => {
        return {
            params: { catagory },
        }
    })
    return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<MealsPageProps> = async (context) => {
    const { catagory }  = context.params as IParams
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=' + catagory);
    const result : SingleCatagoryResponse = await response.json();

    return {
        props: { meals: result.meals },
        revalidate: 5 * 60
    }
}

const MealsCatagory = ({ meals } : MealsPageProps) => {
    const router = useRouter();
    const catagoryName = router.query.catagory?.toString();

    return (
        <main className="p-20 max-md:p-8">
            <header className="pb-2 border-b-4 border-orange-500 w-fit text-orange-500 text-5xl">
                <h1 className="mt-10">{catagoryName} Recipes</h1>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-10 text-stone-100">
                {
                    meals.map((meal) => {
                            return (
                                <Link href={`/meal/${meal.idMeal}`} key={+meal.idMeal} className="bg-stone-800 rounded-md hover:border border-orange-500">
                                    <img src={meal.strMealThumb.toString()} alt='meal' className="rounded-t-md" />
                                    <header className="h-20 flex flex-col justify-center text-center p-4">
                                        <h2>{meal.strMeal}</h2>
                                    </header>
                                </Link>
                            );
                    })
                }
            </section>
        </main>
    )
}

export default MealsCatagory;