type SettingsItemProps = {
  children: React.ReactNode;
};

const SettingsItem = ({ children }: SettingsItemProps) => {
  return <div className="flex items-center gap-4 rounded-xl border p-4">{children}</div>;
};

export default SettingsItem;
