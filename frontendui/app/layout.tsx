import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/components/ReduxProvider"; // ✅ Use a Client Component for Redux

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BidMaster - Online Auction Platform",
  description: "Discover unique items at unbeatable prices on BidMaster, the premier online auction platform.",
  generator: "v0.dev",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>{children}</ReduxProvider> {/* ✅ Wrap with a Client Component */}
      </body>
    </html>
  );
}
