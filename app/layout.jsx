import "./globals.css";
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // Especifica los pesos que necesites
  variable: '--font-poppins', // Opcional: para usar como variable CSS
});

export const metadata = {
  title: "Anuncios de coches",
  description: "Anuncios de coches",
  keywords: "coches, anuncios"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        {children}
      </body>
    </html>
  );
}
