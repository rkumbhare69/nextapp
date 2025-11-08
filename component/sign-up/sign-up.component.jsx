'use client';

import { useState, useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Alert } from '@mui/material';

import FormInput from '../form-input/form-input.component';
import { createUserDocFromAuth, signInWithGoogle } from '../../lib/firebase/firebase.utils';
import { SignUpAction } from './sign-up.actions';

import style from './sign-up.module.scss';
import PageLoader from '../page-loader/page-loader.component';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const defaultActionState = {
    ...defaultFormFields,
    success: false,
    errors: {},
    message: ''
}


const SignUp = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const [state, formAction, isPending] = useActionState(SignUpAction, defaultActionState);
    const { displayName = '', email = '', password = '', error, errors = {}, success, message } = state;

    if (Object.keys(errors).length > 0) {
        console.log(errors);
    }
    if (error) {
        console.log(error);
    }

    const onFormFieldChange = (event) => {
        switch (event.target.name) {
            case 'displayName':
                setFormFields({ ...formFields, 'displayName': event.target.value });
                break;
            case 'email':
                setFormFields({ ...formFields, 'email': event.target.value });
                break;
            case 'password':
                setFormFields({ ...formFields, 'password': event.target.value });
                break;
            case 'confirmPassword':
                setFormFields({ ...formFields, 'confirmPassword': event.target.value });
                break;
        }
    }

    const googleSignIn = async () => {
        const userReseponse = await signInWithGoogle();
        console.log(userReseponse.user);
        const userDoc = await createUserDocFromAuth(userReseponse.user);
        if (userDoc) {
            router.push('/meals');
        }
    }

    return (
        <div className={style['sign-up']}>
            <h1>Do not have an account?</h1>
            <p>Sign up with your email and password</p>
            {error && <Alert severity="error">{error}</Alert>}
            {success && message && <Alert severity="success">{message}</Alert>}
            {
                isPending && <PageLoader />
            }
            <form action={formAction}>
                <div className={style.group}>
                    <FormInput type='name'
                        name='displayName'
                        labelText="Your Name"
                        inputValue={formFields.displayName}
                        defaultValue={displayName}
                        onChange={onFormFieldChange}
                        autoComplete="off"
                        error={errors.displayName}
                        required />
                </div>
                <div className={style.group}>
                    <FormInput type='email'
                        name='email'
                        labelText="Your Email"
                        inputValue={formFields.email}
                        defaultValue={email}
                        onChange={onFormFieldChange}
                        error={errors.email}
                        autoComplete="off"
                        required />
                </div>
                <div className={style.group}>
                    <FormInput type='password'
                        name='password'
                        labelText="Your Password"
                        inputValue={formFields.password}
                        onChange={onFormFieldChange}
                        error={errors.password}
                        autoComplete="off"
                        required />
                </div>
                <div className={style.group}>
                    <FormInput type='password'
                        name='confirmPassword'
                        labelText="Confirm Password"
                        inputValue={formFields.confirmPassword}
                        onChange={onFormFieldChange}
                        error={errors.confirmPassword}
                        autoComplete="off"
                        required />
                </div>
                <div className={style.actions}>
                    <button type='submit'>Sign Up</button>
                    <button type='button' className={style.google} onClick={googleSignIn}>Reset</button>
                </div>
            </form>
        </div>
    )
}
export default SignUp;
