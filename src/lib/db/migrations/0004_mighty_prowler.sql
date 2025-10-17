ALTER TABLE "user" ADD COLUMN "role" text DEFAULT 'none';
ALTER TABLE "quiz" ALTER COLUMN "type" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."quiz_type";
