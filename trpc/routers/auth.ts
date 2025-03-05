import bcrypt from 'bcryptjs'
import { eq } from 'drizzle-orm'
import uuid4 from 'uuid4'

import { publicProcedure, router } from '../trpc'

import db from '@/db'
import { users } from '@/db/schema'
import { signInSchema, signUpSchema } from '@/lib/auth.schema'

export const authRouter = router({
	signUp: publicProcedure.input(signUpSchema).mutation(async ({ input }) => {
		const hashedPassword = await bcrypt.hash(input.password, 12)

		const existingUser = await db
			.select()
			.from(users)
			.where(eq(users.email, input.email))
			.limit(1)

		if (existingUser) throw new Error('User already exists')

		const user = await db.insert(users).values({
			id: uuid4(),
			email: input.email,
			password: hashedPassword,
			name: null,
			emailVerified: null,
			createdAt: new Date(),
			updatedAt: new Date()
		})

		return user
	}),

	signIn: publicProcedure.input(signInSchema).mutation(async ({ input }) => {
		const user = await db
			.select()
			.from(users)
			.where(eq(users.email, input.email))
			.limit(1)

		if (user.length === 0) throw new Error('User not found')

		const isValidPassword = await bcrypt.compare(
			input.password,
			user[0].password
		)

		if (!isValidPassword) throw new Error('Invalid password')

		return user
	})
})
