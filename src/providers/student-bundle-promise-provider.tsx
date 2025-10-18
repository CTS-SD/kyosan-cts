"use client";

import { StudentBundlePromiseContext } from "@/ctx/student-bundle-promise-context";

export const StudentBundlePromiseProvider = (
  props: React.ComponentProps<typeof StudentBundlePromiseContext.Provider>,
) => {
  return <StudentBundlePromiseContext.Provider {...props} />;
};
