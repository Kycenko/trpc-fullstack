import { TRPCError, initTRPC } from '@trpc/server'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import db from '@/db'

export const createContext = async (opts: {
	req?: Request
	res?: Response
}) => {
	const session = await getServerSession(authOptions)
	return {
		session,
		db,
		req: opts.req,
		res: opts.res
	}
}

const t = initTRPC.context<typeof createContext>().create()

const isAuthed = t.middleware(opts => {
	const { ctx } = opts
	if (!ctx.session) {
		throw new TRPCError({ code: 'UNAUTHORIZED' })
	}
	return opts.next({
		ctx: {
			session: ctx.session
		}
	})
})

export const router = t.router
export const publicProcedure = t.procedure
export const privateProcedure = t.procedure.use(isAuthed)
