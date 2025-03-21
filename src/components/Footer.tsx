
import { Link } from "react-router-dom";
import { Linkedin, Twitter, Github, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const contactEmail = "dishagiri09170@gmail.com";

  return (
    <footer className="bg-black/50 backdrop-blur-lg border-t border-white/5 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">ProfileEnhanceHub</h3>
            <p className="text-sm text-white/70 leading-relaxed">
              Helping professionals optimize their LinkedIn profiles to stand out to recruiters and advance their careers.
            </p>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-primary" />
              <a 
                href={`mailto:${contactEmail}`} 
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                {contactEmail}
              </a>
            </div>
          </div>

          {/* Quick Links - Now centered */}
          <div className="space-y-4 text-center">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-white/70 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/services" className="text-sm text-white/70 hover:text-white transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/login" className="text-sm text-white/70 hover:text-white transition-colors">Login</Link>
              </li>
              <li>
                <Link to="/signup" className="text-sm text-white/70 hover:text-white transition-colors">Sign Up</Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-white/70 hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Connect With Me */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Connect With Me</h3>
            <div className="flex space-x-4">
              <a 
                href="https://www.linkedin.com/in/disha-giri-414a72314/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white/70 hover:text-linkedin transition-colors hover-scale"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a 
                href="https://x.com/Dev_DishaGiri" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white/70 hover:text-white transition-colors hover-scale"
                aria-label="Twitter Profile"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a 
                href="https://github.com/dishagiri23" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white/70 hover:text-white transition-colors hover-scale"
                aria-label="GitHub Profile"
              >
                <Github className="h-6 w-6" />
              </a>
            </div>
            <p className="text-sm text-white/70">
              Disha Giri<br />
              LinkedIn Profile Optimization Specialist<br />
              <a href={`mailto:${contactEmail}`} className="hover:text-white transition-colors">
                {contactEmail}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 text-center">
          <p className="text-sm text-white/50">
            © {currentYear} ProfileEnhanceHub by Disha Giri. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
