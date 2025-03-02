'use client'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { signIn } from 'next-auth/react'

export function LoginForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<'div'>) {
	return (
		<div
			className={cn('flex flex-col gap-6', className)}
			{...props}
		>
			<Card>
				<CardHeader>
					<CardTitle className='text-2xl'>Login</CardTitle>
					<CardDescription>
						Enter your email below to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<div className='flex flex-col gap-6'>
							<div className='grid gap-2'>
								<Label htmlFor='email'>Email</Label>
								<Input
									id='email'
									type='email'
									placeholder='m@example.com'
								/>
							</div>
							<div className='grid gap-2'>
								<div className='flex items-center'>
									<Label htmlFor='password'>Password</Label>
									{/* <a
										href='#'
										className='ml-auto inline-block text-sm underline-offset-4 hover:underline'
									>
										Forgot your password?
									</a> */}
								</div>
								<Input
									id='password'
									type='password'
									required
								/>
							</div>
							<Button
								type='submit'
								className='w-full'
							>
								Login
							</Button>
							<div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
								<span className='relative z-10 bg-background px-2 text-muted-foreground'>
									Or continue with
								</span>
							</div>
							<div className='grid grid-cols-2 gap-4'>
								<Button
									onClick={() => signIn('google')}
									variant='outline'
									className='w-full'
								>
									<svg viewBox='0 0 24 24'>
										<path
											d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
											fill='currentColor'
										/>
									</svg>
									<span className='sr-only'>Login with Google</span>
								</Button>
								<Button
									onClick={() => signIn('github')}
									variant='outline'
									className='w-full'
								>
									<svg
										height='32'
										aria-hidden='true'
										viewBox='0 0 16 16'
										version='1.1'
										width='32'
										data-view-component='true'
									>
										<path
											fill='currentColor'
											d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z'
										></path>
									</svg>
									<span className='sr-only'>Login with Github</span>
								</Button>
							</div>
						</div>
						<div className='mt-4 text-center text-sm'>
							Don&apos;t have an account?{' '}
							<a
								href='#'
								className='underline underline-offset-4'
							>
								Sign up
							</a>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}
