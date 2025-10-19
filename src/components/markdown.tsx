import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

type Props = React.ComponentProps<typeof ReactMarkdown>;

export const Markdown = ({ rehypePlugins, remarkPlugins, ...props }: Props) => {
  return (
    <div className="prose prose-blue markdown dark:prose-invert">
      <ReactMarkdown
        rehypePlugins={[rehypeRaw, ...(rehypePlugins || [])]}
        remarkPlugins={[remarkGfm, remarkMath, ...(remarkPlugins || [])]}
        disallowedElements={["style", "script", "iframe"]}
        {...props}
      />
    </div>
  );
};
