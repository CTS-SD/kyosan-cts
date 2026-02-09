import { Streamdown } from "streamdown";

type Props = React.ComponentProps<typeof Streamdown>;

export const Markdown = ({ children }: Props) => {
  return (
    <Streamdown
      mode="static"
      controls={{
        code: false,
        table: false,
      }}
    >
      {children}
    </Streamdown>
  );
};
