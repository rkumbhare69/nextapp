import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { authenticateUser } from '../../../../lib/firebase/firebase.utils';
import {authenticateToken } from '../../../../lib/firebase/firebase-admin.utils';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            async authorize(credentials) {
                console.log("credentials : " + credentials);
                const user = await authenticateUser(credentials);
                return { email: user.email, id: user.email, accessToken: user.accessToken };
            }
        }),

        CredentialsProvider({
            name: "Firebase",
            credentials: {
                token: {label: "Firebase ID token", type: 'text'}
            },
            async authorize(credentials) {
                const userAuth = await authenticateToken(credentials.token);
                return { email: 'abc@gmai.com', id: 'abc@gmail.com' };
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAg: 24 * 60 * 60 // 1 day validity
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
    },

    callbacks: {
        async jwt({ token, user }) {
            // first time user sign in
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.accessToken = user.accessToken;
            }
            return token;
        },

        async session({ session, token }) {
            session.user.id = token.id;
            session.user.email = token.email;
            session.accessToken = token.accessToken;
            return session;
        },
    },

};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };