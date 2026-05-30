-- 1. Add params as nullable first so existing rows don't violate NOT NULL
ALTER TABLE "quiz" ADD COLUMN "params" jsonb;--> statement-breakpoint

-- 2. Backfill params from the per-type sub-tables
UPDATE "quiz" q SET "params" = jsonb_build_object(
  'correctChoices', to_jsonb(s."correct_choices"),
  'incorrectChoices', to_jsonb(s."incorrect_choices")
) FROM "select_quiz" s WHERE s."quiz_id" = q."id" AND q."type" = 'select';--> statement-breakpoint

UPDATE "quiz" q SET "params" = jsonb_build_object('answer', t."answer")
FROM "text_quiz" t WHERE t."quiz_id" = q."id" AND q."type" = 'text';--> statement-breakpoint

UPDATE "quiz" q SET "params" = jsonb_build_object('answer', tf."answer")
FROM "true_false_quiz" tf WHERE tf."quiz_id" = q."id" AND q."type" = 'true_false';--> statement-breakpoint

-- 3. Enforce NOT NULL only after backfill (fails loudly if any row was missed)
ALTER TABLE "quiz" ALTER COLUMN "params" SET NOT NULL;--> statement-breakpoint

-- 4. Drop the now-redundant sub-tables
DROP TABLE "select_quiz" CASCADE;--> statement-breakpoint
DROP TABLE "text_quiz" CASCADE;--> statement-breakpoint
DROP TABLE "true_false_quiz" CASCADE;
