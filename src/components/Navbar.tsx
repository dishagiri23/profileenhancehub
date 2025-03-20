
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlignJustify, X, Linkedin, Search } from "lucide-react";

interface NavbarProps {
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const Navbar = ({ setIsSidebarOpen }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-black/80 backdrop-blur-xl border-b border-white/5"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(true)}
              className="mr-2 lg:hidden"
              aria-label="Open sidebar"
            >
              <AlignJustify className="h-5 w-5" />
            </Button>
            <Link
              to="/"
              className="flex items-center space-x-2 text-xl font-bold text-white group"
            >
              <Linkedin className="h-7 w-7 text-linkedin group-hover:animate-pulse-soft transition-all duration-300" />
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                ProfileEnhanceHub
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-all duration-300 hover:text-white link-underline ${
                  location.pathname === link.path
                    ? "text-white"
                    : "text-white/70"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <Button
                variant="ghost"
                className="text-white/80 hover:text-white hover:bg-white/10"
              >
                Log In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-primary hover:bg-primary/80 text-white">
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              className="text-white"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Search className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mt-4 py-4 border-t border-white/10 md:hidden animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium px-2 py-2 rounded-md transition-all ${
                    location.pathname === link.path
                      ? "bg-white/10 text-white"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex space-x-2 pt-2">
                <Link to="/login" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Log In
                  </Button>
                </Link>
                <Link to="/signup" className="flex-1">
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
