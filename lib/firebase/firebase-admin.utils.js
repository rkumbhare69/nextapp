
import * as admin from "firebase-admin";

let adminApp = null;

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
    });
}

export const firebaseAdmin = admin;


export const authenticateToken = async (token) => {
    const decoded = await firebaseAdmin.auth().verifyIdToken(token);
    const uid = decoded.uid;
    console.log(uid);
    const userAuth = await auth.getUser(uid);
    console.log(userAuth.email);

   throw new Error(userAuth);
}