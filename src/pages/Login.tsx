
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Github, Linkedin, MailIcon, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Login successful",
      description: "Welcome back to ProfileEnhanceHub!",
      duration: 3000,
    });
    
    navigate("/dashboard");
    setIsLoading(false);
  };

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true);
    
    // Simulate social login
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: `${provider} login successful`,
      description: "Welcome to ProfileEnhanceHub!",
      duration: 3000,
    });
    
    navigate("/dashboard");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-black to-black z-0" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md glass-card rounded-xl p-8 relative z-10"
      >
        <Link to="/" className="absolute left-4 top-4 text-white/60 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-white/60">Log in to your ProfileEnhanceHub account</p>
        </div>
        
        <div className="space-y-6">
          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="bg-white/5 border-white/10 hover:bg-white/10 text-white"
              onClick={() => handleSocialLogin("Google")}
              disabled={isLoading}
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1Z"
                />
              </svg>
              Google
            </Button>
            <Button
              variant="outline"
              className="bg-white/5 border-white/10 hover:bg-white/10 text-white"
              onClick={() => handleSocialLogin("GitHub")}
              disabled={isLoading}
            >
              <Github className="h-5 w-5 mr-2" />
              GitHub
            </Button>
            <Button
              variant="outline"
              className="bg-white/5 border-white/10 hover:bg-white/10 text-white"
              onClick={() => handleSocialLogin("LinkedIn")}
              disabled={isLoading}
            >
              <Linkedin className="h-5 w-5 mr-2" />
              LinkedIn
            </Button>
            <Button
              variant="outline"
              className="bg-white/5 border-white/10 hover:bg-white/10 text-white"
              onClick={() => handleSocialLogin("Twitter")}
              disabled={isLoading}
            >
              <X className="h-5 w-5 mr-2" />
              Twitter
            </Button>
          </div>
          
          <div className="flex items-center gap-4">
            <Separator className="flex-grow bg-white/10" />
            <span className="text-xs text-white/40">OR</span>
            <Separator className="flex-grow bg-white/10" />
          </div>
          
          {/* Email Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-1">
                Email Address
              </label>
              <div className="relative">
                <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white focus-visible:ring-primary/40"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-white/70">
                  Password
                </label>
                <a href="#" className="text-xs text-primary hover:text-primary/80 transition-colors">
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/5 border-white/10 text-white focus-visible:ring-primary/40"
                placeholder="••••••••"
                required
              />
            </div>
            
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Log In"}
            </Button>
          </form>
          
          <div className="text-center text-sm text-white/60">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:text-primary/80 transition-colors">
              Sign up
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
