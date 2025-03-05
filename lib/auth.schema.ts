import { object, string, z } from 'zod'

export const signUpSchema = object({
	email: string({ required_error: 'Email is required' })
		.min(1, 'Email is required')
		.email('Invalid email'),

	password: string({ required_error: 'Password is required' })
		.min(6, 'Password must be at least 6 characters')
		.max(35, 'Password must be at most 35 characters'),

	passwordConfirm: string({
		required_error: 'Password confirmation is required'
	}).min(1, 'Password confirmation is required')
}).refine(data => data.password === data.passwordConfirm, {
	path: ['passwordConfirm'],
	message: 'Passwords do not match'
})

export const signInSchema = object({
	email: string({ required_error: 'Email is required' })
		.min(1, 'Email is required')
		.email('Invalid email'),

	password: string({ required_error: 'Password is required' })
		.min(6, 'Password must be at least 6 characters')
		.max(35, 'Password must be at most 35 characters')
})

export type signInSchema = z.infer<typeof signInSchema>
export type signUpSchema = z.infer<typeof signUpSchema>
