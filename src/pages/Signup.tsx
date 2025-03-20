
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Github, Linkedin, MailIcon, User, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Input validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    if (!validateEmail(formData.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    if (!validatePassword(formData.password)) {
      toast({
        title: "Weak password",
        description: "Password must be at least 8 characters and include uppercase, lowercase, and numbers",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    if (!agreeTerms) {
      toast({
        title: "Terms not accepted",
        description: "Please agree to our terms and conditions",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Check if user already exists
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const userExists = storedUsers.some((user: any) => user.email === formData.email);
      
      if (userExists) {
        toast({
          title: "Account already exists",
          description: "An account with this email already exists. Please log in.",
          variant: "destructive",
          duration: 3000,
        });
        setIsLoading(false);
        return;
      }
      
      // Add user to localStorage
      const newUser = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        profileUrl: "",
        imageUrl: "",
        signUpMethod: "Email"
      };
      
      const updatedUsers = [...storedUsers, newUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      
      // Save user data to session
      const userData = {
        name: formData.name,
        email: formData.email,
        profileUrl: "",
        imageUrl: "",
        signUpMethod: "Email"
      };
      
      localStorage.setItem("userData", JSON.stringify(userData));
      
      toast({
        title: "Account created!",
        description: "Welcome to ProfileEnhanceHub!",
        duration: 3000,
      });
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Sign up failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignup = async (provider: string) => {
    setIsLoading(true);
    
    try {
      if (!agreeTerms) {
        toast({
          title: "Terms not accepted",
          description: "Please agree to our terms and conditions",
          variant: "destructive",
          duration: 3000,
        });
        setIsLoading(false);
        return;
      }
      
      // Create mock user data for demo
      const userData = {
        name: `User via ${provider}`,
        email: `user_${Date.now()}@${provider.toLowerCase()}.example.com`,
        profileUrl: "",
        imageUrl: "",
        signUpMethod: provider
      };
      
      localStorage.setItem("userData", JSON.stringify(userData));
      
      toast({
        title: `${provider} signup successful`,
        description: "Welcome to ProfileEnhanceHub!",
        duration: 3000,
      });
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Sign up failed",
        description: `Could not sign up with ${provider}. Please try again.`,
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
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
              <p className="text-xs text-white/50 mt-1">
                Must be at least 8 characters with uppercase, lowercase, and numbers
              </p>
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
                <Button 
                  type="button" 
                  variant="link" 
                  className="p-0 h-auto text-primary hover:text-primary/80 transition-colors"
                  onClick={() => setShowTerms(true)}
                >
                  Terms of Service
                </Button>{" "}
                and{" "}
                <Button 
                  type="button" 
                  variant="link" 
                  className="p-0 h-auto text-primary hover:text-primary/80 transition-colors"
                  onClick={() => setShowPrivacy(true)}
                >
                  Privacy Policy
                </Button>
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
      
      {/* Terms of Service Dialog */}
      <Dialog open={showTerms} onOpenChange={setShowTerms}>
        <DialogContent className="bg-black/90 border border-white/10 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">Terms of Service</DialogTitle>
            <DialogDescription className="text-white/70">
              Last updated: {new Date().toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4 text-sm text-white/80">
            <h3 className="font-semibold text-white">1. Acceptance of Terms</h3>
            <p>
              By accessing or using ProfileEnhanceHub's services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
            
            <h3 className="font-semibold text-white">2. Description of Service</h3>
            <p>
              ProfileEnhanceHub provides LinkedIn profile optimization services designed to help users improve their professional online presence. We do not guarantee specific outcomes such as job offers or interviews.
            </p>
            
            <h3 className="font-semibold text-white">3. User Accounts</h3>
            <p>
              You are responsible for maintaining the confidentiality of your account information and password. You agree to notify us immediately of any unauthorized use of your account.
            </p>
            
            <h3 className="font-semibold text-white">4. User Conduct</h3>
            <p>
              You agree not to use ProfileEnhanceHub for any unlawful purpose or in any way that could damage, disable, or impair our services. You are solely responsible for the content you provide.
            </p>
            
            <h3 className="font-semibold text-white">5. Payment and Refunds</h3>
            <p>
              For paid services, payments are processed securely through our payment processors. Refunds are provided in accordance with our refund policy.
            </p>
            
            <h3 className="font-semibold text-white">6. Intellectual Property</h3>
            <p>
              All content, features, and functionality of ProfileEnhanceHub are owned by us and are protected by international copyright, trademark, and other intellectual property laws.
            </p>
            
            <h3 className="font-semibold text-white">7. Limitation of Liability</h3>
            <p>
              ProfileEnhanceHub shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services.
            </p>
            
            <h3 className="font-semibold text-white">8. Termination</h3>
            <p>
              We reserve the right to terminate or suspend your account and access to our services at our sole discretion, without notice, for conduct that we believe violates these Terms of Service.
            </p>
            
            <h3 className="font-semibold text-white">9. Changes to Terms</h3>
            <p>
              We reserve the right to modify these terms at any time. We will provide notice of significant changes by updating the date at the top of these terms.
            </p>
            
            <h3 className="font-semibold text-white">10. Contact Information</h3>
            <p>
              For questions about these Terms of Service, please contact us at dishagiri09170@gmail.com.
            </p>
          </div>
          <div className="flex justify-end">
            <Button 
              onClick={() => setShowTerms(false)}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Privacy Policy Dialog */}
      <Dialog open={showPrivacy} onOpenChange={setShowPrivacy}>
        <DialogContent className="bg-black/90 border border-white/10 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">Privacy Policy</DialogTitle>
            <DialogDescription className="text-white/70">
              Last updated: {new Date().toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4 text-sm text-white/80">
            <h3 className="font-semibold text-white">1. Information We Collect</h3>
            <p>
              We collect information you provide directly to us, such as your name, email address, LinkedIn profile URL, and other professional information. We also collect information automatically when you use our services.
            </p>
            
            <h3 className="font-semibold text-white">2. How We Use Your Information</h3>
            <p>
              We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to comply with legal obligations.
            </p>
            
            <h3 className="font-semibold text-white">3. Information Sharing</h3>
            <p>
              We do not sell, rent, or share your personal information with third parties except as described in this policy. We may share information with service providers who perform services on our behalf.
            </p>
            
            <h3 className="font-semibold text-white">4. Data Security</h3>
            <p>
              We implement appropriate security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information.
            </p>
            
            <h3 className="font-semibold text-white">5. Your Choices</h3>
            <p>
              You can access, update, or delete your account information at any time. You can also opt out of receiving promotional communications from us.
            </p>
            
            <h3 className="font-semibold text-white">6. Cookies</h3>
            <p>
              We use cookies and similar technologies to collect information about your browsing activities and to remember your preferences.
            </p>
            
            <h3 className="font-semibold text-white">7. Changes to This Policy</h3>
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.
            </p>
            
            <h3 className="font-semibold text-white">8. Contact Us</h3>
            <p>
              If you have any questions about this privacy policy, please contact us at dishagiri09170@gmail.com.
            </p>
          </div>
          <div className="flex justify-end">
            <Button 
              onClick={() => setShowPrivacy(false)}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Signup;
