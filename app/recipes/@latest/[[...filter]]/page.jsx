import Image from "next/image";
import { notFound } from "next/navigation";

import style from './page.module.scss';
import Link from "next/link";
import { fetchRecipePublishedMonthsForYear, fetchRecipesByPublishedLatest, fetchRecipesByPublishedYear, fetchRecipesByPublishedYearAndMonth } from "../../../../lib/recipe-handler";

const LatestRecipesPage = async ({params}) => {
    const {filter} = await params;
    const filterByYear = filter ? filter[0] : undefined
    const filterByMonth = filter ? filter[1] : undefined
    let meals = [];
    
    if(filterByYear && filterByMonth){
      meals =  await fetchRecipesByPublishedYearAndMonth(filterByYear, filterByMonth);
    }else if (filterByYear) {
         meals = await fetchRecipesByPublishedYear(filterByYear);
    }else {
        meals = await fetchRecipesByPublishedLatest();
    }

    if (!meals) {
        notFound();
    }


    return (
        <div className={style['latest-recipes']}>
            {
                meals.map((meal) => {
                    return (<div key={meal.id} className={style.recipe}>
                        <div className={style.image}>
                            {meal.details && <Image src={meal.details.image} alt={meal.title} fill />}
                        </div>
                        <div className={style.summary}>
                            <h3><Link href={`/meals/${meal.slug}`}>{meal.title}</Link></h3>
                            <p>by {meal.creator && meal.creator.name}</p>
                            <p>published on {meal.date}</p>
                        </div>
                    </div>
                    )
                })
            }
        </div>
    )
}
export default LatestRecipesPage;