'use client'
import { trpc } from '@/trpc/client'

export default function Home() {
	const users = trpc.users.getUsers.useQuery()

	return (
		<div>
			{users?.data?.map(item => (
				<div key={item.id}>
					{item.name}-{item.age}-{item.email}
				</div>
			))}
		</div>
	)
}
