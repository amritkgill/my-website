import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const cormorant = Cormorant_Garamond({
  variable: "--font-main",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Amrit Gill",
  description:
    "Portfolio of Amrit Gill - economist, data analyst, and researcher",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cormorant.variable}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
