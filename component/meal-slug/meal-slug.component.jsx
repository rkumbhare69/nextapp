import Image from "next/image";

import classes from './meal-slug.module.css';
import Link from "next/link";

const MealSlug = ({ mealItem }) => {

    const { id, slug, title, creator, details, date } = mealItem;
    const { name = '', email = '' } = creator;
    const { image = '', summary = '', instructions = '' } = details;

    return (
        <div className={`meal ${id} ${slug}`}>
            <header className={classes.header}>
                <div className={classes.image}>
                    <Link href={`/meals/${slug}/image-preview`}><Image src={image} alt={title} fill /></Link>
                </div>
                <div className={classes.headerText}>
                    <h2>{title}</h2>
                    <p>by {name}</p>
                    <p>published on {date}</p>
                    <p className={classes.summary}>{summary}</p>
                </div>
            </header>
            <main>
                {instructions &&
                    <p className={classes.instructions} dangerouslySetInnerHTML={{
                        __html: instructions
                    }} />
                }
            </main>
        </div>
    )
}

export default MealSlug;