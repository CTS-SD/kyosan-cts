CREATE TABLE "select_quiz" (
	"quiz_id" integer PRIMARY KEY NOT NULL,
	"correct_choices_text" text NOT NULL,
	"incorrect_choices_text" text NOT NULL
);
--> statement-breakpoint
DROP TABLE "select_item" CASCADE;--> statement-breakpoint
ALTER TABLE "quiz" ADD COLUMN "is_published" boolean NOT NULL;--> statement-breakpoint
ALTER TABLE "select_quiz" ADD CONSTRAINT "select_quiz_quiz_id_quiz_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quiz"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
DROP TYPE "public"."quiz_type";