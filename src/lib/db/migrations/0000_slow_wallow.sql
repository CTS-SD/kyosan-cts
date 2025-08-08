CREATE TYPE "public"."quiz_type" AS ENUM('select', 'text', 'true_false');--> statement-breakpoint
CREATE TABLE "quiz" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" "quiz_type" NOT NULL,
	"question" text NOT NULL,
	"explanation" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "select_item" (
	"id" serial PRIMARY KEY NOT NULL,
	"quiz_id" integer NOT NULL,
	"content" text NOT NULL,
	"is_correct" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "true_false_quiz" (
	"quiz_id" integer PRIMARY KEY NOT NULL,
	"answer" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "text_quiz" (
	"quiz_id" integer PRIMARY KEY NOT NULL,
	"answer" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "select_item" ADD CONSTRAINT "select_item_quiz_id_quiz_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quiz"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "true_false_quiz" ADD CONSTRAINT "true_false_quiz_quiz_id_quiz_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quiz"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "text_quiz" ADD CONSTRAINT "text_quiz_quiz_id_quiz_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quiz"("id") ON DELETE cascade ON UPDATE no action;