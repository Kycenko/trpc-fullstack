// import db from '@/db'
// import { appRouter } from '@/trpc/routers'
// import { loggerLink } from '@trpc/client'
// import { experimental_nextCacheLink as nextCacheLink } from '@trpc/next/app-dir/links/nextCache'
// import { experimental_createTRPCNextAppDirServer as createTRPCNextAppDirServer } from '@trpc/next/app-dir/server'
// import { cookies } from 'next/headers'

// export const server = createTRPCNextAppDirServer<typeof appRouter>({
// 	config() {
// 		return {
// 			// transformer: SuperJSON,
// 			links: [
// 				loggerLink({
// 					// eslint-disable-next-line @typescript-eslint/no-unused-vars
// 					enabled: _op => false
// 				}),
// 				nextCacheLink({
// 					revalidate: 1,
// 					router: appRouter,
// 					async createContext() {
// 						// const { session } = await getUserSession()
// 						return {
// 							// session,
// 							db,
// 							headers: {
// 								cookie: cookies().toString(),
// 								'x-trpc-source': 'rsc-invoke'
// 							}
// 						}
// 					}
// 				})
// 			]
// 		}
// 	}
// })
import { appRouter } from '@/trpc/routers'
import { httpBatchLink } from '@trpc/client'

export const serverClient = appRouter.createCaller({
	links: [
		httpBatchLink({
			url: 'http://localhost:3000/api/trpc'
		})
	]
})
