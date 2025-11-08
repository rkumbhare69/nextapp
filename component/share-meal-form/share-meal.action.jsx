'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import fs from 'node:fs';
import slugify from 'slugify';
import xss from 'xss';

export const shareMealAction = async (prevState, formData) => {
    const mealData = {
        name: formData.get('name'),
        email: formData.get('email'),
        title: formData.get('title'),
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image'),
    }

    if (!validateField(formData.get('name'))) {
        return { ...mealData, errors: { name: 'Please enter valid name' } };
    } else if (!validateField(formData.get('email'))) {
        return { ...mealData, errors: { email: 'Please enter valid email' } };
    } else if (!validateField(formData.get('title'))) {
        return { ...mealData, errors: { title: 'Please enter valid title' } };
    } else if (!validateField(formData.get('summary'))) {
        return { ...mealData, errors: { summary: 'Please enter valid summary' } };
    } else if (!validateField(formData.get('instructions'))) {
        return { ...mealData, errors: { instructions: 'Please enter valid instructions' } };
    }
    else {
        console.log('storing image on to server');
        const fileExt = "." + mealData.image.name.split('.').pop();
        const filename = slugify(mealData.title, {
            lower: true,
            strict: true,
            trim: true
        }) + fileExt;

        const stream = fs.createWriteStream(`public/images/${filename}`);
        const bufferedImage = await mealData.image.arrayBuffer();
        stream.write(Buffer.from(bufferedImage));
        stream.end();
        stream.on('finish', () => console.log('image saved'));
        stream.on('error', (error) => console.log(error));

        const currentDate =new Date().toISOString().split('T')[0];

        const mealDataJson = {
            slug: mealData.title.replaceAll(' ', '-'),
            title: mealData.title,
            creator: {
                name: mealData.name,
                email: mealData.email
            },
            details: {
                image: `/images/${filename}`,
                summary: mealData.summary,
                instructions: xss(mealData.instructions, {
                    whiteList: { p: [], br: []},  // allow <p> & <br> with no attributes in the content
                    stripIgnoreTag: true, // remove all tags not in whitelist
                    stripIgnoreTagBody: true  // remove script tag and content
                })
            },
            date: currentDate
        };

        const response = await fetch("http://localhost:8888/meals/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mealDataJson)
        });
        const mealRes = await response.json();
        console.log("meals shared successfully! new meal slug id is " + mealRes.id);
        revalidateTag('mealsTag');
        //revalidatePath('/meals');
        redirect('/meals');
    }
}


const validateField = (fieldValue) => {
    if (!fieldValue || fieldValue.trim().length == 0)
        return false;
    return true;
}