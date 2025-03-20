
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, Image, Linkedin, MessageSquare, Search, UserCheck, X, Github, FileText, Bell, User, Award } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const { toast } = useToast();
  const [profileUrl, setProfileUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [currentTab, setCurrentTab] = useState("overview");

  const handleAnalyze = async () => {
    if (!profileUrl) {
      toast({
        title: "LinkedIn URL required",
        description: "Please enter your LinkedIn profile URL.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    setIsAnalyzing(true);
    
    // Simulate analysis
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    setIsAnalyzing(false);
    setShowResults(true);
    
    toast({
      title: "Analysis complete",
      description: "We've analyzed your LinkedIn profile and found several improvement opportunities.",
      duration: 3000,
    });
  };

  const profileScore = {
    overall: 68,
    sections: {
      profile: 75,
      headline: 65,
      about: 60,
      experience: 80,
      education: 70,
      skills: 55,
      recommendations: 40,
      engagement: 50
    }
  };

  const improvementAreas = [
    {
      section: "Profile Picture",
      icon: Image,
      score: 70,
      recommendations: [
        "Use a professional headshot with better lighting",
        "Ensure your face takes up 60% of the frame",
        "Choose a neutral background"
      ]
    },
    {
      section: "Headline",
      icon: FileText,
      score: 65,
      recommendations: [
        "Add specific technologies you work with",
        "Include your value proposition",
        "Use industry-specific keywords"
      ]
    },
    {
      section: "Skills",
      icon: Award,
      score: 55,
      recommendations: [
        "Add at least 10 more relevant skills",
        "Reorder skills to prioritize in-demand technologies",
        "Remove outdated or irrelevant skills"
      ]
    },
    {
      section: "Recommendations",
      icon: MessageSquare,
      score: 40,
      recommendations: [
        "Request recommendations from previous managers",
        "Ask colleagues to highlight specific projects",
        "Provide a reciprocal recommendation"
      ]
    }
  ];

  const recentUpdates = [
    {
      id: 1,
      title: "LinkedIn algorithm update",
      description: "LinkedIn has changed how content is shown in feeds. Learn how to adapt.",
      date: "2 days ago",
      icon: Bell
    },
    {
      id: 2,
      title: "New skill trends in tech",
      description: "Cloud-native skills now among the most sought-after by employers.",
      date: "1 week ago",
      icon: Award
    },
    {
      id: 3,
      title: "Profile optimization tips",
      description: "New research shows that profiles with quantifiable achievements get 40% more views.",
      date: "2 weeks ago",
      icon: User
    }
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-5xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="text-center mb-12">
            <motion.h1 
              className="text-4xl font-bold mb-4 text-gradient"
              variants={fadeIn}
            >
              LinkedIn Profile Dashboard
            </motion.h1>
            <motion.p 
              className="text-xl text-white/70 mb-8"
              variants={fadeIn}
            >
              Analyze your profile and get personalized recommendations.
            </motion.p>

            {!showResults && (
              <motion.div 
                className="max-w-2xl mx-auto glass-card rounded-xl p-8"
                variants={fadeIn}
              >
                <div className="mb-6">
                  <Linkedin className="h-10 w-10 text-linkedin mx-auto mb-4" />
                  <h2 className="text-2xl font-semibold text-white mb-2">Analyze Your LinkedIn Profile</h2>
                  <p className="text-white/70">
                    Enter your LinkedIn profile URL to get a detailed analysis and improvement recommendations.
                  </p>
                </div>
                
                <div className="relative mb-6">
                  <Input
                    value={profileUrl}
                    onChange={(e) => setProfileUrl(e.target.value)}
                    placeholder="https://www.linkedin.com/in/yourusername"
                    className="pr-24 bg-white/5 border-white/10 text-white focus-visible:ring-primary/40"
                  />
                  <Button
                    className="absolute right-0 top-0 h-full"
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? "Analyzing..." : "Analyze"}
                  </Button>
                </div>
                
                {isAnalyzing && (
                  <div className="space-y-2">
                    <p className="text-sm text-white/70 text-center">Analyzing your LinkedIn profile...</p>
                    <Progress value={45} className="h-2" />
                  </div>
                )}
              </motion.div>
            )}

            {showResults && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Tabs 
                  defaultValue="overview" 
                  value={currentTab}
                  onValueChange={setCurrentTab}
                  className="space-y-8"
                >
                  <TabsList className="grid w-full grid-cols-3 bg-white/5 p-1 rounded-lg">
                    <TabsTrigger value="overview" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="improvements" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
                      Improvements
                    </TabsTrigger>
                    <TabsTrigger value="resources" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
                      Resources
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-8">
                    <Card className="glass-card border-white/10">
                      <CardHeader>
                        <CardTitle className="text-xl text-white">Profile Score</CardTitle>
                        <CardDescription>
                          Your overall LinkedIn profile optimization score.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-center mb-8">
                          <div className="relative w-40 h-40">
                            <svg className="w-40 h-40" viewBox="0 0 100 100">
                              <circle
                                className="text-white/5"
                                strokeWidth="8"
                                stroke="currentColor"
                                fill="transparent"
                                r="40"
                                cx="50"
                                cy="50"
                              />
                              <circle
                                className="text-primary"
                                strokeWidth="8"
                                strokeDasharray={251.2}
                                strokeDashoffset={251.2 * (1 - profileScore.overall / 100)}
                                strokeLinecap="round"
                                stroke="currentColor"
                                fill="transparent"
                                r="40"
                                cx="50"
                                cy="50"
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white">
                              {profileScore.overall}%
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          {Object.entries(profileScore.sections).map(([key, value]) => (
                            <div key={key} className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm text-white/70 capitalize">{key}</span>
                                <span className="text-sm font-medium text-white">{value}%</span>
                              </div>
                              <Progress value={value} className="h-1.5" />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="glass-card border-white/10 overflow-hidden">
                        <CardHeader>
                          <CardTitle className="text-xl text-white">Key Improvements</CardTitle>
                          <CardDescription>
                            Focus on these areas for the biggest impact.
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                          <div className="divide-y divide-white/5">
                            {improvementAreas.slice(0, 3).map((area, index) => (
                              <div key={index} className="p-4 flex items-start space-x-4">
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                                  <area.icon className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                  <h3 className="text-sm font-medium text-white mb-1">{area.section}</h3>
                                  <p className="text-xs text-white/60">{area.recommendations[0]}</p>
                                </div>
                                <div className="ml-auto text-sm font-semibold text-white">{area.score}%</div>
                              </div>
                            ))}
                          </div>
                          <div className="p-4 bg-white/5">
                            <Button 
                              variant="link" 
                              className="p-0 h-auto text-primary"
                              onClick={() => setCurrentTab("improvements")}
                            >
                              View all improvements
                              <ArrowRight className="h-4 w-4 ml-1" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="glass-card border-white/10 overflow-hidden">
                        <CardHeader>
                          <CardTitle className="text-xl text-white">Recent Updates</CardTitle>
                          <CardDescription>
                            Latest LinkedIn trends and optimization tips.
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                          <div className="divide-y divide-white/5">
                            {recentUpdates.map((update) => (
                              <div key={update.id} className="p-4 flex items-start space-x-4">
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                                  <update.icon className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                  <h3 className="text-sm font-medium text-white mb-1">{update.title}</h3>
                                  <p className="text-xs text-white/60">{update.description}</p>
                                  <p className="text-xs text-white/40 mt-1">{update.date}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="improvements" className="space-y-6">
                    <h2 className="text-2xl font-bold text-white">Recommended Improvements</h2>
                    <p className="text-white/70">Focus on these areas to significantly improve your LinkedIn profile visibility.</p>
                    
                    <div className="grid grid-cols-1 gap-6">
                      {improvementAreas.map((area, index) => (
                        <div 
                          key={index}
                          className="glass-card border-white/10 p-6 rounded-xl"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mr-4">
                                <area.icon className="h-5 w-5 text-primary" />
                              </div>
                              <h3 className="text-xl font-medium text-white">{area.section}</h3>
                            </div>
                            <div className="flex items-center">
                              <p className="text-white/70 mr-2">Score:</p>
                              <p className={`text-lg font-bold ${
                                area.score >= 70 ? "text-green-500" : 
                                area.score >= 50 ? "text-amber-500" : 
                                "text-red-500"
                              }`}>
                                {area.score}%
                              </p>
                            </div>
                          </div>
                          
                          <div className="space-y-3 mt-6">
                            <h4 className="text-sm font-medium text-white/80">Recommendations:</h4>
                            <ul className="space-y-2">
                              {area.recommendations.map((rec, i) => (
                                <li key={i} className="flex items-start">
                                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                                  <p className="text-white/70">{rec}</p>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <Button 
                            className="w-full mt-6"
                            variant="outline"
                          >
                            Optimize This Section
                          </Button>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="resources" className="space-y-6">
                    <h2 className="text-2xl font-bold text-white">Resources & Tools</h2>
                    <p className="text-white/70">Helpful resources to enhance your LinkedIn presence.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="glass-card border-white/10">
                        <CardHeader>
                          <CardTitle className="text-xl text-white flex items-center">
                            <UserCheck className="h-5 w-5 mr-2 text-primary" />
                            Find Recruiters
                          </CardTitle>
                          <CardDescription>
                            Connect with recruiters in your target companies.
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <Input 
                              placeholder="Enter industry or company name" 
                              className="bg-white/5 border-white/10"
                            />
                            <Button className="w-full">
                              Search Recruiters
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="glass-card border-white/10">
                        <CardHeader>
                          <CardTitle className="text-xl text-white flex items-center">
                            <Search className="h-5 w-5 mr-2 text-primary" />
                            Job Description Analyzer
                          </CardTitle>
                          <CardDescription>
                            Optimize your profile for specific job descriptions.
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <Input 
                              placeholder="Paste job description here" 
                              className="bg-white/5 border-white/10"
                            />
                            <Button className="w-full">
                              Analyze
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="glass-card border-white/10 md:col-span-2">
                        <CardHeader>
                          <CardTitle className="text-xl text-white flex items-center">
                            <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                            Personalized Connection Message Generator
                          </CardTitle>
                          <CardDescription>
                            Create tailored connection requests that get accepted.
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <Input 
                              placeholder="Recipient's name" 
                              className="bg-white/5 border-white/10"
                            />
                            <Input 
                              placeholder="Recipient's position" 
                              className="bg-white/5 border-white/10"
                            />
                            <Input 
                              placeholder="Company name" 
                              className="bg-white/5 border-white/10"
                            />
                            <Input 
                              placeholder="Connection reason" 
                              className="bg-white/5 border-white/10"
                            />
                          </div>
                          <Button className="w-full">
                            Generate Message
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
