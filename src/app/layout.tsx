import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { MobileNavbar } from "@/components/layout/MobileNavbar";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap"
});

export const metadata: Metadata = {
  title: "VedaAI - AI Assessment Creator",
  description: "AI powered teacher assessment creator"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={bricolage.variable}>
      <body className="bg-gradient-page font-sans">
        <MobileNavbar />
        <div className="min-h-[calc(100dvh-199px)] px-2 pb-[157px] pt-6 lg:min-h-screen lg:p-4 lg:flex lg:gap-4">
          <Sidebar />
          <div className="flex min-h-0 min-w-0 flex-1 flex-col lg:min-h-[calc(100vh-2rem)]">
            <div className="hidden lg:block">
              <Navbar />
            </div>
            <main className="min-h-0 flex-1">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
