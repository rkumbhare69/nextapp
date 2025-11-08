import Link from "next/link";
import { fetchRecipePublishedYears, fetchRecipePublishedMonthsForYear, MONTH_NAMES_SHORT } from "../../../../lib/recipe-handler";

import style from './page.module.scss';
import CloseIcon from '@mui/icons-material/Close';

const RecipesFilterPage = async ({ params }) => {
    const { filter } = await params;
    let yearFilters = [];
    let monthFilters = [];
    const filterByYear = filter ? filter[0] : undefined;
    const filterByMonth = filter ? filter[1] : undefined;


    if (!filter) {
        yearFilters = await fetchRecipePublishedYears();
    }
    if (filterByYear) {
        monthFilters = await fetchRecipePublishedMonthsForYear(filterByYear);
    }

    return (
        <div className={style['recipes-filter']}>
            <div className={style['filter-container']}>
                <div className={style.title}>Filter by recipe&nbsp;
                    {
                        !filter && 'year'
                    }
                    {
                        (filter && filterByYear) && 'month'
                    }:
                </div>
                {!filter &&
                    yearFilters.map((year) => <Link key={year} href={`/recipes/${year}`} className={style.filter}>{year}</Link>)
                }
                {filter && filterByYear &&
                    monthFilters.map((month) => (
                        <Link key={month} href={`/recipes/${filterByYear}/${month}`} className={style.filter}>{MONTH_NAMES_SHORT[month]}</Link>
                    ))
                }
            </div>
            <div className={style.separator}></div>
            <div className={(filterByYear || filterByMonth) ? style['filter-list'] : style.hidden}>
                <b> Filters: </b>
                <div className={style['filter-item']}>
                    {filterByYear && <Link href='/recipes'><CloseIcon />{filterByYear}</Link>}
                </div>
                <div className={style['filter-item']}>
                    {filterByMonth && <Link href={`/recipes/${filterByYear}`}><CloseIcon />{MONTH_NAMES_SHORT[filterByMonth]}</Link>}
                </div>
            </div>
        </div>
    )
}
export default RecipesFilterPage;