'use client';

import { signOut, getSession } from "next-auth/react";
import Link from "next/link";

const SignOut = () => {

    const userSignOut = async (event) => {
        event.preventDefault();
        const session = await getSession();
        if(session){
            await signOut({
                callbackUrl: '/auth'
            });
            console.log('user sign out!');
        }else{
            console.log('no active session found!');
        }
    }

    return <Link href='/auth' onClick={userSignOut}>Sign Out</Link>
}
export default SignOut;