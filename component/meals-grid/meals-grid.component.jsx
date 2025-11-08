import MealItem from "../meal-item/meal-item.component";

import classes from './meals-grid.module.css';

const MealsGrid = ({ meals }) => {

    return (
        <ul className={classes.meals}>
            {
                meals.map((mealItem) => (
                    <li key={mealItem.id}>
                        <MealItem key={mealItem.id} mealItem={mealItem} />
                    </li>
                ))
            }
        </ul>
    )
}

export default MealsGrid;