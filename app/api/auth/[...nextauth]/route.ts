import { DrizzleAdapter } from '@auth/drizzle-adapter'
import bcrypt from 'bcryptjs'
import { eq } from 'drizzle-orm'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

import db from '@/db'
import { users } from '@/db/schema'

export const authOptions: NextAuthOptions = {
	adapter: DrizzleAdapter(db),
	session: {
		strategy: 'jwt'
	},
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: '/auth/sign-in'
	},
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'Email'
				},
				password: {
					label: 'Password',
					type: 'password',
					placeholder: 'Password'
				}
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error('Email and password are required')
				}

				const user = await db
					.select()
					.from(users)
					.where(eq(users.email, credentials.email))
					.limit(1)

				if (user.length === 0) throw new Error('User not found')

				const isValidPassword = await bcrypt.compare(
					credentials.password,
					user[0].password
				)

				if (!isValidPassword) throw new Error('Invalid password')

				return user[0]
			}
		}),

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
