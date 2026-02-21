"use client";

import dynamic from "next/dynamic";

const PdfDownloadButton = dynamic(() => import("./pdf-download-button").then((mod) => mod.PdfDownloadButton), {
  ssr: false,
});

export function PdfDownloadButtonWrapper({
  departments,
  students,
  year,
}: React.ComponentProps<typeof PdfDownloadButton>) {
  return <PdfDownloadButton departments={departments} students={students} year={year} />;
}
