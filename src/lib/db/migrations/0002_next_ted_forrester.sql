CREATE TYPE "public"."quiz_type" AS ENUM('select', 'text', 'true_false');--> statement-breakpoint
ALTER TABLE "quiz" ALTER COLUMN "is_published" SET DEFAULT true;