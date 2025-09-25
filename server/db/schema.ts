import { integer, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const bookConditionEnum = pgEnum("book_condition", ["new", "like_new", "good", "fair"]);
export const rentalStatusEnum = pgEnum("rental_status", ["pending", "approved", "rejected", "active", "completed", "cancelled"]);

export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email").notNull().unique(),
    phone: text("phone").unique(),
    password: text("password").notNull(),
    name: text("name").notNull(),
    location: text("location"), 
    ratingAsOwner: integer("rating_owner").default(0),
    ratingAsRenter: integer("rating_renter").default(0),
    createdAt: timestamp("created_at").defaultNow(),
});

export const books = pgTable("books", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    author: text("author").notNull(),
    isbn: text("isbn"),
    description: text("description"),
    bookCondition: bookConditionEnum("book_condition").notNull(),
    status: text("status").$type<"available" | "rented" | "unavailable">().default("available"),
    coverImage: text("cover_image"),
    pricePerDay: integer("price_per_day"),
    maxRentalDays: integer("max_rental_days"),
    ownerId: uuid("owner_id").references(() => users.id).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});

export const rentalTransactions = pgTable("rental_transactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  rentalStatus: rentalStatusEnum("rental_status").default("pending"),
  totalPrice: integer("total_price"),
  renterId: uuid("renter_id").references(() => users.id).notNull(),
  ownerId: uuid("owner_id").references(() => users.id).notNull(), // Denormalized for queries
  bookId: uuid("book_id").references(() => books.id).notNull(),
  renterRating: integer("renter_rating"),
  ownerRating: integer("owner_rating"),
  createdAt: timestamp("created_at").defaultNow(),
});