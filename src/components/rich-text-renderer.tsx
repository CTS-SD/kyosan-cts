"use client";

import { useRichTextEditor } from "@/hooks/use-rich-text-editor";
import { cn } from "@/lib/utils";
import { EditorContent } from "@tiptap/react";
import { useEffect } from "react";

type Props = {
  content: string;
  onUpdate?: (content: string) => void;
  editable?: boolean;
  className?: string;
};

export const RichTextRenderer = ({
  content,
  onUpdate,
  editable,
  className,
}: Props) => {
  const editor = useRichTextEditor({
    content,
    onUpdate: ({ editor }) => {
      onUpdate?.(editor.getHTML());
    },
    editable,
  });

  useEffect(() => {
    if (!editor) return;
    if (editor.getHTML() !== content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <EditorContent
      className={cn(
        "has-[.ProseMirror-focused]:border-ring ring-ring/50 transition-[color,box-shadow] has-[.ProseMirror-focused]:ring-[3px] [&>div]:outline-none!",
        className,
      )}
      editor={editor}
    />
  );
};
