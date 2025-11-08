
import { notFound } from "next/navigation";
import { Suspense } from "react";

import classes from './page.module.css';
import MealSlug from "../../../component/meal-slug/meal-slug.component";
import { title } from "process";

// Dynamic metadata of the next page
export const generateMetadata = async ({ params }) => {
    const { slug } = await params;
    return {
        title: slug,
        description: `Meal ${slug} recepi details`
    }
}


const MealSlugPage = async ({ params }) => {
    const { slug } = await params;
    const slugUrl = `http://localhost:8888/meals?slug=${slug}`;

    const slugResponse = await fetch(slugUrl);
    const slugData = await slugResponse.json();
    const mealItem = (Array.isArray(slugData) && slugData.length > 0) ? slugData[0] : null;

    if (!mealItem) {
        notFound();
    }

    return (
        <Suspense fallback={<div className={classes.loading}> <h1>Loading meals...</h1></div>}>
            <MealSlug mealItem={mealItem} />
        </Suspense>
    )

}
export default MealSlugPage;