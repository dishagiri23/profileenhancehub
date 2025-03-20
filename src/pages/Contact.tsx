
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Linkedin, Twitter, Github, Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
      duration: 5000,
    });
    
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
    setIsSubmitting(false);
  };

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
            Get In Touch
          </motion.span>
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6 text-gradient"
            variants={fadeIn}
          >
            Let's Connect
          </motion.h1>
          <motion.p 
            className="text-xl text-white/70"
            variants={fadeIn}
          >
            Have questions about LinkedIn optimization or ready to get started? Reach out and I'll be happy to help!
          </motion.p>
        </div>

        {/* Contact Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            className="glass-card rounded-xl p-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-6 text-white">Send Me a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-1">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-primary/40"
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-1">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-primary/40"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-white/70 mb-1">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-primary/40"
                    placeholder="How can I help you?"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="min-h-[150px] bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-primary/40"
                    placeholder="Tell me about your LinkedIn optimization needs..."
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </motion.div>
          
          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-white">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Email</p>
                    <a href="mailto:contact@profileenhancehub.com" className="text-white/70 hover:text-white transition-colors">
                      contact@profileenhancehub.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Phone</p>
                    <p className="text-white/70">+91 XXX XXX XXXX</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Location</p>
                    <p className="text-white/70">India</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-white">Connect With Me</h2>
              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/in/disha-giri-414a72314/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full flex items-center justify-center glass-card border border-white/10 text-white/70 hover:text-linkedin hover:border-linkedin transition-colors hover-scale"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://x.com/Dev_DishaGiri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full flex items-center justify-center glass-card border border-white/10 text-white/70 hover:text-white hover:border-white/30 transition-colors hover-scale"
                  aria-label="Twitter Profile"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://github.com/dishagiri23"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full flex items-center justify-center glass-card border border-white/10 text-white/70 hover:text-white hover:border-white/30 transition-colors hover-scale"
                  aria-label="GitHub Profile"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div className="glass-card rounded-xl p-6 mt-8">
              <h3 className="text-xl font-semibold mb-4 text-white">Why Work With Me?</h3>
              <ul className="space-y-3">
                <li className="flex items-start text-white/70">
                  <span className="text-primary mr-2">•</span>
                  <span>Specialized in LinkedIn profile optimization for tech professionals</span>
                </li>
                <li className="flex items-start text-white/70">
                  <span className="text-primary mr-2">•</span>
                  <span>Proven track record of helping clients land interviews</span>
                </li>
                <li className="flex items-start text-white/70">
                  <span className="text-primary mr-2">•</span>
                  <span>Customized approach for each client's unique career goals</span>
                </li>
                <li className="flex items-start text-white/70">
                  <span className="text-primary mr-2">•</span>
                  <span>Continual support and updates as your career evolves</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
