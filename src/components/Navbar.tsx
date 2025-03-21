
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlignJustify, X, Linkedin, Search, LogOut, User, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

interface NavbarProps {
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const Navbar = ({ setIsSidebarOpen }: NavbarProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    
    // Check if user is logged in
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(storedUserData));
    }
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    // Clear user data
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    setUserData(null);
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    
    navigate("/");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-black/80 backdrop-blur-xl border-b border-white/5"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo and Sidebar Toggle */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(true)}
              className="mr-2 lg:hidden text-white hover:bg-white/10"
              aria-label="Open sidebar"
            >
              <AlignJustify className="h-5 w-5" />
            </Button>
            <Link
              to="/"
              className="flex items-center space-x-1 sm:space-x-2 text-lg sm:text-xl font-bold text-white group"
            >
              <Linkedin className="h-6 w-6 sm:h-7 sm:w-7 text-primary group-hover:animate-pulse-soft transition-all duration-300" />
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent truncate">
                ProfileEnhanceHub
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
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

          {/* Auth Buttons / User Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn && userData ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8 border border-primary/30">
                      <AvatarImage src={userData.imageUrl || ""} alt={userData.name} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {userData.name ? userData.name.substring(0, 2).toUpperCase() : "??"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-black/90 border-white/10 text-white" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{userData.name}</p>
                      <p className="text-xs leading-none text-white/70">{userData.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem
                    className="text-white/70 focus:text-white focus:bg-white/10 cursor-pointer"
                    onClick={() => navigate("/dashboard")}
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-white/70 focus:text-white focus:bg-white/10 cursor-pointer"
                    onClick={() => navigate("/profile")}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Profile Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem
                    className="text-white/70 focus:text-white focus:bg-white/10 cursor-pointer"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
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
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            {isLoggedIn && userData ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8 border border-primary/30">
                      <AvatarImage src={userData.imageUrl || ""} alt={userData.name} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {userData.name ? userData.name.substring(0, 2).toUpperCase() : "??"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-black/90 border-white/10 text-white" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{userData.name}</p>
                      <p className="text-xs leading-none text-white/70">{userData.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem
                    className="text-white/70 focus:text-white focus:bg-white/10 cursor-pointer"
                    onClick={() => navigate("/dashboard")}
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-white/70 focus:text-white focus:bg-white/10 cursor-pointer"
                    onClick={() => navigate("/profile")}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Profile Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem
                    className="text-white/70 focus:text-white focus:bg-white/10 cursor-pointer"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                className="text-white hover:bg-white/10"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Search className="h-5 w-5" />
                )}
              </Button>
            )}
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
              {!isLoggedIn && (
                <div className="flex space-x-2 pt-2">
                  <Link to="/login" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10">
                      Log In
                    </Button>
                  </Link>
                  <Link to="/signup" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
