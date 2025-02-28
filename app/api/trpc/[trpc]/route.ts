import { appRouter } from '@/trpc/routers'
import { createContext } from '@/trpc/trpc'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

const handler = (req: Request) =>
	fetchRequestHandler({
		endpoint: '/api/trpc',
		req,
		router: appRouter,
		createContext
	})

export { handler as GET, handler as POST }
