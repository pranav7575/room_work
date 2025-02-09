import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";

// Importing fonts
const interFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const robotoMonoFont = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});

// Metadata declaration
export const metadata = {
  title: "BKL RoomMate",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${interFont.variable} ${robotoMonoFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
