
import Image from 'next/image';
import style from './page.module.scss';
import { notFound } from 'next/navigation';

const ImagePreview = async ({params}) => {
    const {slug} = await params;
    const response = await fetch(`http://localhost:8888/meals?slug=${slug}`);
    const meals = await response.json();
    let meal = {};

    if(!meals || meals.length == 0){
        notFound();
    }

    meal = meals[0];

    return (
        <div className='image-container'>
            <Image src={meal.details.image} alt={meal.title} fill />
        </div>
    )
}
export default ImagePreview;