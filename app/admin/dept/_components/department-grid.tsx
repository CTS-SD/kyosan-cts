type Props = {
  addButton: React.ReactNode;
  children: React.ReactNode;
};

export const DepartmentGrid = ({ addButton, children }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {children}
      <div className="grid place-content-center">{addButton}</div>
    </div>
  );
};
