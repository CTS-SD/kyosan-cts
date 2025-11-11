"use client";

import { StudentBundle } from "@/lib/students";
import { createContext, useContext } from "react";

const StudentBundlePromiseContext = createContext<Promise<StudentBundle> | null>(null);

export const useStudentBundlePromise = () => {
  const value = useContext(StudentBundlePromiseContext);
  if (!value) throw new Error("Missing StudentBundlePromiseContext");
  return value;
};

export const StudentBundlePromiseProvider = (
  props: React.ComponentProps<typeof StudentBundlePromiseContext.Provider>,
) => {
  return <StudentBundlePromiseContext.Provider {...props} />;
};
