"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { DownloadIcon } from "lucide-react";
import { ListPdfDocument } from "@/components/members/dept/list-pdf-document";
import { Button } from "@/components/ui/button";
import type { DepartmentTable } from "@/lib/db/schema";

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
      <Button className="rounded-full">
        <DownloadIcon />
        PDFダウンロード
      </Button>
    </PDFDownloadLink>
  );
}
