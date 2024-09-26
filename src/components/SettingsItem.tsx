type SettingsItemProps = {
  children: React.ReactNode;
};

const SettingsItem = ({ children }: SettingsItemProps) => {
  return <div className="flex border rounded-xl p-4 gap-4">{children}</div>;
};

export default SettingsItem;
