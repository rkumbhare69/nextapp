'use client';

import { useState } from 'react';
import { signIn, signOut } from 'next-auth/react';
import FormInput from '../form-input/form-input.component';
import { useRouter } from 'next/navigation';
import Alert from '@mui/material/Alert';

import { createUserDocFromAuth, signInWithGoogle } from '../../lib/firebase/firebase.utils';
import PageLoader from '../page-loader/page-loader.component';

import style from './sign-in.module.scss';

const defaultFormFields = {
    email: '',
    password: ''
}

const SignIn = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onFormFieldChange = (event) => {
        switch (event.target.name) {
            case 'email':
                setFormFields({ ...formFields, 'email': event.target.value });
                break;
            case 'password':
                setFormFields({ ...formFields, 'password': event.target.value });
                break;
        }
    }

    const googleSignIn = async () => {
        console.log("sign in with goole...");
        setError(null);
        setLoading(true);
        const userCredentials = await signInWithGoogle();
        const userAuth = userCredentials.user;
        const token = await userAuth.getIdToken();
        const userDoc = await createUserDocFromAuth(userAuth);
        const response = await signIn("credentials", {
            redirect: false,
            email: userAuth.email,
            id: userAuth.uid,
            token: token
        });
        setLoading(false);

        if(!response.ok){
            const {error} = await response.json();
            setError(error);
        }else{
            router.replace('/');
            router.refresh();
        }
    }

    const emailPasswordSignIn = async (event) => {
        event.preventDefault();
        setError(null);
        setLoading(true);
        const response = await signIn("credentials", {
            redirect: false,
            email: formFields.email,
            password: formFields.password,
        });
        setLoading(false);
        if (!response.ok) {
            const { error } = await response;
            setError(error);
        } else {
            router.replace('/');
            router.refresh();
        }
    }


    return (
        <div className={style['sign-in']}>
            <h1>Already have an account?</h1>
            <p>Sign In with your email and password</p>
            <div>
                {error && <Alert severity="error">{error}</Alert>}
            </div>
            {
                loading && <PageLoader />
            }
            <form>
                <div className={style.group}>
                    <FormInput type='email'
                        name='email'
                        labelText="Your Email"
                        inputValue={formFields.email}
                        onChange={onFormFieldChange}
                        autoComplete="off"
                        required />
                </div>
                <div className={style.group}>
                    <FormInput type='password'
                        name='password'
                        labelText="Your Password"
                        inputValue={formFields.password}
                        onChange={onFormFieldChange}
                        autoComplete="off"
                        required />
                </div>
                <div className={style.actions}>
                    <button type='submit' onClick={emailPasswordSignIn}>Sign In</button>
                    <button type='button' className={style.google} onClick={googleSignIn}>Sign In with Google</button>
                </div>
            </form>
        </div>
    )
}
export default SignIn;
