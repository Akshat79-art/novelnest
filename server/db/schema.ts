import { foreignKey, integer, pgEnum, pgTable, text, timestamp, unique, uuid } from "drizzle-orm/pg-core";
import { createId } from '@paralleldrive/cuid2';
import { relations } from "drizzle-orm";
import { user } from "../auth-schema";

export const bookConditionEnum = pgEnum("book_condition", ["new", "like_new", "good", "fair"]);
export const rentalStatusEnum = pgEnum("rental_status", ["pending", "approved", "rejected", "active", "completed", "cancelled"]);

export const userProfiles = pgTable("user_profiles", {
  id: text().primaryKey().notNull().$defaultFn(() => createId()),
  userId: text("user_id").notNull(), // References Better Auth's user.id
  phone: text("phone").notNull(),
  location: text("location").notNull(),
  ratingOwner: integer("rating_owner").default(0),
  ratingRenter: integer("rating_renter").default(0),
}, (table) => [
  unique("user_profiles_phone_unique").on(table.phone),
  unique("user_profiles_user_id_unique").on(table.userId),
  foreignKey({
    columns: [table.userId],
    foreignColumns: [user.id],
    name: "user_profiles_user_id_users_id_fk"
  })
]);

export const books = pgTable("books", {
    id: text().primaryKey().notNull().$defaultFn(() => createId()),
    title: text("title").notNull(),
    author: text("author").notNull(),
    isbn: text("isbn"),
    description: text("description"),
    bookCondition: bookConditionEnum("book_condition").notNull(),
    status: text("status").$type<"available" | "rented" | "unavailable">().default("available"),
    coverImage: text("cover_image"),
    pricePerDay: integer("price_per_day"),
    maxRentalDays: integer("max_rental_days"),
    ownerId: text("owner_id").references(() => userProfiles.userId).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});

export const rentalTransactions = pgTable("rental_transactions", {
  id: text().primaryKey().notNull().$defaultFn(() => createId()),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  rentalStatus: rentalStatusEnum("rental_status").default("pending"),
  totalPrice: integer("total_price"),
  renterId: text("renter_id").references(() => userProfiles.userId).notNull(),
  ownerId: text("owner_id").references(() => userProfiles.userId).notNull(), // Denormalized for queries
  bookId: text("book_id").references(() => books.id).notNull(),
  renterRating: integer("renter_rating"),
  ownerRating: integer("owner_rating"),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => [
  foreignKey({
    columns: [table.bookId],
    foreignColumns: [books.id],
    name: "rental_transactions_book_id_books_id_fk"
  }),
]);

export const booksRelations = relations(books, ({ one, many }) => ({
  owner: one(userProfiles, {
    fields: [books.ownerId],
    references: [userProfiles.userId],
  }),
  rentalTransactions: many(rentalTransactions),
}));

export const rentalTransactionsRelations = relations(rentalTransactions, ({ one }) => ({
  book: one(books, {
    fields: [rentalTransactions.bookId],
    references: [books.id],
  }),
  renter: one(userProfiles, {
    fields: [rentalTransactions.renterId],
    references: [userProfiles.userId],
    relationName: "renterTransactions",
  }),
  owner: one(userProfiles, {
    fields: [rentalTransactions.ownerId],
    references: [userProfiles.userId],
    relationName: "ownerTransactions",
  }),
}));