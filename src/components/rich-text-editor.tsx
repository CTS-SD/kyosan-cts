"use client";

import { useRichTextEditor } from "@/hooks/use-rich-text-editor";
import { EditorContent } from "@tiptap/react";
import { useEffect } from "react";

type Props = {
  content: string;
  onUpdate?: (content: string) => void;
  editable?: boolean;
  className?: string;
};

export const RichTextEditor = ({
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

  return <EditorContent className={className} editor={editor} />;
};
