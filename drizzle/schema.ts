import { pgTable, pgEnum, pgSchema, AnyPgColumn, uuid, timestamp, text } from "drizzle-orm/pg-core"


import { sql } from "drizzle-orm"

export const users = pgTable("users", {
	id: uuid("id").primaryKey().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	name: text("name"),
	avatar: text("avatar"),
});