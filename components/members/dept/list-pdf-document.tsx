"use client";

import { Document, Font, Page, PDFViewer, Svg, Text, View } from "@react-pdf/renderer";
import { SparklesIcon } from "lucide-react";
import { createTw } from "react-pdf-tailwind";

Font.register({
  family: "Noto Sans JP",
  fonts: [
    {
      src: "../../../fonts/NotoSansJP-Regular.ttf",
      fontWeight: "normal",
    },
    {
      src: "../../../fonts/NotoSansJP-Medium.ttf",
      fontWeight: "medium",
    },
  ],
});

const tw = createTw({
  fontFamily: {
    sans: ["Noto Sans JP"],
  },
});

type Props = {
  departments: {
    id: number;
    name: string;
  }[];
  students: {
    name: string;
    faculty: string;
    departmentId: number;
  }[];
  year?: number;
};

export const ListPdfDocument = ({ departments, students, year }: Props) => {
  const mounted = typeof window !== "undefined";
  if (!mounted) return null;

  return (
    <Document>
      <Page size="A4" style={tw("p-12 font-sans")}>
        <View>
          <Text style={tw("font-medium text-[12pt]")}>京産キャンスタ 配属部署発表{year}</Text>
        </View>
        <View style={tw("mt-12 flex-row flex-wrap gap-12")}>
          {departments.map((department) => (
            <View key={department.id} style={tw("")}>
              <Text
                key={department.id}
                style={tw("rounded-full bg-black px-4 py-1.5 font-medium text-base text-white")}
              >
                {department.name}
              </Text>
              <View style={tw("mt-4 gap-2 px-4")}>
                {students
                  .filter((student) => student.departmentId === department.id)
                  .map((student, j) => (
                    <View key={`${department.id}-${j}`} style={tw("flex-row gap-2")}>
                      <Text style={tw("font-medium text-[12pt]")}>{student.name}</Text>
                      <Text style={tw("text-[12pt] text-gray-500")}>{student.faculty}</Text>
                    </View>
                  ))}
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};
