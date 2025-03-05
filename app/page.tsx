'use client'

import { useSession } from 'next-auth/react'

export default function Home() {
	const session = useSession()
	// const SignOut = () => {
	// 	return <button onClick={() => void signOut()}>Sign Out</button>
	// }

	return <div></div>
}
