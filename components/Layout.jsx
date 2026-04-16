"use client";
import { Outlet } from 'next/navigation';
import ConsultancyPopup from './ConsultancyPopup';
import FloatingChatbot from './FloatingChatbot';
import Footer from './Footer';
import Navbar from './Navbar';
import StickyContactBar from './StickyContactBar';

export default function Layout() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pb-24 pt-24 lg:pb-0">
        <Outlet />
      </main>
      <Footer />
      <FloatingChatbot />
      <StickyContactBar />
      <ConsultancyPopup />
    </div>
  );
}
