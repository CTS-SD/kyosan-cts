ALTER TABLE "student" ALTER COLUMN "student_number" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "select_quiz" ADD COLUMN "correct_choices" text[] DEFAULT '{}' NOT NULL;--> statement-breakpoint
ALTER TABLE "select_quiz" ADD COLUMN "incorrect_choices" text[] DEFAULT '{}' NOT NULL;--> statement-breakpoint
ALTER TABLE "select_quiz" DROP COLUMN "correct_choices_text";--> statement-breakpoint
ALTER TABLE "select_quiz" DROP COLUMN "incorrect_choices_text";