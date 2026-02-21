"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { DownloadIcon } from "lucide-react";
import type { DepartmentTable } from "@/lib/db/schema";
import { PlayfulButton } from "../../../../components/ui/playful-button";
import { ListPdfDocument } from "./list-pdf-document";

type Student = {
  name: string;
  faculty: string;
  departmentId: number;
};

type Department = typeof DepartmentTable.$inferSelect;

interface PdfDownloadButtonProps {
  departments: Department[];
  students: Student[];
  year: number;
}

export function PdfDownloadButton({ departments, students, year }: PdfDownloadButtonProps) {
  return (
    <PDFDownloadLink
      document={<ListPdfDocument departments={departments} students={students} year={year} />}
      fileName={`京産キャンスタ部署発表${year}`}
    >
      <PlayfulButton variant="outline" tint="blue" className="rounded-full">
        <DownloadIcon />
        PDFダウンロード
      </PlayfulButton>
    </PDFDownloadLink>
  );
}
