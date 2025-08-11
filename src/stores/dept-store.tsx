import { Department, Faculty, Student } from "@/lib/db/schema";
import { create } from "zustand";

export type DeptState = {
  students: Student[];
  departments: Department[];
  faculties: Faculty[];
};

export type DeptActions = {
  addStudents: (students: Student[]) => void;
  updateStudent: (student: Student) => void;
  removeStudent: (id: number) => void;
  getFacultyById: (id: number) => Faculty | undefined;
};

export type DeptStore = DeptState & DeptActions;

export const defaultInitState: DeptState = {
  students: [],
  departments: [],
  faculties: [],
};

export const createDeptStore = (initState: DeptState = defaultInitState) =>
  create<DeptStore>((set, get) => ({
    ...initState,
    addStudents: (students) =>
      set((state) => ({ students: [...state.students, ...students] })),
    updateStudent: (student) =>
      set((state) => ({
        students: state.students.map((s) =>
          s.id === student.id ? { ...s, ...student } : s,
        ),
      })),
    removeStudent: (studentId) =>
      set((state) => ({
        students: state.students.filter((student) => student.id !== studentId),
      })),
    getFacultyById: (id) => {
      const state = get();
      return state.faculties.find((f) => f.id === id);
    },
  }));
