
import { useState, useEffect } from "react";
import { X, ChevronRight, User, Image, PenTool, GraduationCap, Briefcase, Star, Link, Users, MessageSquare, Search, Award, UserPlus, Bell } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [profileUrl, setProfileUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("userData");
    if (userData) {
      setIsLoggedIn(true);
      // Get saved profile URL if available
      const parsedData = JSON.parse(userData);
      if (parsedData.profileUrl) {
        setProfileUrl(parsedData.profileUrl);
      }
    }
  }, []);

  const handleAnalyzeProfile = () => {
    // Validate URL
    if (!profileUrl) {
      toast({
        title: "URL required",
        description: "Please enter your LinkedIn profile URL",
        variant: "destructive",
      });
      return;
    }
    
    // Simple LinkedIn URL validation
    const isLinkedInUrl = profileUrl.includes("linkedin.com/");
    if (!isLinkedInUrl) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid LinkedIn profile URL",
        variant: "destructive",
      });
      return;
    }
    
    // Check if logged in
    if (!isLoggedIn) {
      toast({
        title: "Login required",
        description: "Please log in to analyze your profile",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      
      // Save URL to localStorage
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      userData.profileUrl = profileUrl;
      localStorage.setItem("userData", JSON.stringify(userData));
      
      toast({
        title: "Profile analyzed!",
        description: "Check the sections below for optimization suggestions",
      });
      
      // Close sidebar on mobile after analysis
      if (window.innerWidth < 1024) {
        setIsOpen(false);
      }
      
      // Navigate to dashboard with the analyzed profile
      navigate("/dashboard");
    }, 2000);
  };

  const handleSectionItemClick = (section: string, subsection: string) => {
    // Check if logged in
    if (!isLoggedIn) {
      toast({
        title: "Login required",
        description: "Please log in to access this feature",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    // Check if profile URL is provided
    if (!profileUrl) {
      toast({
        title: "Profile URL required",
        description: "Please enter your LinkedIn profile URL above",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate loading optimization tool
    toast({
      title: `Optimizing ${subsection}`,
      description: "Your profile is being optimized...",
    });
    
    // Navigate to appropriate service section with query params
    navigate(`/services?section=${section}&subsection=${subsection}&optimize=true`);
    
    // Close sidebar on mobile after selection
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  const sidebarSections = [
    {
      id: "profile",
      title: "Profile Optimization",
      icon: User,
      subsections: [
        { id: "picture", title: "Profile Picture", icon: Image },
        { id: "banner", title: "Custom Banner", icon: PenTool },
        { id: "headline", title: "Headline", icon: PenTool },
        { id: "about", title: "About Section", icon: PenTool },
        { id: "experience", title: "Experience", icon: Briefcase },
        { id: "education", title: "Education", icon: GraduationCap },
        { id: "featured", title: "Featured Section", icon: Star },
        { id: "skills", title: "Skills", icon: Award },
        { id: "recommendations", title: "Recommendations", icon: MessageSquare },
        { id: "customUrl", title: "Custom URL", icon: Link }
      ]
    },
    {
      id: "networking",
      title: "Networking Strategies",
      icon: Users,
      subsections: [
        { id: "groups", title: "LinkedIn Groups", icon: Users },
        { id: "connect", title: "Whom to Connect With", icon: UserPlus },
        { id: "requests", title: "Connection Requests", icon: MessageSquare }
      ]
    },
    {
      id: "jobSearch",
      title: "Job Search Optimization",
      icon: Search,
      subsections: [
        { id: "searchTips", title: "Search Tips", icon: Search },
        { id: "jobAlerts", title: "Job Alerts", icon: Bell },
        { id: "tools", title: "Search Tools", icon: Search }
      ]
    },
    {
      id: "outreach",
      title: "Outreach Strategies",
      icon: MessageSquare,
      subsections: [
        { id: "contact", title: "Finding Contacts", icon: Users },
        { id: "cold", title: "Cold Emails", icon: MessageSquare }
      ]
    },
    {
      id: "certifications",
      title: "Certifications",
      icon: Award,
      subsections: [
        { id: "recommendations", title: "Recommendations", icon: Award }
      ]
    }
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-50 h-full w-80 bg-black border-r border-white/10 shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } lg:relative lg:z-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-white/10">
          <h2 className="text-lg font-bold text-white">Optimization Tools</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 rounded-full hover:bg-white/5 transition-colors"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5 text-white/80" />
          </button>
        </div>

        <div className="p-4">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Enter LinkedIn URL"
              value={profileUrl}
              onChange={(e) => setProfileUrl(e.target.value)}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
            <button 
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors ${isAnalyzing ? 'pointer-events-none' : ''}`}
              aria-label="Analyze profile"
              onClick={handleAnalyzeProfile}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <div className="h-5 w-5 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
              ) : (
                <ChevronRight className="h-5 w-5" />
              )}
            </button>
          </div>

          <ScrollArea className="h-[calc(100vh-8rem)]">
            <Accordion type="single" collapsible className="w-full">
              {sidebarSections.map((section) => (
                <AccordionItem key={section.id} value={section.id} className="border-white/10">
                  <AccordionTrigger className="py-4 hover:bg-white/5 rounded px-2 group transition-all">
                    <div className="flex items-center text-white">
                      <section.icon className="mr-2 h-5 w-5 text-primary group-hover:text-primary/80 transition-colors" />
                      <span className="text-sm font-medium">{section.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-4">
                    <ul className="space-y-1">
                      {section.subsections.map((subsection) => (
                        <li key={subsection.id}>
                          <button
                            className="w-full flex items-center px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-md transition-all"
                            onClick={() => handleSectionItemClick(section.id, subsection.id)}
                          >
                            <subsection.icon className="mr-2 h-4 w-4 text-primary/80" />
                            <span>{subsection.title}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollArea>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
