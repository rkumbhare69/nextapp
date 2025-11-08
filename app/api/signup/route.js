
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { checkEmailInUsed, createUserDocFromAuth } from "../../../lib/firebase/firebase.utils";

export async function POST(request) {
    const data = await request.json();
    
    if (await checkEmailInUsed(data.email)) {
        return NextResponse.json({error: 'Email is already in used!'}, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);
    const userAuth = {uid: data.email, email: data.email, password: hashedPassword, displayName: data.displayName };
    const docRef = await createUserDocFromAuth(userAuth);
    console.log(docRef);

    return NextResponse.json({ ...data, success: true, message: 'User is created successfully!' }, { status: 201 });
}