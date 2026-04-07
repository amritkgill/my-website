import { DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Amrit Gill | Economist & Data Storyteller",
  description:
    "Portfolio of Amrit Gill - economist, data analyst, and researcher",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${spaceGrotesk.variable}`}>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
