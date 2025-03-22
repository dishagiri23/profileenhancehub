
import { Link } from "react-router-dom";
import { Linkedin, Mail, Twitter, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 - Logo and tagline */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Linkedin className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-bold text-white">ProfileEnhanceHub</h3>
            </div>
            <p className="text-white/70 text-sm max-w-xs ml-2">
              Elevate your professional presence with our AI-powered LinkedIn profile optimization tools.
            </p>
            <div className="flex space-x-3 pt-2 ml-2">
              <a href="#" className="text-white/50 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/50 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/50 hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Column 2 - Quick Links (centered between columns 1 and 3) */}
          <div className="space-y-4 flex flex-col items-center text-center">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-white/70 hover:text-primary transition-colors">Home</Link>
              <Link to="/services" className="text-white/70 hover:text-primary transition-colors">Services</Link>
              <Link to="/login" className="text-white/70 hover:text-primary transition-colors">Login</Link>
              <Link to="/signup" className="text-white/70 hover:text-primary transition-colors">Sign Up</Link>
              <Link to="/contact" className="text-white/70 hover:text-primary transition-colors">Contact</Link>
            </nav>
          </div>
          
          {/* Column 3 - Call to action */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Connect With Me</h3>
            <p className="text-white/70 text-sm">
              Ready to transform your professional image? Let's get started today!
            </p>
            <Link to="/contact" className="mt-6 inline-block">
              <Button className="bg-primary hover:bg-primary/90 text-white mt-3">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-white/10 text-center">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} ProfileEnhanceHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
