'use client';

import { StudentBundle } from "@/lib/students";
import { createContext, useContext } from "react";

export const StudentBundlePromiseContext =
  createContext<Promise<StudentBundle> | null>(null);

export const useStudentBundlePromise = () => {
  const value = useContext(StudentBundlePromiseContext);
  if (!value) throw new Error("Missing StudentBundlePromiseContext");
  return value;
};

