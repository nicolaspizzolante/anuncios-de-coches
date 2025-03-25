import type { Metadata } from "next";
import { Poppins } from 'next/font/google';
import "./globals.css";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: "Anuncios de coches",
  description: "Encuentra los mejores anuncios de coches usados y nuevos.",
  keywords: "coches, anuncios, coches usados, venta de coches, compra de coches, anuncios de vehículos, coches en venta, coches de segunda mano, autos, automóviles, vehículos, mercado de coches, clasificados de coches, coches baratos, coches nuevos, coches de ocasión"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  )
}