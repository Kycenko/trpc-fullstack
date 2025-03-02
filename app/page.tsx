'use client'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function Home() {
	const session = useSession()

	const SignIn = () => {
		return <button onClick={() => void signIn('google')}>Sign in</button>
	}
	const SignOut = () => {
		return <button onClick={() => void signOut()}>Sign Out</button>
	}

	return <div>{session.data ? <SignOut /> : <SignIn />}</div>
}
