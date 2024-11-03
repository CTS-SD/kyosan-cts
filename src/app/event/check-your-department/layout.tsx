"use client";

import Header from "@/app/(user)/Header";
import kyosan2024 from "../../../assets/kyansuta2024.png";
import Link from "next/link";
import "./style.css";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div
      id="bg"
      className="relative min-h-[100dvh] w-full overflow-clip text-white"
    >
      <div className="absolute -left-1/2 -top-1/2 z-[-1] h-[200%] w-[200%] -rotate-12 bg-gradient-to-br from-cyan-600 to-blue-700"></div>
      <div
        className="absolute -left-1/2 -top-1/2 z-[-1] h-[200%] w-[200%] -rotate-[20deg] opacity-30"
        style={{
          backgroundImage: `url(${kyosan2024.src})`,
          backgroundRepeat: "repeat",
          backgroundSize: "160px",
        }}
      ></div>
      <header className="">
        <div className="mx-auto flex h-[90px] max-w-5xl items-center gap-4 border-white/60 px-6">
          <Link href="/" className="font-bold tracking-tighter">
            京産キャンスタ
          </Link>
          <span className="block h-6 w-[2px] rounded-full bg-white/40"></span>
          <Link
            href="/event/check-your-department"
            className="font-bold tracking-tighter"
          >
            配属発表2024
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
};

export default Layout;
