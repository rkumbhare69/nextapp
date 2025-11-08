
'use client';

import Image from 'next/image';
import { notFound, useRouter } from 'next/navigation';

import style from './page.module.scss';
import { useEffect, useState } from 'react';

const ImagePreview = ({ params }) => {
    const router = useRouter();
    const [meal, setMeal] = useState({});

    useEffect(() => {
        const init = async () => {
            const { slug } = await params;
            const response = await fetch(`http://localhost:8888/meals?slug=${slug}`);
            const meals = await response.json();
            console.log();

            if (!meals || meals.length == 0) {
                notFound();
            }
            setMeal(meals[0]);
        }
        init();
    }, []);


    return (
        <>
            <div className={style['model-backdrop']} onClick={router.back} />
            <dialog className={style.model} open>
                <h1>Image from intercepting route</h1>
                {meal.details && <Image src={meal.details.image} alt={meal.title} fill />}
            </dialog>
        </>
    )
}
export default ImagePreview;