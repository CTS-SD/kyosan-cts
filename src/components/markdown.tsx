import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { cn } from "@/lib/utils";

type Props = React.ComponentProps<typeof ReactMarkdown> & {
  className?: string;
};

export const Markdown = ({ className, rehypePlugins, remarkPlugins, ...props }: Props) => {
  return (
    <div className={cn("prose prose-blue markdown dark:prose-invert prose-p:my-2 prose-p:leading-normal", className)}>
      <ReactMarkdown
        rehypePlugins={[rehypeRaw, ...(rehypePlugins || [])]}
        remarkPlugins={[remarkGfm, remarkMath, ...(remarkPlugins || [])]}
        disallowedElements={["style", "script", "iframe"]}
        {...props}
      />
    </div>
  );
};
