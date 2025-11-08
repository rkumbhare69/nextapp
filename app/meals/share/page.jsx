import { getServerSession } from 'next-auth';
import {authOptions} from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

import ShareMealForm from '@/component/share-meal-form/share-meal-form.component';
import classes from './page.module.css';

export const metadata = {
    title: 'Share your meal',
    description: 'Share your meal with the communities'
}

const ShareMealPage = async () => {
    const session = await getServerSession(authOptions);
    if(!session){
        redirect('/auth');
    }

    return (
        <div className='share-meal'>
            <header className={classes.header}>
                <h1>Share your <span className={classes.highlight}>favorite meal...</span></h1>
                <p>Or any other meal you feel needs sharing!</p>
            </header>
            <main className={classes.main}>
                <ShareMealForm />
            </main>
        </div>
    )
}

export default ShareMealPage;