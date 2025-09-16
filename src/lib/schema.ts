import { pgTable, text, timestamp, uuid, jsonb, integer, date } from 'drizzle-orm/pg-core'

// Schema das tabelas
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  password_hash: text('password_hash').notNull(),
  full_name: text('full_name'),
  avatar_url: text('avatar_url'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
})

export const conversations = pgTable('conversations', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  date: date('date').notNull(),
  messages: jsonb('messages').default([]),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
})

export const assessments = pgTable('assessments', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  type: text('type', { enum: ['PHQ-9', 'GAD-7', 'C-SSRS'] }).notNull(),
  responses: jsonb('responses').notNull(),
  score: integer('score').notNull(),
  risk_level: text('risk_level', { enum: ['low', 'moderate', 'high'] }).notNull(),
  created_at: timestamp('created_at').defaultNow(),
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Conversation = typeof conversations.$inferSelect
export type NewConversation = typeof conversations.$inferInsert
export type Assessment = typeof assessments.$inferSelect
export type NewAssessment = typeof assessments.$inferInsert
