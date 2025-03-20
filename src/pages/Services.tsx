
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, Image, PenTool, FileText, Briefcase, GraduationCap, Star, Award,
  MessageSquare, Link as LinkIcon, Users, UserPlus, Search, Bell, Mail
} from "lucide-react";

const Services = () => {
  const [selectedTab, setSelectedTab] = useState("profile");

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
      description: "Create a professional headshot that makes the right first impression. We'll guide you through lighting, attire, and background choices.",
      icon: Image,
      details: [
        "Smile to look approachable",
        "Wear formal or semi-formal attire",
        "Use a plain, non-distracting background",
        "High-quality resolution image"
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
    }
  ];

  const certificationServices = [
    {
      id: "certifications",
      title: "Certification Recommendations",
      description: "Identify the certifications that will actually advance your career and make your profile stand out.",
      icon: Award,
      details: [
        "Industry-specific certification analysis",
        "ROI assessment of certification options",
        "Certification display strategy",
        "Learning path recommendations"
      ]
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

  return (
    <div className="pt-24 pb-20">
      <motion.div 
        className="container mx-auto px-4"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {/* Header */}
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

        {/* Services Tabs */}
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
                    className="glass-card rounded-xl overflow-hidden hover-scale"
                    variants={fadeIn}
                  >
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
                      >
                        Learn More
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>

        {/* CTA Section */}
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
            <Button className="px-8 py-6 text-base font-medium bg-primary hover:bg-primary/90 text-white">
              Start Your Optimization
            </Button>
            <Button variant="outline" className="px-8 py-6 text-base font-medium border-white/20 hover:bg-white/5">
              Schedule a Consultation
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Services;
