import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingChatbot from '../components/FloatingChatbot';
import StickyContactBar from '../components/StickyContactBar';
import ConsultancyPopup from '../components/ConsultancyPopup';

export const metadata = {
  title: "i2 Language",
  description: "Premium PTE, IELTS Coaching"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-white">
        <Navbar />
        <main className="pb-24 pt-24 lg:pb-0">{children}</main>
        <Footer />
        <FloatingChatbot />
        <StickyContactBar />
        <ConsultancyPopup />
      </body>
    </html>
  );
}