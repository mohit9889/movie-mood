import React from "react";
import Header from "./Header";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-nunito",
});

const MainLayout = ({ children, loading }) => {
  return (
    <div
      className={`bg-primary text-typography ${
        loading ? "relative overflow-hidden h-screen" : ""
      }`}
    >
      <div
        className={`${nunito.variable} font-sans min-h-screen w-full p-2 lg:p-6 max-w-4xl mx-auto`}
      >
        <Header />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
