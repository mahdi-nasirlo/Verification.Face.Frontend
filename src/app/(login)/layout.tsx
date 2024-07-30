import { auth } from "@/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";
import CustomTheme from "../../theme/custom-theme";

// import photo from "@/root/public/images/login-bg.jpg";

interface TProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "صفحه ورود",
};

export default async function Layout({ children }: TProps) {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <section
      dir="rtl"
      style={{ background: CustomTheme.token?.colorBgBase }}
      className="bg-network bg-no-repeat bg-center xl:bg-left h-screen w-full flex items-center"
    >
      {children}
    </section>
  );
}
