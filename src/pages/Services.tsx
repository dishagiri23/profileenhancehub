import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, Image, PenTool, FileText, Briefcase, GraduationCap, Star, Award,
  MessageSquare, Link as LinkIcon, Users, UserPlus, Search, Bell, Mail, CheckCircle
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const Services = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("profile");
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationComplete, setOptimizationComplete] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const section = searchParams.get("section");
    const subsection = searchParams.get("subsection");
    const optimize = searchParams.get("optimize");
    
    if (section) {
      setSelectedTab(section);
      
      if (subsection) {
        const sectionData = getServicesForTab(section);
        const service = sectionData.find(s => s.id === subsection);
        if (service) {
          setSelectedService(service);
          
          if (optimize === "true") {
            handleStartOptimization(true);
          }
        }
      }
    }
    
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(storedUserData));
    }
  }, [location.search]);

  const handleLearnMore = (service: any) => {
    if (!isLoggedIn) {
      toast({
        title: "Login required",
        description: "Please log in to access this service",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    setSelectedService(service);
  };

  const handleStartOptimization = (autoStart = false) => {
    if (!isLoggedIn) {
      toast({
        title: "Login required",
        description: "Please log in to start optimization",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    if (!userData?.profileUrl) {
      toast({
        title: "LinkedIn URL required",
        description: "Please enter your LinkedIn profile URL in the sidebar first",
        variant: "destructive",
      });
      
      if (!autoStart) {
        closeServiceDialog();
      }
      
      return;
    }
    
    setIsOptimizing(true);
    
    setTimeout(() => {
      setIsOptimizing(false);
      setOptimizationComplete(true);
      
      toast({
        title: "Optimization complete!",
        description: `Your ${selectedService?.title.toLowerCase()} has been optimized successfully.`,
      });
      
      const updatedUserData = JSON.parse(localStorage.getItem("userData") || "{}");
      updatedUserData.optimizedSections = updatedUserData.optimizedSections || [];
      
      if (selectedService && !updatedUserData.optimizedSections.includes(selectedService.id)) {
        updatedUserData.optimizedSections.push(selectedService.id);
      }
      
      localStorage.setItem("userData", JSON.stringify(updatedUserData));
      setUserData(updatedUserData);
      
      if (!autoStart) {
        setTimeout(() => {
          closeServiceDialog();
          navigate("/dashboard");
        }, 3000);
      }
    }, 2500);
  };

  const handleScheduleConsultation = () => {
    if (!isLoggedIn) {
      toast({
        title: "Login required",
        description: "Please log in to schedule a consultation",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    navigate("/contact");
    
    setTimeout(() => {
      toast({
        title: "Consultation request received",
        description: "We'll contact you shortly to schedule your consultation",
      });
    }, 500);
  };

  const closeServiceDialog = () => {
    setSelectedService(null);
    setIsOptimizing(false);
    setOptimizationComplete(false);
    
    navigate("/services", { replace: true });
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const tabs = [
    { id: "profile", label: "Profile Optimization", icon: User },
    { id: "networking", label: "Networking", icon: Users },
    { id: "jobSearch", label: "Job Search", icon: Search },
    { id: "outreach", label: "Outreach", icon: Mail },
    { id: "certifications", label: "Certifications", icon: Award }
  ];

  const profileServices = [
    {
      id: "picture",
      title: "Professional Profile Picture",
      description: "Create a professional headshot that makes the right first impression. We'll optimize your current picture or guide you in creating a new one.",
      icon: Image,
      details: [
        "Smile to look approachable",
        "Wear formal or semi-formal attire",
        "Use a plain, non-distracting background",
        "High-quality resolution image"
      ],
      longDescription: "Your profile picture is often the first impression recruiters get of you. Studies show that profiles with professional headshots get 14 times more views than those without. Our optimization helps you select or create the perfect professional image that establishes credibility while remaining approachable.",
      optimizationSteps: [
        "Analyze your current profile picture against industry standards",
        "Provide custom recommendations for lighting, attire, and background",
        "Suggest cropping and editing adjustments for maximum impact",
        "Compare with successful profiles in your industry"
      ],
      optimizationResult: "Your profile picture has been optimized with professional adjustments to improve clarity, background, and professional appearance. This enhances your first impression with recruiters."
    },
    {
      id: "banner",
      title: "Custom Banner Design",
      description: "Stand out with a professionally designed banner that showcases your personal brand and highlights your expertise.",
      icon: PenTool,
      details: [
        "Domain-specific visual elements",
        "Integrated tech stacks when relevant",
        "Balanced text and visual elements",
        "Color schemes that complement your profile"
      ],
      longDescription: "Your banner is valuable real estate that most LinkedIn users don't optimize. A customized banner can instantly communicate your professional identity and set you apart from competitors. We'll help you design a banner that visually reinforces your personal brand and areas of expertise.",
      optimizationSteps: [
        "Create a custom banner that aligns with your industry and personal brand",
        "Integrate relevant technology icons and visual elements",
        "Balance visual appeal with professional messaging",
        "Ensure design quality that looks good on all devices"
      ],
      optimizationResult: "Your custom banner has been designed to showcase your professional brand, incorporating relevant tech stack icons and visual elements that highlight your expertise."
    },
    {
      id: "headline",
      title: "Attention-Grabbing Headline",
      description: "Craft a headline that goes beyond your job title to showcase your expertise and value proposition.",
      icon: PenTool,
      details: [
        "Action-oriented specific phrases",
        "Industry-relevant keywords",
        "Clear value proposition",
        "Optimized for ATS systems"
      ],
      longDescription: "Your headline is one of the most important elements for LinkedIn search visibility. We'll help you craft a headline that not only captures attention but also includes the right keywords to ensure you appear in recruiter searches for your desired roles.",
      optimizationSteps: [
        "Research high-performing headlines in your industry",
        "Identify relevant keywords that boost search visibility",
        "Craft a headline that balances creativity with searchability",
        "Test variations to determine the most effective approach"
      ],
      optimizationResult: "Your headline has been optimized with industry-specific keywords and action-oriented phrases that clearly communicate your value proposition to recruiters."
    },
    {
      id: "about",
      title: "Compelling About Section",
      description: "Tell your professional story in a way that highlights your unique value and appeals to potential employers.",
      icon: FileText,
      details: [
        "Structured 4-part narrative",
        "Personal introduction and passion",
        "Key skills highlight",
        "Quantifiable achievements",
        "Clear call to action"
      ],
      longDescription: "Your About section is where you can really showcase your personality and professional journey. We'll help you structure this section to highlight your unique value proposition, incorporate relevant keywords, and create a narrative that engages readers and prompts them to take action.",
      optimizationSteps: [
        "Analyze your current About section for engagement and keyword density",
        "Structure a compelling narrative that highlights your unique value",
        "Incorporate industry-specific terminology and keywords",
        "Create a clear call-to-action that encourages connection"
      ]
    },
    {
      id: "experience",
      title: "Experience Section Enhancement",
      description: "Transform your work history into compelling narratives with measurable achievements and clear impact.",
      icon: Briefcase,
      details: [
        "Strategic use of action verbs",
        "Quantified results and metrics",
        "Role-specific achievements",
        "Technical terminology relevant to your field"
      ],
      longDescription: "Your Experience section needs to do more than just list job duties—it needs to demonstrate your impact. We'll help you transform each role description into a powerful showcase of your achievements, quantified results, and the specific value you provided to each organization.",
      optimizationSteps: [
        "Convert job descriptions from task-based to achievement-based",
        "Incorporate metrics and quantifiable results for each role",
        "Add relevant technical terminology and industry keywords",
        "Structure role descriptions for maximum readability and impact"
      ]
    },
    {
      id: "education",
      title: "Education Section Optimization",
      description: "Highlight your educational background in a way that supports your career goals and expertise.",
      icon: GraduationCap,
      details: [
        "Relevant coursework emphasis",
        "Academic achievements highlight",
        "Additional certifications",
        "Research and projects"
      ],
      longDescription: "Your Education section is more than just where you went to school—it can highlight relevant coursework, projects, and achievements that directly relate to your career goals. We'll help you optimize this section to emphasize the educational experiences that best support your professional narrative.",
      optimizationSteps: [
        "Highlight relevant coursework and specializations",
        "Showcase academic achievements and honors",
        "Integrate relevant research projects and their outcomes",
        "Structure education entries to emphasize career-relevant details"
      ]
    },
    {
      id: "featured",
      title: "Featured Section Curation",
      description: "Showcase your best work, articles, and achievements to provide evidence of your expertise.",
      icon: Star,
      details: [
        "Portfolio highlights",
        "Published articles and content",
        "Project showcases",
        "Recognition and awards"
      ],
      longDescription: "The Featured section allows you to showcase tangible evidence of your expertise. We'll help you select and organize the most impactful content—whether it's articles, external projects, media appearances, or presentations—to provide proof of your professional capabilities.",
      optimizationSteps: [
        "Select high-impact projects and content to feature",
        "Create compelling descriptions for each featured item",
        "Organize featured content for maximum visual impact",
        "Ensure all featured items support your professional narrative"
      ]
    },
    {
      id: "skills",
      title: "Strategic Skills Selection",
      description: "Identify and highlight the skills that recruiters are actually searching for in your industry.",
      icon: Award,
      details: [
        "Industry-specific keyword optimization",
        "Technical skills prioritization",
        "Soft skills balance",
        "Endorsement strategy"
      ],
      longDescription: "LinkedIn allows you to showcase up to 50 skills, but choosing the right ones is crucial. We'll research the most in-demand skills for your target roles and help you organize them strategically to improve your searchability and demonstrate your qualifications.",
      optimizationSteps: [
        "Research most-searched skills for your target roles",
        "Prioritize skills based on relevance and demand",
        "Balance technical and soft skills for a complete profile",
        "Develop a strategy to gain endorsements for key skills"
      ]
    },
    {
      id: "recommendations",
      title: "Recommendations Strategy",
      description: "Build a plan to gather impactful recommendations that enhance your credibility.",
      icon: MessageSquare,
      details: [
        "Targeted recommendation requests",
        "Guidance for recommenders",
        "Strategic recommendation placement",
        "Reciprocal recommendation approach"
      ],
      longDescription: "Quality recommendations add significant credibility to your profile. We'll help you develop a strategy to request recommendations from the right people, provide them with guidance on what to highlight, and manage your recommendations for maximum impact.",
      optimizationSteps: [
        "Identify key individuals to request recommendations from",
        "Create templates for personalized recommendation requests",
        "Provide guidance to recommenders on key points to highlight",
        "Develop a strategy for reciprocal recommendations"
      ]
    },
    {
      id: "customUrl",
      title: "Custom URL Creation",
      description: "Secure a professional, branded URL for your LinkedIn profile that's easy to share.",
      icon: LinkIcon,
      details: [
        "Clean, professional URL structure",
        "Name-based customization",
        "Removal of numbers and special characters",
        "Consistency with other professional handles"
      ],
      longDescription: "A customized LinkedIn URL is more professional, easier to share, and better for your personal brand. We'll help you create a clean, professional custom URL that removes random numbers and aligns with your personal branding across other platforms.",
      optimizationSteps: [
        "Create a professional custom URL based on your name",
        "Remove random numbers and special characters",
        "Ensure consistency with other professional handles",
        "Set up proper redirects if you're changing from an existing URL"
      ]
    }
  ];

  const networkingServices = [
    {
      id: "groups",
      title: "LinkedIn Groups Strategy",
      description: "Identify and join the most valuable LinkedIn groups for your industry to expand your network and visibility.",
      icon: Users,
      details: [
        "Industry-specific group recommendations",
        "Engagement strategies for each group",
        "Content sharing guidelines",
        "Networking opportunities within groups"
      ],
      longDescription: "LinkedIn groups can dramatically expand your network and visibility when approached strategically. We'll help you identify the most relevant groups in your industry, develop engagement strategies that position you as a thought leader, and create opportunities to connect with key professionals.",
      optimizationSteps: [
        "Research and recommend the most valuable groups in your industry",
        "Develop custom engagement strategies for different group types",
        "Create templates for valuable contributions to group discussions",
        "Build a schedule for consistent group participation"
      ],
      optimizationResult: "We've identified and added you to the top 5 LinkedIn groups in your industry, with customized engagement strategies to maximize your visibility and networking opportunities."
    },
    {
      id: "connect",
      title: "Strategic Connection Planning",
      description: "Develop a targeted approach to building your network with professionals who can advance your career.",
      icon: UserPlus,
      details: [
        "Recruiter identification in target companies",
        "Alumni connection strategy",
        "Industry leader targeting",
        "Peer network development"
      ],
      longDescription: "Building your LinkedIn network strategically is more effective than collecting random connections. We'll help you identify and connect with the right people—recruiters at your target companies, alumni from your schools, industry leaders, and peers—who can provide the most value to your professional journey.",
      optimizationSteps: [
        "Identify key recruiters and decision-makers at target companies",
        "Develop strategies to leverage alumni connections",
        "Create plans for connecting with industry thought leaders",
        "Build a balanced network expansion roadmap"
      ],
      optimizationResult: "We've identified key recruiters and decision-makers at your target companies, creating a custom contact list with verified information to help you connect directly with the right people."
    },
    {
      id: "requests",
      title: "Personalized Connection Requests",
      description: "Craft compelling connection messages that get accepted and start meaningful professional relationships.",
      icon: MessageSquare,
      details: [
        "Customized templates by recipient type",
        "Personalization strategies",
        "Follow-up messaging approaches",
        "Conversion to meaningful interaction"
      ],
      longDescription: "Generic connection requests are often ignored. We'll help you craft personalized, compelling connection messages tailored to different recipient types that significantly increase your acceptance rate and set the foundation for meaningful professional relationships.",
      optimizationSteps: [
        "Create customized templates for different connection types",
        "Develop personalization strategies that show genuine interest",
        "Design follow-up messaging sequences that build relationships",
        "Implement tracking to measure and improve acceptance rates"
      ],
      optimizationResult: "We've created customized templates and strategies for initial messages, follow-up sequences, and conversation advancement that generate responses and create meaningful professional relationships."
    }
  ];

  const jobSearchServices = [
    {
      id: "searchTips",
      title: "Advanced Search Techniques",
      description: "Master Boolean search and filters to find the hidden job opportunities that match your skills and goals.",
      icon: Search,
      details: [
        "Boolean search operator training",
        "Industry-specific search terms",
        "Location and remote work filters",
        "Company size and type targeting"
      ],
      longDescription: "Many job seekers only see a fraction of available opportunities because they don't know how to search effectively. We'll teach you advanced Boolean search techniques and custom filters that uncover hidden job opportunities perfectly matched to your skills and career goals.",
      optimizationSteps: [
        "Learn powerful Boolean search operators for precise job searches",
        "Create custom search strings tailored to your target roles",
        "Set up advanced filters to narrow results efficiently",
        "Develop strategies for discovering unadvertised opportunities"
      ],
      optimizationResult: "We've created personalized Boolean search templates and custom filters specific to your industry, helping you discover hidden job opportunities that match your skills and experience."
    },
    {
      id: "jobAlerts",
      title: "Job Alert Optimization",
      description: "Set up perfect job alerts that deliver relevant opportunities directly to your inbox.",
      icon: Bell,
      details: [
        "Keyword optimization for alerts",
        "Alert frequency settings",
        "Multi-criteria alert strategy",
        "Alert management system"
      ],
      longDescription: "Effective job alerts bring opportunities to you, saving time and ensuring you don't miss out. We'll help you set up optimized job alerts with the perfect keywords, filters, and frequency settings to deliver highly relevant opportunities directly to your inbox.",
      optimizationSteps: [
        "Create optimized search strings for job alerts",
        "Set ideal frequency settings based on market activity",
        "Implement multiple specialized alerts for different role types",
        "Develop a system to manage and refine alerts over time"
      ],
      optimizationResult: "We've created optimized job alerts with the perfect keywords and filters, delivering highly relevant opportunities directly to your inbox."
    },
    {
      id: "tools",
      title: "LinkedIn Job Search Tools",
      description: "Leverage LinkedIn's full suite of job search tools, including the Alumni tool to find connections at target companies.",
      icon: Search,
      details: [
        "Alumni tool utilization",
        "Company page monitoring",
        "Salary insights tool",
        "Job application tracking"
      ],
      longDescription: "LinkedIn offers powerful job search tools that most users never fully leverage. We'll show you how to use the Alumni tool to find connections at target companies, track companies for new opportunities, leverage salary insights for negotiation, and effectively manage your job application process.",
      optimizationSteps: [
        "Master the Alumni tool to find connections at target companies",
        "Set up strategic company following for opportunity alerts",
        "Leverage salary insights for interview preparation",
        "Create a system to track and follow up on applications"
      ],
      optimizationResult: "We've mastered the Alumni tool to find connections at target companies, setting up strategic company following for opportunity alerts, leveraging salary insights for interview preparation, and creating a system to track and follow up on applications."
    }
  ];

  const outreachServices = [
    {
      id: "contact",
      title: "Contact Discovery Strategy",
      description: "Find the right decision-makers and hiring managers for your target roles and companies.",
      icon: Users,
      details: [
        "Decision-maker identification techniques",
        "Hiring manager search strategies",
        "Email discovery methods",
        "Contact organization system"
      ],
      longDescription: "Finding the right people to contact dramatically increases your chances of landing interviews. We'll teach you proven techniques to identify decision-makers and hiring managers at your target companies, even when they're not publicly advertising positions.",
      optimizationSteps: [
        "Learn advanced search techniques to identify decision-makers",
        "Develop strategies to find hiring managers for specific departments",
        "Master methods to verify contact information",
        "Create a system to organize and prioritize outreach contacts"
      ],
      optimizationResult: "We've identified key decision-makers and hiring managers at your target companies, creating a custom contact list with verified information to help you connect directly with the right people."
    },
    {
      id: "cold",
      title: "Cold Outreach Templates",
      description: "Craft personalized outreach messages that get responses and create opportunities.",
      icon: MessageSquare,
      details: [
        "Customizable template library",
        "Follow-up sequence strategy",
        "Response handling approaches",
        "Conversation continuation techniques"
      ],
      longDescription: "Effective cold outreach can open doors to opportunities that never get publicly posted. We'll provide you with proven templates and strategies for initial messages, follow-up sequences, and conversation advancement that generate responses and create meaningful professional relationships.",
      optimizationSteps: [
        "Create customizable templates for different outreach scenarios",
        "Develop a strategic follow-up sequence that increases response rates",
        "Learn techniques for handling different types of responses",
        "Master strategies for converting initial contact into meaningful conversations"
      ],
      optimizationResult: "We've created customizable templates and strategies for initial messages, follow-up sequences, and conversation advancement that generate responses and create meaningful professional relationships."
    }
  ];

  const certificationServices = [
    {
      id: "recommendations",
      title: "Certification Recommendations",
      description: "Identify the certifications that will actually advance your career and make your profile stand out.",
      icon: Award,
      details: [
        "Industry-specific certification analysis",
        "ROI assessment of certification options",
        "Certification display strategy",
        "Learning path recommendations"
      ],
      longDescription: "Not all certifications are created equal. We'll analyze your industry and target roles to recommend certifications that provide the highest return on investment, enhance your credibility, and truly differentiate you from other candidates.",
      optimizationSteps: [
        "Research most-valued certifications for your target roles",
        "Analyze ROI of different certification options",
        "Create a strategic roadmap for certification acquisition",
        "Develop optimal strategies for displaying certifications on your profile"
      ],
      optimizationResult: "We've created a personalized certification roadmap for your career goals, identifying the highest-ROI certifications for your industry and providing guidance on how to effectively showcase them on your profile."
    }
  ];

  const getServicesForTab = (tabId: string) => {
    switch (tabId) {
      case "profile":
        return profileServices;
      case "networking":
        return networkingServices;
      case "jobSearch":
        return jobSearchServices;
      case "outreach":
        return outreachServices;
      case "certifications":
        return certificationServices;
      default:
        return profileServices;
    }
  };

  const isServiceOptimized = (serviceId: string) => {
    if (!userData || !userData.optimizedSections) return false;
    return userData.optimizedSections.includes(serviceId);
  };

  return (
    <div className="pt-24 pb-20">
      <motion.div 
        className="container mx-auto px-4"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-4"
            variants={fadeIn}
          >
            Our Services
          </motion.span>
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6 text-gradient"
            variants={fadeIn}
          >
            Comprehensive LinkedIn Optimization
          </motion.h1>
          <motion.p 
            className="text-xl text-white/70"
            variants={fadeIn}
          >
            From profile enhancements to strategic networking, we provide all the tools you need to stand out.
          </motion.p>
        </div>

        <Tabs defaultValue="profile" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-12 bg-black/20 p-1 rounded-lg">
            {tabs.map((tab) => (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id}
                className="flex items-center gap-2 py-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
              >
                <tab.icon className="h-4 w-4" />
                <span className="hidden md:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="mt-0">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                {getServicesForTab(tab.id).map((service) => (
                  <motion.div
                    key={service.id}
                    className="glass-card rounded-xl overflow-hidden hover-scale relative"
                    variants={fadeIn}
                  >
                    {isServiceOptimized(service.id) && (
                      <div className="absolute top-4 right-4 flex items-center gap-1 bg-primary/20 text-primary text-xs py-1 px-2 rounded-full">
                        <CheckCircle className="h-3 w-3" />
                        <span>Optimized</span>
                      </div>
                    )}
                    <div className="p-6">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <service.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-white">{service.title}</h3>
                      <p className="text-white/70 mb-4">{service.description}</p>
                      
                      <h4 className="text-sm font-medium text-white mb-2">What's included:</h4>
                      <ul className="space-y-2 mb-6">
                        {service.details.map((detail, index) => (
                          <li key={index} className="flex items-start text-sm">
                            <span className="text-primary mr-2">•</span>
                            <span className="text-white/70">{detail}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <Button 
                        className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10"
                        variant="outline"
                        onClick={() => handleLearnMore(service)}
                      >
                        {isServiceOptimized(service.id) ? "View Details" : "Learn More"}
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>

        <motion.div 
          className="mt-20 max-w-4xl mx-auto glass-card rounded-2xl p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-gradient">Ready to Transform Your LinkedIn Profile?</h2>
          <p className="text-lg text-white/70 mb-8">
            Get started today and see how a professionally optimized LinkedIn profile can open new doors for your career.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              className="px-8 py-6 text-base font-medium bg-primary hover:bg-primary/90 text-white"
              onClick={() => {
                if (!userData?.profileUrl) {
                  toast({
                    title: "LinkedIn URL required",
                    description: "Please enter your LinkedIn profile URL in the sidebar first",
                    variant: "destructive",
                  });
                  return;
                }
                navigate("/dashboard");
              }}
            >
              Start Your Optimization
            </Button>
            <Button 
              variant="outline" 
              className="px-8 py-6 text-base font-medium border-white/20 hover:bg-white/5"
              onClick={handleScheduleConsultation}
            >
              Schedule a Consultation
            </Button>
          </div>
        </motion.div>
      </motion.div>

      <Dialog open={!!selectedService} onOpenChange={() => selectedService && closeServiceDialog()}>
        <DialogContent className="bg-black/90 border border-white/10 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedService && (
            <>
              <DialogHeader className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <selectedService.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <DialogTitle className="text-xl text-white">{selectedService.title}</DialogTitle>
                    {isServiceOptimized(selectedService.id) && (
                      <span className="inline-flex items-center gap-1 bg-primary/20 text-primary text-xs py-0.5 px-2 rounded-full mt-1">
                        <CheckCircle className="h-3 w-3" />
                        <span>Optimized</span>
                      </span>
                    )}
                  </div>
                </div>
                <DialogDescription className="text-white/70 text-base">
                  {selectedService.description}
                </DialogDescription>
              </DialogHeader>
              
              {optimizationComplete ? (
                <div className="space-y-5 py-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium text-white mb-2">Optimization Complete!</h3>
                    <p className="text-white/80 mb-6">{selectedService.optimizationResult}</p>
                    
                    <Button 
                      onClick={() => {
                        closeServiceDialog();
                        navigate("/dashboard");
                      }}
                      className="bg-primary hover:bg-primary/90"
                    >
                      View Results on Dashboard
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-5 py-4">
                  {isOptimizing ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 mx-auto mb-4 relative">
                        <div className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
                        <selectedService.icon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-primary/70" />
                      </div>
                      <h3 className="text-xl font-medium text-white mb-2">Optimizing Your Profile</h3>
                      <p className="text-white/60">Please wait while we analyze and optimize your LinkedIn profile...</p>
                    </div>
                  ) : (
                    <>
                      <div>
                        <h3 className="text-lg font-medium text-white mb-2">In-Depth Overview</h3>
                        <p className="text-white/80 text-sm leading-relaxed">{selectedService.longDescription}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium text-white mb-2">How We Optimize This Area</h3>
                        <ul className="space-y-2">
                          {selectedService.optimizationSteps.map((step: string, index: number) => (
                            <li key={index} className="flex items-start text-sm">
                              <span className="text-primary font-medium mr-2">{index + 1}.</span>
                              <span className="text-white/80">{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="glass-card rounded-lg p-4">
                        <h3 className="text-sm font-medium text-white mb-2">What's Included:</h3>
                        <ul className="space-y-1">
                          {selectedService.details.map((detail: string, index: number) => (
                            <li key={index} className="flex items-start text-xs">
                              <span className="text-primary mr-2">•</span>
                              <span className="text-white/70">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              )}
              
              <DialogFooter className="flex flex-col sm:flex-row gap-3">
                <Button 
                  variant="outline" 
                  onClick={closeServiceDialog} 
                  className="bg-white/5 hover:bg-white/10 border-white/10"
                  disabled={isOptimizing}
                >
                  Close
                </Button>
                {!optimizationComplete && !isOptimizing && !isServiceOptimized(selectedService.id) && (
                  <Button 
                    onClick={() => handleStartOptimization()} 
                    className="bg-primary hover:bg-primary/90"
                    disabled={isOptimizing}
                  >
                    Optimize Now
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Services;
