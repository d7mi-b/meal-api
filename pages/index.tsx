import { GetServerSideProps } from 'next'
import { CatagoryData, MealCatagory, SingleCatagoryResponse, Categories } from "@/Types"
import Trinding from '@/components/Trinding'
import Link from 'next/link'

interface DataPageProps {
    meals: MealCatagory[],
    categories:CatagoryData[]
}

export const getServerSideProps: GetServerSideProps<DataPageProps> = async () => {
    const singleCatagoryMeals = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef");
    const result : SingleCatagoryResponse = await singleCatagoryMeals.json();

    const catagory = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    const resultCatagory : Categories = await catagory.json();

    return {
        props: { 
          meals: result.meals,
          categories: resultCatagory.categories
        }
    }
}

const Home = ({ meals, categories } : DataPageProps) => {
  return (
    <>
      
      <main className='home-page font-sans relative text-stone-100'>

        <section className='landing-page min-h-screen p-20 flex flex-col justify-center max-sm:p-12 '>
          <header className='text-8xl font-serif w-3/5  border-b-4 pb-2 max-sm:text-7xl max-sm:w-full'>
            <h1>Let's Start Cooking With Popular Recipes</h1>
          </header>
        </section>

        <Trinding meals={meals}/>

        <section className='px-20 py-5 my-20 bg-stone-800 max-sm:p-12'>
          <header className='text-orange-500 text-4xl border-b-4 border-orange-500 pb-2 w-fit mt-10 mx-auto'>
            <h1>Categories</h1>
          </header>

            <section id='catagory' className='place-content-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-10'>
            {
              categories.filter(catagory => catagory.strCategory !== 'Pork').map((category, i) => {
                if (i < 8)
                  return (
                    <Link 
                      href={`/catagory/${category.strCategory.toString()}`}
                      key={+category.idCategory} 
                      className='bg-neutral-900 w-72 h-72 m-auto rounded-full flex flex-col justify-center text-center hover:border border-orange-500'
                      title={category.strCategory.toString()}
                    >
                      <img className='p-10' src={category.strCategoryThumb.toString()} alt={category.strCategory.toString()} />
                    </Link>
                  );
              })
            }
          </section>
        </section>

        <article className='p-20 flex min-h-screen max-sm:flex-col max-sm:text-center max-sm:p-12 max-md:flex-col max-md:text-center'>
          <header className='w-2/4 p-4 text-7xl font-serif text-orange-500 flex flex-col justify-center max-sm:w-full md:w-full'>
            <h1>Sample And Tasty Recipes</h1>
          </header>
          <section className='w-2/4 grid grid-cols-2 gap-8 max-sm:w-full max-sm:mt-20 max-sm:gap-2 md:w-full md:mt-20 md:gap-4' >
            <img className='border border-orange-500 -translate-y-11' src='/images/spons.jpg' alt='spons' />
            <img className='border border-orange-500 translate-y-16' src='/images/meal.jpg' alt='meal' />
          </section>
        </article>

      </main>
    </>
  )
}

export default Home;
