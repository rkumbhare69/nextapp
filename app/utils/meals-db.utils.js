
import sql from 'better-sqlite3';

const db = sql('meals.db');

export const getMeals = async () => {
    await new Promise((resolve) => setInterval(resolve(), 500000));
    return db.prepare('SELECT * From meals').all();
}

export const getMealSlug = async (slug) => {
    await new Promise((resolve) => setInterval(resolve(), 500000));
    return db.prepare('SELECT * FROM meals where slug = ?').get(slug);
}