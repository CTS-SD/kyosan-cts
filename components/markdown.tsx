import { Streamdown } from "streamdown";

export const Markdown = ({ ...props }: React.ComponentProps<typeof Streamdown>) => {
  return (
    <Streamdown
      mode="static"
      controls={{
        code: false,
        table: false,
      }}
      {...props}
    />
  );
};
