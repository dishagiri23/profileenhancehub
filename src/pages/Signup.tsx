
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Github, Linkedin, MailIcon, User, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    if (!agreeTerms) {
      toast({
        title: "Terms not accepted",
        description: "Please agree to our terms and conditions.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate signup
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Account created!",
      description: "Welcome to ProfileEnhanceHub!",
      duration: 3000,
    });
    
    navigate("/dashboard");
    setIsLoading(false);
  };

  const handleSocialSignup = async (provider: string) => {
    setIsLoading(true);
    
    // Simulate social signup
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: `${provider} signup successful`,
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
          <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-white/60">Join ProfileEnhanceHub to optimize your LinkedIn profile</p>
        </div>
        
        <div className="space-y-6">
          {/* Social Signup Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="bg-white/5 border-white/10 hover:bg-white/10 text-white"
              onClick={() => handleSocialSignup("Google")}
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
              onClick={() => handleSocialSignup("GitHub")}
              disabled={isLoading}
            >
              <Github className="h-5 w-5 mr-2" />
              GitHub
            </Button>
            <Button
              variant="outline"
              className="bg-white/5 border-white/10 hover:bg-white/10 text-white"
              onClick={() => handleSocialSignup("LinkedIn")}
              disabled={isLoading}
            >
              <Linkedin className="h-5 w-5 mr-2" />
              LinkedIn
            </Button>
            <Button
              variant="outline"
              className="bg-white/5 border-white/10 hover:bg-white/10 text-white"
              onClick={() => handleSocialSignup("Twitter")}
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
          
          {/* Email Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="pl-10 bg-white/5 border-white/10 text-white focus-visible:ring-primary/40"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-1">
                Email Address
              </label>
              <div className="relative">
                <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 bg-white/5 border-white/10 text-white focus-visible:ring-primary/40"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/70 mb-1">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-white/5 border-white/10 text-white focus-visible:ring-primary/40"
                placeholder="••••••••"
                required
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/70 mb-1">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="bg-white/5 border-white/10 text-white focus-visible:ring-primary/40"
                placeholder="••••••••"
                required
              />
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                className="border-white/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <label
                htmlFor="terms"
                className="text-sm text-white/60 leading-tight"
              >
                I agree to the{" "}
                <a href="#" className="text-primary hover:text-primary/80 transition-colors">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-primary hover:text-primary/80 transition-colors">
                  Privacy Policy
                </a>
              </label>
            </div>
            
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </form>
          
          <div className="text-center text-sm text-white/60">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:text-primary/80 transition-colors">
              Log in
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
