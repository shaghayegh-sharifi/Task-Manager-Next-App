// app/layout.jsx
import './globals.css';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700'],
});
export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <title>Task Manager</title>
      </head>
      <body suppressHydrationWarning className={poppins.variable}>
        {children}
      </body>
    </html>
  );
}
