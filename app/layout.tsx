import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { Providers } from './providers/providers'

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app'
}

const geist = Geist({ subsets: ['latin'] })

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang='en'
			suppressHydrationWarning
		>
			<body className={geist.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
