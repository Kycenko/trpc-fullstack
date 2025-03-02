import { DrizzleAdapter } from '@auth/drizzle-adapter'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

import db from '@/db'

export const authOptions: NextAuthOptions = {
	adapter: DrizzleAdapter(db),
	session: {
		strategy: 'jwt'
	},
	secret: process.env.NEXTAUTH_SECRET,
	// pages: {
	// 	signIn: '/auth/sign-in'
	// },
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!
		}),
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID!,
			clientSecret: process.env.GITHUB_CLIENT_SECRET!
		})
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id
				token.name = user.name
				token.email = user.email
				token.picture = user.image
			}
			return token
		},
		async session({ token, session }) {
			if (token && session.user) {
				session.user.id = token.id
				session.user.name = token.name
				session.user.email = token.email
				session.user.image = token.picture
			}
			return session
		}
	}
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
