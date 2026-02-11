import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

type Props = {
  icon: LucideIcon;
  label: React.ReactNode;
  value: React.ReactNode;
};

export const ScoreBox = ({ icon: Icon, label, value }: Props) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.8 },
        show: { opacity: 1, scale: 1 },
      }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="flex flex-col items-center overflow-clip rounded-3xl border bg-card shadow-xs"
    >
      <motion.div className="flex items-center gap-1.5 py-3 text-muted-foreground">
        <Icon className="size-4 sm:size-5" />
        <span className="font-semibold text-base sm:text-lg">{label}</span>
      </motion.div>
      <div className="w-full p-1.5 pt-0">
        <div className="w-full rounded-2xl bg-accent py-4 text-center">
          <div className="font-bold text-xl">{value}</div>
        </div>
      </div>
    </motion.div>
  );
};
