import { sql } from "../src/db/init";

export type SQL = typeof sql;

export type WithSQL<T> = T & { sql?: SQL };
