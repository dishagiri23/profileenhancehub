
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, UserCheck, MessageSquare, Award, Settings, BarChart, User, FileText, Github, Linkedin, Twitter } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<{
    name: string;
    email: string;
    profileUrl: string;
    imageUrl: string;
    signUpMethod: string;
    optimizedSections?: string[];
    githubUsername?: string;
    twitterUsername?: string;
    googleAccount?: string;
    linkedinUsername?: string;
  } | null>(null);

  // Check if user is logged in
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    
    if (storedUserData) {
      setIsLoggedIn(true);
      const parsedData = JSON.parse(storedUserData);
      setUserData(parsedData);
    } else {
      // Redirect to login page if not logged in
      toast({
        title: "Authentication required",
        description: "Please log in to access your dashboard",
        variant: "destructive",
      });
      navigate("/login");
    }
  }, [navigate, toast]);

  const handleOptimizeProfile = () => {
    if (!userData?.profileUrl) {
      toast({
        title: "LinkedIn URL required",
        description: "Please enter your LinkedIn profile URL in the sidebar first",
        variant: "destructive",
      });
      return;
    }
    
    navigate("/services");
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  if (!isLoggedIn || !userData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  const optimizedSectionsCount = userData.optimizedSections?.length || 0;
  const profileCompletion = Math.min(Math.round((optimizedSectionsCount / 10) * 100), 100);

  return (
    <div className="pt-24 pb-20">
      <motion.div 
        className="container mx-auto px-4"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-primary/30">
              <AvatarImage src={userData.imageUrl || ""} alt={userData.name} />
              <AvatarFallback className="bg-primary/10 text-primary text-lg">
                {userData.name?.substring(0, 2).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">{userData.name}</h1>
              <p className="text-white/70">{userData.email}</p>
              {userData.profileUrl && (
                <a 
                  href={userData.profileUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  View LinkedIn Profile
                </a>
              )}
            </div>
          </div>
          <div className="glass-card px-4 py-2 rounded-lg">
            <p className="text-sm text-white/70">
              Signed in with <span className="text-primary font-medium">{userData.signUpMethod}</span>
            </p>
          </div>
        </div>

        {/* Social Accounts */}
        {(userData.githubUsername || userData.twitterUsername || userData.linkedinUsername || userData.googleAccount) && (
          <div className="glass-card rounded-xl p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4 text-white">Connected Accounts</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {userData.githubUsername && (
                <div className="flex items-center gap-3 bg-black/30 p-3 rounded-lg">
                  <Github className="h-5 w-5 text-white" />
                  <div>
                    <p className="text-white font-medium">GitHub</p>
                    <p className="text-white/70 text-sm truncate">{userData.githubUsername}</p>
                  </div>
                </div>
              )}
              
              {userData.twitterUsername && (
                <div className="flex items-center gap-3 bg-black/30 p-3 rounded-lg">
                  <Twitter className="h-5 w-5 text-white" />
                  <div>
                    <p className="text-white font-medium">Twitter</p>
                    <p className="text-white/70 text-sm truncate">{userData.twitterUsername}</p>
                  </div>
                </div>
              )}
              
              {userData.linkedinUsername && (
                <div className="flex items-center gap-3 bg-black/30 p-3 rounded-lg">
                  <Linkedin className="h-5 w-5 text-white" />
                  <div>
                    <p className="text-white font-medium">LinkedIn</p>
                    <p className="text-white/70 text-sm truncate">{userData.linkedinUsername}</p>
                  </div>
                </div>
              )}
              
              {userData.googleAccount && (
                <div className="flex items-center gap-3 bg-black/30 p-3 rounded-lg">
                  <svg className="h-5 w-5 text-white" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1Z"
                    />
                  </svg>
                  <div>
                    <p className="text-white font-medium">Google</p>
                    <p className="text-white/70 text-sm truncate">{userData.googleAccount}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Dashboard Content */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8 bg-black/20 p-1 rounded-lg">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="connections">Connections</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-black/40 border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Profile Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">{profileCompletion}%</div>
                  <p className="text-white/70 text-sm">Profile completion</p>
                  <Button 
                    variant="link" 
                    className="text-primary p-0 h-auto mt-2"
                    onClick={handleOptimizeProfile}
                  >
                    Complete profile
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-black/40 border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white flex items-center gap-2">
                    <UserCheck className="h-5 w-5 text-primary" />
                    Connections
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">
                    {Math.floor(Math.random() * 200) + 50}
                  </div>
                  <p className="text-white/70 text-sm">Total connections</p>
                  <Button 
                    variant="link" 
                    className="text-primary p-0 h-auto mt-2"
                    onClick={() => navigate("/services?section=networking")}
                  >
                    Grow network
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-black/40 border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Messages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">{Math.floor(Math.random() * 10)}</div>
                  <p className="text-white/70 text-sm">Unread messages</p>
                  <Button variant="link" className="text-primary p-0 h-auto mt-2">
                    View messages
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-black/40 border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    Job Applications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">{Math.floor(Math.random() * 5)}</div>
                  <p className="text-white/70 text-sm">Active applications</p>
                  <Button 
                    variant="link" 
                    className="text-primary p-0 h-auto mt-2"
                    onClick={() => navigate("/services?section=jobSearch")}
                  >
                    View applications
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-white">Profile Optimization Suggestions</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Enhance your About section</h4>
                    <p className="text-white/70 text-sm">Your About section could use more keywords relevant to your industry.</p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="mt-2 bg-white/5 hover:bg-white/10 border-white/10"
                      onClick={() => navigate("/services?section=profile&subsection=about&optimize=true")}
                    >
                      Optimize Now
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Add relevant skills</h4>
                    <p className="text-white/70 text-sm">We've identified 5 skills that could improve your profile visibility.</p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="mt-2 bg-white/5 hover:bg-white/10 border-white/10"
                      onClick={() => navigate("/services?section=profile&subsection=skills&optimize=true")}
                    >
                      Add Skills
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <BarChart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Improve profile discoverability</h4>
                    <p className="text-white/70 text-sm">Optimize your profile to appear in more search results.</p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="mt-2 bg-white/5 hover:bg-white/10 border-white/10"
                      onClick={() => navigate("/services?section=profile&subsection=headline&optimize=true")}
                    >
                      View Suggestions
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="profile">
            <Card className="bg-black/40 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Profile Settings</CardTitle>
                <CardDescription className="text-white/70">
                  Manage your profile information and visibility
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-white/80">Name</p>
                    <p className="text-white">{userData.name || "Not provided"}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-white/80">Email</p>
                    <p className="text-white">{userData.email || "Not provided"}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-white/80">LinkedIn Profile</p>
                    <p className="text-white">{userData.profileUrl || "Not set"}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-white/80">Login Method</p>
                    <p className="text-white">{userData.signUpMethod || "Email"}</p>
                  </div>
                  
                  {userData.githubUsername && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-white/80">GitHub Username</p>
                      <p className="text-white">{userData.githubUsername}</p>
                    </div>
                  )}
                  
                  {userData.twitterUsername && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-white/80">Twitter Username</p>
                      <p className="text-white">{userData.twitterUsername}</p>
                    </div>
                  )}
                  
                  {userData.linkedinUsername && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-white/80">LinkedIn Username</p>
                      <p className="text-white">{userData.linkedinUsername}</p>
                    </div>
                  )}
                  
                  {userData.googleAccount && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-white/80">Google Account</p>
                      <p className="text-white">{userData.googleAccount}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="activity">
            <Card className="bg-black/40 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
                <CardDescription className="text-white/70">
                  Track your recent interactions and engagements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-white/70">Activity tracking features coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="connections">
            <Card className="bg-black/40 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Your Connections</CardTitle>
                <CardDescription className="text-white/70">
                  Manage your professional network
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-white/70">Connection management features coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card className="bg-black/40 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Profile Analytics</CardTitle>
                <CardDescription className="text-white/70">
                  Insights about your profile performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-white/70">Analytics features coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card className="bg-black/40 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Account Settings</CardTitle>
                <CardDescription className="text-white/70">
                  Manage your account preferences and security
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-white font-medium">Reset Password</h3>
                    <p className="text-white/70 text-sm">Change your account password</p>
                    <Button 
                      variant="outline" 
                      className="mt-2 bg-white/5 hover:bg-white/10 border-white/10"
                      onClick={() => {
                        navigate("/login");
                        toast({
                          title: "Password Reset",
                          description: "Use the 'Forgot password?' link on the login page to reset your password.",
                        });
                      }}
                    >
                      Change Password
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-white font-medium">Notifications</h3>
                    <p className="text-white/70 text-sm">Manage your notification preferences</p>
                    <Button 
                      variant="outline" 
                      className="mt-2 bg-white/5 hover:bg-white/10 border-white/10"
                      onClick={() => {
                        toast({
                          title: "Feature coming soon",
                          description: "Notification settings will be available soon.",
                        });
                      }}
                    >
                      Notification Settings
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-white font-medium">Delete Account</h3>
                    <p className="text-white/70 text-sm">Permanently delete your account and all data</p>
                    <Button 
                      variant="destructive" 
                      className="mt-2"
                      onClick={() => {
                        toast({
                          title: "Feature coming soon",
                          description: "Account deletion will be available soon.",
                          variant: "destructive"
                        });
                      }}
                    >
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Dashboard;
