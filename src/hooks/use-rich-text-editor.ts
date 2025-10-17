import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

type Props = Parameters<typeof useEditor>[0];

export const useRichTextEditor = ({ ...props }: Props) =>
  useEditor({
    extensions: [StarterKit],
    immediatelyRender: false,
    ...props,
  });
