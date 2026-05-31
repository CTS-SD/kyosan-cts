"use client";

import { useState } from "react";
import { Controller } from "react-hook-form";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { useQuizTags } from "@/features/quizzes/hooks/use-quiz-tags";
import { useQuizEditor } from "./quiz-editor";

export const QuizEditorTags = () => {
  const { form } = useQuizEditor();
  const { data: allTags = [] } = useQuizTags();
  const [query, setQuery] = useState("");
  const anchor = useComboboxAnchor();

  return (
    <Controller
      name="tags"
      control={form.control}
      render={({ field }) => {
        const selected: string[] = field.value ?? [];
        const trimmed = query.trim();
        const available = allTags.filter((t) => !selected.includes(t));
        // Offer a "create" entry when the typed tag is new.
        const showCreate = trimmed !== "" && !allTags.includes(trimmed) && !selected.includes(trimmed);
        const items = showCreate ? [...available, trimmed] : available;

        const commit = (next: string[]) => {
          field.onChange(Array.from(new Set(next.map((t) => t.trim()).filter(Boolean))));
          setQuery("");
        };

        return (
          <Field>
            <FieldLabel>タグ</FieldLabel>
            <Combobox
              items={items}
              multiple
              value={selected}
              onValueChange={commit}
              inputValue={query}
              onInputValueChange={setQuery}
            >
              <ComboboxChips ref={anchor} className="bg-background">
                <ComboboxValue>
                  {(value: string[]) => (
                    <>
                      {value.map((tag) => (
                        <ComboboxChip key={tag} aria-label={tag}>
                          {tag}
                        </ComboboxChip>
                      ))}
                      <ComboboxChipsInput placeholder={value.length === 0 ? "タグを追加" : ""} />
                    </>
                  )}
                </ComboboxValue>
              </ComboboxChips>
              <ComboboxContent anchor={anchor}>
                <ComboboxEmpty>タグがありません</ComboboxEmpty>
                <ComboboxList>
                  {(item: string) => (
                    <ComboboxItem key={item} value={item}>
                      {showCreate && item === trimmed ? `「${item}」を作成` : item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
            <FieldDescription>既存のタグから選択、または入力して新規作成できます。</FieldDescription>
          </Field>
        );
      }}
    />
  );
};
