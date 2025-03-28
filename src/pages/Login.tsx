
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Github, Linkedin, MailIcon, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [isResetting, setIsResetting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetPassword, setResetPassword] = useState("");

  // Validate email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Validate input
      if (!email || !password) {
        toast({
          title: "Error",
          description: "Please enter both email and password",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Email validation
      if (!validateEmail(email)) {
        toast({
          title: "Invalid email",
          description: "Please enter a valid email address",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      // Check if user exists in localStorage
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const user = storedUsers.find((u: any) => u.email === email);
      
      if (!user) {
        toast({
          title: "Account not found",
          description: "No account found with this email. Please sign up.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      // Check password
      if (user.password !== password) {
        toast({
          title: "Incorrect password",
          description: "The password you entered is incorrect",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      // Save user data to localStorage
      const userData = {
        name: user.name,
        email: user.email,
        profileUrl: user.profileUrl || "",
        imageUrl: user.imageUrl || "",
        signUpMethod: user.signUpMethod || "Email",
        githubUsername: user.githubUsername || "",
        twitterUsername: user.twitterUsername || "",
        googleAccount: user.googleAccount || "",
        linkedinUsername: user.linkedinUsername || ""
      };
      
      localStorage.setItem("userData", JSON.stringify(userData));
      
      toast({
        title: "Login successful",
        description: "Welcome back to ProfileEnhanceHub!",
        duration: 3000,
      });
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Login failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true);
    
    try {
      // Create mock user data for demo purposes with a valid looking email
      let mockEmail = "";
      let mockName = "";
      let mockUsername = "";
      
      switch(provider) {
        case "Google":
          mockEmail = "user_" + Math.floor(Math.random() * 10000) + "@gmail.com";
          mockName = "Google User";
          mockUsername = "googleuser" + Math.floor(Math.random() * 10000);
          break;
        case "GitHub":
          mockEmail = "user_" + Math.floor(Math.random() * 10000) + "@github.com";
          mockName = "GitHub User";
          mockUsername = "githubuser" + Math.floor(Math.random() * 10000);
          break;
        case "LinkedIn":
          mockEmail = "user_" + Math.floor(Math.random() * 10000) + "@linkedin.com";
          mockName = "LinkedIn User";
          mockUsername = "linkedinuser" + Math.floor(Math.random() * 10000);
          break;
        case "Twitter":
          mockEmail = "user_" + Math.floor(Math.random() * 10000) + "@twitter.com";
          mockName = "Twitter User";
          mockUsername = "twitteruser" + Math.floor(Math.random() * 10000);
          break;
        default:
          mockEmail = "user_" + Math.floor(Math.random() * 10000) + "@example.com";
          mockName = "Social User";
          mockUsername = "socialuser" + Math.floor(Math.random() * 10000);
      }
      
      const userData: any = {
        name: mockName,
        email: mockEmail,
        profileUrl: "",
        imageUrl: "",
        signUpMethod: provider
      };
      
      // Add specific social media info
      if (provider === "GitHub") {
        userData.githubUsername = mockUsername;
      } else if (provider === "Twitter") {
        userData.twitterUsername = mockUsername;
      } else if (provider === "LinkedIn") {
        userData.linkedinUsername = mockUsername;
      } else if (provider === "Google") {
        userData.googleAccount = mockEmail;
      }
      
      // Save to users array too for consistency
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const userExists = storedUsers.some((u: any) => u.email === mockEmail);
      
      if (!userExists) {
        storedUsers.push({
          ...userData,
          password: "socialLogin123" // Dummy password
        });
        localStorage.setItem("users", JSON.stringify(storedUsers));
      }
      
      localStorage.setItem("userData", JSON.stringify(userData));
      
      toast({
        title: `${provider} login successful`,
        description: "Welcome to ProfileEnhanceHub!",
        duration: 3000,
      });
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Login failed",
        description: `Could not login with ${provider}. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsResetting(true);
    
    try {
      // Email validation
      if (!validateEmail(resetEmail)) {
        toast({
          title: "Invalid email",
          description: "Please enter a valid email address",
          variant: "destructive",
        });
        setIsResetting(false);
        return;
      }
      
      // Check if user exists
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const userExists = storedUsers.some((u: any) => u.email === resetEmail);
      
      if (!userExists) {
        toast({
          title: "Account not found",
          description: "No account found with this email",
          variant: "destructive",
        });
        setIsResetting(false);
        return;
      }
      
      // Show reset password UI
      setResetSuccess(true);
      
    } catch (error) {
      toast({
        title: "Password reset failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      setIsResetting(false);
    }
  };

  const completePasswordReset = () => {
    if (!resetPassword || resetPassword.length < 6) {
      toast({
        title: "Invalid password",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Update user's password
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const updatedUsers = storedUsers.map((u: any) => {
        if (u.email === resetEmail) {
          return { ...u, password: resetPassword };
        }
        return u;
      });
      
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      
      // Reset states
      setForgotPasswordOpen(false);
      setResetEmail("");
      setResetPassword("");
      setResetSuccess(false);
      setIsResetting(false);
      
      toast({
        title: "Password reset successful",
        description: "Your password has been reset. Please login with your new password.",
        duration: 5000,
      });
      
    } catch (error) {
      toast({
        title: "Password reset failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
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
                <Button 
                  type="button" 
                  variant="link" 
                  className="text-xs text-primary hover:text-primary/80 transition-colors p-0 h-auto"
                  onClick={() => {
                    setResetEmail(email); // Pre-fill with current email if any
                    setForgotPasswordOpen(true);
                    setResetSuccess(false);
                  }}
                >
                  Forgot password?
                </Button>
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
      
      {/* Forgot Password Dialog */}
      <Dialog open={forgotPasswordOpen} onOpenChange={(open) => {
        setForgotPasswordOpen(open);
        if (!open) {
          setResetSuccess(false);
          setResetPassword("");
        }
      }}>
        <DialogContent className="bg-black/90 border border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">{resetSuccess ? "Set New Password" : "Reset Password"}</DialogTitle>
            <DialogDescription className="text-white/70">
              {resetSuccess 
                ? "Enter your new password below."
                : "Enter your email address and we'll send you a link to reset your password."}
            </DialogDescription>
          </DialogHeader>
          
          {!resetSuccess ? (
            <form onSubmit={handleForgotPassword}>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <label htmlFor="reset-email" className="text-sm font-medium text-white/70">
                    Email Address
                  </label>
                  <Input
                    id="reset-email"
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="bg-white/5 border-white/10 text-white focus-visible:ring-primary/40"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              <DialogFooter className="mt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="bg-white/5 border-white/10 text-white"
                  onClick={() => setForgotPasswordOpen(false)}
                  disabled={isResetting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-white"
                  disabled={isResetting}
                >
                  {isResetting ? "Verifying..." : "Reset Password"}
                </Button>
              </DialogFooter>
            </form>
          ) : (
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <label htmlFor="new-password" className="text-sm font-medium text-white/70">
                  New Password
                </label>
                <Input
                  id="new-password"
                  type="password"
                  value={resetPassword}
                  onChange={(e) => setResetPassword(e.target.value)}
                  className="bg-white/5 border-white/10 text-white focus-visible:ring-primary/40"
                  placeholder="Enter your new password"
                  minLength={6}
                  required
                />
                <p className="text-xs text-white/50">Password must be at least 6 characters</p>
              </div>
              <DialogFooter className="mt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="bg-white/5 border-white/10 text-white"
                  onClick={() => setForgotPasswordOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  className="bg-primary hover:bg-primary/90 text-white"
                  onClick={completePasswordReset}
                >
                  Save New Password
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Login;
