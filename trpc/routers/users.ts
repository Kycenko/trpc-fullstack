import db from '@/db'

import { users } from '@/db/schema'
import { publicProcedure, router } from '../trpc'

export const usersRouter = router({
	getUsers: publicProcedure.query(async () => {
		return await db.select().from(users)
	})
})
