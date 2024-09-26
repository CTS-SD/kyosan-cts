ALTER TABLE "game_setting" RENAME TO "game_mode";--> statement-breakpoint
ALTER TABLE "game_mode" ADD COLUMN "name" text NOT NULL;