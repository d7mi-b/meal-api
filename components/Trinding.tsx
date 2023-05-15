import { SingleCatagoryResponse } from "@/Types";
import Link from "next/link";

const Trinding = ({ meals } : SingleCatagoryResponse) => {
    return (
        <article className="p-20 max-sm:p-12">
            <header className="text-orange-500 text-4xl border-b-4 border-orange-500 pb-2 w-fit max-sm:text-3xl max-sm:my-10 max-sm:mx-auto">
                <h1>Trinding Recipes</h1>
            </header>
            
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-10">
                {
                    meals.map((meal, i) => {
                        if (i < 8)
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
        </article>
    )
}

export default Trinding;