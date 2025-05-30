import { pgTable, text, serial, integer, boolean, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const media = pgTable("media", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  artist: text("artist").notNull(),
  type: varchar("type", { length: 20 }).notNull(), // 'music' or 'video'
  category: text("category").notNull(),
  duration: text("duration").notNull(),
  downloads: integer("downloads").notNull().default(0),
  featured: boolean("featured").notNull().default(false),
  imageUrl: text("image_url").notNull(),
  fileUrl: text("file_url").notNull(),
});

export const topDownloads = pgTable("top_downloads", {
  id: serial("id").primaryKey(),
  mediaId: integer("media_id").notNull().references(() => media.id),
  rank: integer("rank").notNull(),
  downloads: integer("downloads").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertMediaSchema = createInsertSchema(media).omit({
  id: true,
});

export const insertTopDownloadSchema = createInsertSchema(topDownloads).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Media = typeof media.$inferSelect;
export type InsertMedia = z.infer<typeof insertMediaSchema>;
export type TopDownload = typeof topDownloads.$inferSelect;
export type InsertTopDownload = z.infer<typeof insertTopDownloadSchema>;
