export const CheckFilledIcon = ({
  fill = "var(--color-sky-500)",
  ...props
}: React.ComponentProps<"svg">) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={fill}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" stroke={fill}></circle>
      <path d="m9 12 2 2 4-4" stroke="white"></path>
    </svg>
  );
};
