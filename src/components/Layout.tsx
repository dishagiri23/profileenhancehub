import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Close sidebar when changing routes
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // On larger screens, we can keep the sidebar open
        setIsSidebarOpen(true);
      } else {
        // On mobile, close the sidebar by default
        setIsSidebarOpen(false);
      }
    };

    // Initial check
    handleResize();

    // Update on resize
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar for optimization tools */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Main content */}
      <div className="flex flex-col w-full min-h-screen">
        <Navbar setIsSidebarOpen={setIsSidebarOpen} />
        <main className="flex-grow page-transition-in">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
