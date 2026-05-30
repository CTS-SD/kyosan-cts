CREATE TABLE "quiz_tag_map" (
	"quiz_id" integer NOT NULL,
	"tag_name" text NOT NULL,
	CONSTRAINT "quiz_tag_map_quiz_id_tag_name_pk" PRIMARY KEY("quiz_id","tag_name")
);
--> statement-breakpoint
CREATE TABLE "quiz_tag" (
	"name" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
ALTER TABLE "quiz_tag_map" ADD CONSTRAINT "quiz_tag_map_quiz_id_quiz_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quiz"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_tag_map" ADD CONSTRAINT "quiz_tag_map_tag_name_quiz_tag_name_fk" FOREIGN KEY ("tag_name") REFERENCES "public"."quiz_tag"("name") ON DELETE cascade ON UPDATE no action;