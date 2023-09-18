import { relations } from "drizzle-orm";
import { pgTable, smallint, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  clerkUserId: text("clerk_user_id").notNull(),
  name: text("name"),
  avatar: text("avatar"),
  createdAt: timestamp("created_at", {
    precision: 0,
    withTimezone: true,
    mode: "string",
  })
    .defaultNow()
    .notNull(),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  records: many(recordsTable),
}));

export const recordsTable = pgTable("records", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => usersTable.id), // This is a foreign key
  sys: smallint("sys").notNull(),
  dia: smallint("dia").notNull(),
  pulse: smallint("pulse").notNull(),
  createdAt: timestamp("created_at", {
    precision: 0,
    withTimezone: true,
    mode: "string",
  })
    .defaultNow()
    .notNull(),
});

export const recordsRelations = relations(recordsTable, ({ one }) => ({
  author: one(usersTable, {
    fields: [recordsTable.userId],
    references: [usersTable.id],
  }),
}));
