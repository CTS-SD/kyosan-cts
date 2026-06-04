"use client";

import { createContext, use } from "react";
import type { Department, Faculty } from "@/features/students/types";

type DeptRefsContextValue = {
  faculties: Faculty[];
  departments: Department[];
};

const DeptRefsContext = createContext<DeptRefsContextValue | null>(null);

export const useDeptRefs = () => {
  const context = use(DeptRefsContext);
  if (!context) throw new Error("useDeptRefs must be used within DeptRefsProvider");
  return context;
};

export const DeptRefsProvider = ({
  faculties,
  departments,
  children,
}: DeptRefsContextValue & { children: React.ReactNode }) => {
  return <DeptRefsContext value={{ faculties, departments }}>{children}</DeptRefsContext>;
};
