'use client'

import { useActionState, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { shareMealAction } from './share-meal.action';
import FormInput from '../form-input/form-input.component';

import classes from './share-meal-form.module.scss';
import FormTextArea from '../form-textarea/form-textarea.component';
import ImagePicker from '../Image-picker/image-picker.component';

const defaultFormFields = {
    name: '',
    email: '',
    title: '',
    summary: '',
    instructions: '',
    pickedImage: null,
}

const ShareMealForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const imageInputRef = useRef(null);
    const [state, action, isPending] = useActionState(shareMealAction, { ...defaultFormFields, success: false, errors: {}, message: '' });
    const { name, email, title, summary, instructions, pickedImage } = state;


    const onFormFieldChange = (event) => {
        switch (event.target.name) {
            case 'name':
                setFormFields({ ...formFields, name: event.target.value.trim() });
                break;
            case 'email':
                setFormFields({ ...formFields, email: event.target.value.trim() });
                break;
            case 'title':
                setFormFields({ ...formFields, title: event.target.value.trim() });
                break;
            case 'summary':
                setFormFields({ ...formFields, summary: event.target.value.trim() });
                break;
            case 'instructions':
                setFormFields({ ...formFields, instructions: event.target.value.trim() });
                break;
            case 'image':
                const file = event.target.files[0];
                if (!file) return;

                const fileReader = new FileReader();
                fileReader.onload = () => {
                    const imagePicked = fileReader.result;
                    setFormFields({ ...formFields, pickedImage: imagePicked });
                }
                fileReader.readAsDataURL(file);
                break;
        }
    }

    const pickImage = () => {
        imageInputRef.current.click();
    }


    return (
        <div className='meal-form-container'>
            <form className={classes.mealForm} action={action}>
                <div className={classes.groups}>
                    <div className={classes.group}>
                        <FormInput type='text'
                            name='name'
                            labelText="Your Name"
                            defaultValue={name}
                            error={state.errors && state.errors.name ? state.errors.name : ''}
                            inputValue={formFields.name}
                            onChange={onFormFieldChange}
                            required />
                    </div>
                    <div className={classes.group}>
                        <FormInput type='email'
                            name='email'
                            labelText="Your Email"
                            defaultValue={email}
                            error={state.errors && state.errors.email ? state.errors.email : ''}
                            inputValue={formFields.email}
                            onChange={onFormFieldChange}
                            required />
                    </div>
                </div>
                <div className={classes.group}>
                    <FormInput type='text'
                        name='title'
                        labelText="Recepi Title"
                        defaultValue={title}
                        error={state.errors && state.errors.title ? state.errors.title : ''}
                        inputValue={formFields.title}
                        onChange={onFormFieldChange}
                        required />
                </div>
                <div className={classes.group}>
                    <FormInput type='text'
                        name='summary'
                        labelText="Short Summary"
                        defaultValue={summary}
                        error={state.errors && state.errors.summary ? state.errors.summary : ''}
                        inputValue={formFields.summary}
                        onChange={onFormFieldChange}
                        required />
                </div>
                <div className={classes.group}>
                    <FormTextArea
                        name='instructions'
                        labelText="Instructions"
                        defaultValue={instructions}
                        error={state.errors && state.errors.instructions ? state.errors.instructions : ''}
                        inputValue={formFields.instructions}
                        onChange={onFormFieldChange}
                        required />
                </div>
                <ImagePicker name="image"
                    ref={imageInputRef}
                    defaultValue={pickedImage}
                    onChange={onFormFieldChange}
                    pickedImage={formFields.pickedImage}
                    onClickPickImageButton={pickImage}
                    required />
                <div className={classes.actions}>
                    <button type='submit'>Share Meal</button>
                </div>
            </form>
        </div>
    )
}

export default ShareMealForm;