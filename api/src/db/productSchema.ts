import {
    doublePrecision,
    integer,
    pgTable,
    text,
    varchar,
} from "drizzle-orm/pg-core";

export const productsTable = pgTable("products", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title: varchar({ length: 255 }).notNull(),
    description: text().notNull(),
    image: varchar({ length: 255 }),
    price: doublePrecision().notNull(),
});
