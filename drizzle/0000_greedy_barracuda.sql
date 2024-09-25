DO $$ BEGIN
 CREATE TYPE "public"."quiz_type" AS ENUM('select', 'input', 'ox');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "quiz" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" "quiz_type",
	"question" text NOT NULL,
	"answer" text NOT NULL,
	"fakes" text[]
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" text,
	"email" varchar(256)
);
