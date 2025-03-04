import { router } from '../trpc'

import { authRouter } from './auth'
import { usersRouter } from './users'

export const appRouter = router({
	users: usersRouter,
	auth: authRouter
})

export type AppRouter = typeof appRouter
