'use client'
import { trpc } from '@/trpc/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { SessionProvider } from 'next-auth/react'
import { ReactNode, useState } from 'react'

export function Providers({ children }: { children: ReactNode }) {
	const [queryClient] = useState(() => new QueryClient({}))
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpBatchLink({
					url: `http://localhost:3000/api/trpc`
				})
			]
			// transformer: superjson
		})
	)

	return (
		<trpc.Provider
			client={trpcClient}
			queryClient={queryClient}
		>
			<QueryClientProvider client={queryClient}>
				<SessionProvider>{children}</SessionProvider>
			</QueryClientProvider>
		</trpc.Provider>
	)
}
