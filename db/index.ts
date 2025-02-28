import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'
const db = drizzle({
	connection: {
		connectionString: process.env.DATABASE_URL!
	}
})

export type db = typeof db

export default db
