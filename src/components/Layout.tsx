import { useState, useEffect, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Close sidebar when changing routes on mobile
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname]);

  // Handle sidebar visibility based on screen size
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
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar setIsSidebarOpen={setIsSidebarOpen} />
      
      <div className="flex flex-1 w-full">
        {/* Sidebar for optimization tools */}
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        {/* Main content - centered */}
        <div className="flex-1 mx-auto w-full max-w-screen-xl">
          <main className="flex-grow page-transition-in pt-16">
            {children}
          </main>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Layout;
