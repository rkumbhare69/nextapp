
import Image from 'next/image';
import classes from './meal-item.module.css';
import Link from 'next/link';

const MealItem = ({ mealItem }) => {
    const { id, slug, title, creator, details, date } = mealItem;
    const { name = '', email = '' } = creator;
    const { image = '', summary = '', instructions = '' } = details;

    return (
        <article className={classes.meal}>
            <header>
                <div className={classes.image}>
                    {
                        details &&
                        <Image src={image} alt={title} fill priority/>
                    }
                </div>
                <div className={classes.headerText}>
                    <h2>{title}</h2>
                    <p>by {creator && name}</p>
                    <p>published on {date}</p>
                </div>
            </header>
            <div className={classes.content}>
               {details && <p className={classes.summary}>{summary}</p>}
                <div className={classes.actions}>
                    <Link href={`/meals/${slug}`}>View Details</Link>
                </div>
            </div>
        </article>
    );
}

export default MealItem;