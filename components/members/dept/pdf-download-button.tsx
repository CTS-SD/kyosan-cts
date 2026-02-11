"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { DownloadIcon } from "lucide-react";
import type { DepartmentTable } from "../../../lib/db/schema";
import { PlayfulButton } from "../../ui/playful-button";
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
}

export function PdfDownloadButton({ departments, students }: PdfDownloadButtonProps) {
  return (
    <PDFDownloadLink
      document={<ListPdfDocument departments={departments} students={students} />}
      fileName="京産キャンスタ部署発表一覧"
    >
      <PlayfulButton variant="outline" tint="blue" className="rounded-full">
        <DownloadIcon />
        PDFダウンロード
      </PlayfulButton>
    </PDFDownloadLink>
  );
}
