import { publicProcedure, router } from '../trpc'

import db from '@/db'
import { users } from '@/db/schema'

export const usersRouter = router({
	getUsers: publicProcedure.query(async () => {
		return await db.select().from(users)
	})
})
