ALTER TABLE "select_quiz" ALTER COLUMN "correct_choices" SET DEFAULT ARRAY[]::text[];--> statement-breakpoint
ALTER TABLE "select_quiz" ALTER COLUMN "incorrect_choices" SET DEFAULT ARRAY[]::text[];