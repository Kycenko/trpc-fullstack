// export const getCurrentUser = async () => {
// 	const { session } = await getUserSession()

// 	if (!session) return null

// 	const currentUser = await db.query.users.findFirst({
// 		where: eq(users.id, session.user.id)
// 	})

// 	if (!currentUser) return null

// 	return { currentUser }
// }
