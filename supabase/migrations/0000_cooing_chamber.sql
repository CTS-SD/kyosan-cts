DO $$ BEGIN
 CREATE TYPE "public"."quiz_type" AS ENUM('select', 'input', 'ox');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "quizzes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" "quiz_type" NOT NULL,
	"question" text NOT NULL,
	"answer" text NOT NULL,
	"fakes" text[]
);
