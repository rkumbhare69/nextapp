import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { unstable_noStore } from "next/cache";

import MealsGrid from "../../component/meals-grid/meals-grid.component";

import classes from './page.module.css';
import Loading from "../../component/loading/loading.component";

//static metadata of the next page
export const metadata = {
    title: 'Meals',
    Description: 'this is the meals page'
}


export const Meals = async () => {
    //unstable_noStore();   // do not cahce data fetch requst on serveer (no cache)
    const response = await fetch('http://localhost:3000/api/meals',{
       next: { revalidate: 60, tags: ['mealsTag'] } // cached data fetch request for 10 secs in next store (ISR)
    });
    if(!response.ok){
        notFound();
    }

    const mealsData = await  response.json();

    if(!mealsData){
        notFound();
    }
    console.log("Meals page with prefetch data " + mealsData.length);
    return <MealsGrid meals={mealsData} />
}


const MealsPage = () => {

    return (
        <div className="meals">
            <header className={classes.header}>
                <h1>Delicius means, created {' '}
                    <span className={classes.highlight}>by You.</span>
                </h1>
                <p>
                    Choose your favorite recepi and cook it yourself. It is easy and fun!
                </p>
                <p className={classes.cta}>
                    <Link href='/meals/share'>Share your favorite recepi</Link>
                </p>
            </header>
            <main className={classes.main}>
                <Suspense fallback={<Loading />}>
                    <Meals />
                </Suspense>
            </main>
        </div>
    )
}

export default MealsPage;
