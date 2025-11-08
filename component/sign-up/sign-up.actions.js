'use server';

export const SignUpAction = async (prevState, formData) => {
    const data = {
        displayName: formData.get('displayName'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
    }
    let errors = {};

    console.log(data);

    if (!data.displayName || data.displayName.trim() === '' || data.displayName.trim().length < 8) {
        errors.displayName = 'Enter valid display name, should be firstname lastname';
    }
    if (!data.email || data.email.trim() === '') {
        errors.email= 'Enter valid email Id, should be abc@mail.cm';
    }
    if (!data.password || data.password.trim() === '' || data.password.length < 6) {
        errors.password= 'Enter valid passwrod, should be 6 characters long';
    }else if (!data.confirmPassword || data.confirmPassword.trim() !== data.password) {
        errors.confirmPassword= 'Password not matched';
    }
    
    if (Object.keys(errors).length > 0) {
        return { ...data, success: false, errors: errors, message: 'input validation failed!' };
    }

    const response = await fetch("http:localhost:3000/api/signup", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const error = await response.json();
        if (response.status === 400) {
            return { ...data, success: false, error: error.error };
        }
    }

    console.log('user created!');
    console.log(await response.json());
    return { success: true, message: 'User is created successfully!' };
}