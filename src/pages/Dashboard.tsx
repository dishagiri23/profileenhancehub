
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, UserCheck, MessageSquare, Award, Settings, BarChart, User, FileText } from "lucide-react";
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
  } | null>(null);

  // Check if user is logged in
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    
    if (storedUserData) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(storedUserData));
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
                {userData.name.substring(0, 2).toUpperCase()}
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
                  <div className="text-3xl font-bold text-white">78%</div>
                  <p className="text-white/70 text-sm">Profile completion</p>
                  <Button variant="link" className="text-primary p-0 h-auto mt-2">
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
                  <div className="text-3xl font-bold text-white">124</div>
                  <p className="text-white/70 text-sm">Total connections</p>
                  <Button variant="link" className="text-primary p-0 h-auto mt-2">
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
                  <div className="text-3xl font-bold text-white">8</div>
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
                  <div className="text-3xl font-bold text-white">3</div>
                  <p className="text-white/70 text-sm">Active applications</p>
                  <Button variant="link" className="text-primary p-0 h-auto mt-2">
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
                    <Button size="sm" variant="outline" className="mt-2 bg-white/5 hover:bg-white/10 border-white/10">
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
                    <Button size="sm" variant="outline" className="mt-2 bg-white/5 hover:bg-white/10 border-white/10">
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
                    <Button size="sm" variant="outline" className="mt-2 bg-white/5 hover:bg-white/10 border-white/10">
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
                <p className="text-white/70">Profile management features coming soon...</p>
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
                <p className="text-white/70">Settings management features coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Dashboard;
