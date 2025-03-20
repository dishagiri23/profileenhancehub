
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

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar for service section */}
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
