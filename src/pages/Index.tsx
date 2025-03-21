
import { Link } from 'react-router-dom';
import { Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-start max-w-3xl mx-auto pl-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              ProfileEnhanceHub
            </h1>
            
            <p className="text-xl text-white/80 mb-8 max-w-2xl">
              Helping professionals optimize their LinkedIn profiles to stand out
              to recruiters and advance their careers.
            </p>
            
            <div className="flex items-center mb-8">
              <Mail className="h-5 w-5 text-primary mr-2" />
              <a href="mailto:dishagiri0917@gmail.com" className="text-white/90 hover:text-primary transition-colors">
                dishagiri0917@gmail.com
              </a>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/services">
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  Our Services
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-white/20 hover:bg-white/5">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-black/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose ProfileEnhanceHub?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass-card p-6 rounded-lg">
              <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Linkedin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI-Powered Optimization</h3>
              <p className="text-white/70">
                Our advanced algorithms analyze your profile and suggest targeted improvements.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="glass-card p-6 rounded-lg">
              <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Linkedin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Industry Insights</h3>
              <p className="text-white/70">
                Get recommendations tailored to your specific industry and career goals.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="glass-card p-6 rounded-lg">
              <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Linkedin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Profile Analytics</h3>
              <p className="text-white/70">
                Track your profile's performance and visibility with detailed analytics.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
