


export const MONTH_NAMES_SHORT = ["NA",
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];



export const fetchRecipePublishedYears = async () => {
    const response = await fetch('http://localhost:8888/meals?_sort=-date');
    if (!response.ok) {
        console.error('error while fetching meals');
    }

    const meals = await response.json();
    const dates = meals.map(meal => meal.date);
    const yearNumbers = dates.reduce((years, dateString) => {
        const year = new Date(dateString).getFullYear();
        if (!years.includes(year)) {
            years.push(year);
        }
        return years;
    }, []);
    return yearNumbers;
}

export const fetchRecipePublishedMonthsForYear = async (year) => {
    const response = await fetch('http://localhost:8888/meals?_sort=date');
    if (!response.ok) {
        console.log('error while fetching recipe published months for the year ' + year);
    }
    const meals = await response.json();
    const publishedDates = meals.map((meal) => meal.date);
    const publishedMonths = publishedDates.reduce((months, publishedDate) => {
        const month = new Date(publishedDate).getMonth() + 1;
        const publishedYear = new Date(publishedDate).getFullYear();
        if (publishedYear == year && !months.includes(month)) {
            months.push(month);
        }
        return months;
    }, []);
    return publishedMonths;
}

export const fetchRecipesByPublishedYearAndMonth = async (year, month) => {
    const response = await fetch('http://localhost:8888/meals?_sort=-date');
    if (!response.ok) {
        console.error('error while fetching meals');
    }

    const meals = await response.json();
    const monthStr = (month < 10 ? '0'+month : month);
    const filteredMeals = meals.filter((meal) => meal.date.indexOf(year + '-' + monthStr) > -1);
    return filteredMeals;
}

export const fetchRecipesByPublishedYear = async (year) => {
    const response = await fetch('http://localhost:8888/meals?_sort=-date');
    if (!response.ok) {
        console.error('error while fetching meals');
    }

    const meals = await response.json();
    const filteredMeals = meals.filter((meal) => meal.date.indexOf(year) > -1);
    return filteredMeals;
}

export const fetchRecipesByPublishedLatest = async (year) => {
    const response = await fetch('http://localhost:8888/meals?_sort=-date&_limit=9');
    if (!response.ok) {
        console.error('error while fetching meals');
    }

    const meals = await response.json();
    return meals;
}

