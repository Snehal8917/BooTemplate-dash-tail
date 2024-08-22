import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";

const API_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`;

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials) {
        const { stationId, username, password } = credentials;

        try {
          const response = await fetch(API_ENDPOINT, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ stationId, username, password }),
          });

          if (!response.ok) {
            const data = await response.json();
            throw new Error(data?.message);
          }

          const user = await response.json();
          const { token, refreshToken, user: userData } = user.data;

          return {
            token,
            refreshToken,
            user: {
              id: userData.id,
              username: userData.username.trim(),
              firstName: userData.firstName.trim(),
              lastName: userData.lastName?.trim(),
              email: userData.email.trim(),
            },
          };
        } catch (error) {
          throw new Error(error?.message);
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.jwt = token.token;
        session.refreshToken = token.refreshToken;
        session.user = token.user;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          token: user.token,
          refreshToken: user.refreshToken,
          user: user.user,
        };
      }
      return token;
    },
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV !== "production",
};

export default authOptions;
