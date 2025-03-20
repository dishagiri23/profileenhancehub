
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Linkedin, Users, Search, Trophy, Briefcase, GraduationCap, Image, User, MessageSquare } from "lucide-react";

// Import the motion library
import { useAnimate, stagger } from "framer-motion";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration:.5 }
    }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const services = [
    {
      icon: User,
      title: "Profile Optimization",
      description: "Create a recruiter-ready profile that ranks high on ATS systems."
    },
    {
      icon: Image,
      title: "Visual Enhancement",
      description: "Professional profile pictures and banners that make a lasting impression."
    },
    {
      icon: Briefcase,
      title: "Experience Highlighting",
      description: "Showcase your experience with action verbs and quantifiable achievements."
    },
    {
      icon: Users,
      title: "Networking Strategies",
      description: "Connect with the right people to expand your professional network."
    },
    {
      icon: Search,
      title: "Job Search Optimization",
      description: "Fine-tune your job search with effective Boolean search techniques."
    },
    {
      icon: MessageSquare,
      title: "Outreach Templates",
      description: "Personalized message templates for effective cold outreach."
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent"
          style={{
            backgroundImage: "radial-gradient(circle at 25% 25%, rgba(74, 47, 189, 0.2) 0%, transparent 50%)"
          }}
        ></div>
        
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeIn}
          >
            <motion.div 
              className="inline-flex items-center px-3 py-1 mb-6 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Linkedin className="w-4 h-4 mr-2" />
              LinkedIn Profile Optimization
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 text-gradient"
              variants={fadeIn}
            >
              Elevate Your Professional Presence on LinkedIn
            </motion.h1>
            
            <motion.p 
              className="text-xl text-white/70 mb-10 leading-relaxed"
              variants={fadeIn}
            >
              Stand out to recruiters, optimize for ATS, and unlock career opportunities with our comprehensive LinkedIn profile enhancement services.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4"
              variants={fadeIn}
            >
              <Link to="/services">
                <Button className="px-8 py-6 text-base font-medium bg-primary hover:bg-primary/90 text-white">
                  Explore Services
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="px-8 py-6 text-base font-medium border-white/20 hover:bg-white/5">
                  Contact Me
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </section>

      {/* Services Overview */}
      <section className="py-20 md:py-32 relative">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-white/5 text-white/70 text-sm mb-4">
              Our Services
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">Comprehensive LinkedIn Optimization</h2>
            <p className="text-white/70">
              From profile enhancements to strategic networking, we provide everything you need to make your LinkedIn profile stand out.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="glass-card p-6 rounded-xl hover-scale"
                variants={fadeIn}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{service.title}</h3>
                <p className="text-white/70 mb-4">{service.description}</p>
                <Link to="/services" className="text-primary inline-flex items-center text-sm font-medium hover:text-primary/80 transition-colors">
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-black/30 border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-3xl md:text-4xl font-bold text-white mb-2">500+</p>
              <p className="text-white/60 text-sm">Profiles Optimized</p>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p className="text-3xl md:text-4xl font-bold text-white mb-2">80%</p>
              <p className="text-white/60 text-sm">Interview Rate Increase</p>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-3xl md:text-4xl font-bold text-white mb-2">90%</p>
              <p className="text-white/60 text-sm">Client Satisfaction</p>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="text-3xl md:text-4xl font-bold text-white mb-2">50+</p>
              <p className="text-white/60 text-sm">Industries Served</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto glass-card rounded-2xl p-8 md:p-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">Ready to Transform Your LinkedIn Presence?</h2>
            <p className="text-xl text-white/70 mb-8">
              Take the first step toward a professional profile that opens doors to new opportunities.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/signup">
                <Button className="px-8 py-6 text-base font-medium bg-primary hover:bg-primary/90 text-white">
                  Get Started Today
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" className="px-8 py-6 text-base font-medium border-white/20 hover:bg-white/5">
                  View All Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
