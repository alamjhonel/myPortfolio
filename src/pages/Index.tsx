import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import NavigationBar from '@/components/NavigationBar';
import MatrixBackground from '@/utils/matrixBackground';
import { Shield, ShieldAlert, ShieldCheck, Download } from 'lucide-react';
import { getVisitorLocation, saveVisitor, LocationData } from '@/utils/ipLocator';
import { detectDevice } from '@/utils/deviceDetector';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from "@/components/ui/use-toast";
import TypeWriter from '@/components/TypeWriter';

const Index: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [animationState, setAnimationState] = useState<"default" | "glitch-effect" | "pulse-effect" | "color-shift">('default');
  const [logoIndex, setLogoIndex] = useState(0);
  const { toast } = useToast();
  
  const logoComponents = [
    <Shield key="shield" className="h-14 sm:h-16 md:h-20 w-14 sm:w-16 md:w-20 text-cyber-highlight" />,
    <ShieldAlert key="shield-alert" className="h-14 sm:h-16 md:h-20 w-14 sm:w-16 md:w-20 text-cyber-highlight" />,
    <ShieldCheck key="shield-check" className="h-14 sm:h-16 md:h-20 w-14 sm:w-16 md:w-20 text-cyber-highlight" />
  ];

  useEffect(() => {
    // Log visitor when they access the site
    const logVisitor = async () => {
      try {
        const location: LocationData = await getVisitorLocation();
        const deviceInfo = detectDevice();
        
        saveVisitor({
          id: uuidv4(),
          timestamp: Date.now(),
          isBlocked: false,
          ip: location.ip,
          city: location.city,
          country: location.country,
          latitude: location.latitude,
          longitude: location.longitude,
          operatingSystem: deviceInfo.operatingSystem,
          browser: deviceInfo.browser,
          device: deviceInfo.device,
          deviceType: deviceInfo.deviceType
        });
      } catch (error) {
        console.error("Failed to log visitor:", error);
      }
    };

    logVisitor();
    
    // Animate elements after they've loaded
    setTimeout(() => {
      setLoaded(true);
    }, 100);

    // Cycle through different matrix animation states
    const animationInterval = setInterval(() => {
      setAnimationState(prev => {
        const states: Array<"default" | "glitch-effect" | "pulse-effect" | "color-shift"> = ['glitch-effect', 'pulse-effect', 'color-shift', 'default'];
        const currentIndex = states.indexOf(prev);
        return states[(currentIndex + 1) % states.length];
      });
    }, 10000);
    
    // Cycle through different logo variations
    const logoInterval = setInterval(() => {
      setLogoIndex(prevIndex => (prevIndex + 1) % logoComponents.length);
    }, 3000);

    return () => {
      clearInterval(animationInterval);
      clearInterval(logoInterval);
    };
  }, []);

  const handleDownloadCV = () => {
    // Show toast notification
    toast({
      title: "CV Download",
      description: "Your CV download has started",
    });

    // Trigger file download
    const link = document.createElement('a');
    link.href = 'public\\images\\Alam_Jhonel_CV.pdf'; // Path relative to the public directory
    link.download = 'Alam_Jhonel_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show completion toast after a delay
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: "Thank you for your interest in my profile!",
      });
    }, 2000);
  };

  const roles = [
    'Cyber Security Enthusiast',
    'Network Engineer Enthusiast',
    'IT Specialist',
    'Security Analyst',
    'IT Support Specialist'
  ];


  return (
    <div className="min-h-screen flex flex-col">
      <MatrixBackground animationState={animationState} />
      <div className="scanline"></div>
      <NavigationBar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="min-h-[calc(100vh-150px)] flex items-center justify-center relative">
          <div className="max-w-3xl w-full text-center px-4 relative z-10">
            <div className={`mb-6 sm:mb-8 transform transition-all duration-1000 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="relative inline-block">
                <div className="mx-auto mb-2 sm:mb-4 hover:scale-110 transition-transform duration-300">
                  {loaded && logoComponents[logoIndex]}
                </div>
              </div>
            </div>
            
            <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white transform transition-all duration-1000 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <TypeWriter strings={roles} delay={2000} />
            </h1>
            
            <p className={`text-sm sm:text-md md:text-lg lg:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto transform transition-all duration-1000 delay-300 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} text-justify text-cyber-text`}>
              Dedicated IT Support Specialist and Cybersecurity Professional with hands-on experience in network security, system administration, and technical troubleshooting. Skilled in managing IT infrastructure, identifying and mitigating security vulnerabilities, and ensuring reliable, secure operations for organizations.
            </p>
            
            <div className={`flex flex-wrap justify-center gap-3 sm:gap-4 transform transition-all duration-1000 delay-500 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <Link to="/projects" className="w-full sm:w-auto mb-2 sm:mb-0">
                <Button className="bg-cyber-highlight text-cyber-dark hover:bg-opacity-80 transition-all duration-300 hover:shadow-[0_0_10px_rgba(100,255,218,0.5)] hover:scale-105 w-full sm:w-auto text-sm sm:text-base">
                  View My Projects
                </Button>
              </Link>
              <Link to="/about" className="w-full sm:w-auto mb-2 sm:mb-0">
                <Button variant="outline" className="border-cyber-highlight text-cyber-highlight hover:bg-cyber-light transition-all duration-300 hover:shadow-[0_0_10px_rgba(100,255,218,0.5)] hover:scale-105 w-full sm:w-auto text-sm sm:text-base">
                  Learn About Me
                </Button>
              </Link>
              <Button 
                onClick={handleDownloadCV} 
                className="bg-cyber-light text-cyber-highlight hover:bg-opacity-80 flex items-center transition-all duration-300 hover:shadow-[0_0_10px_rgba(100,255,218,0.5)] hover:scale-105 w-full sm:w-auto text-sm sm:text-base"
              >
                <Download className="mr-2 h-4 w-4" /> Download CV
              </Button>
            </div>
          </div>

          {/* Decorative elements */}
          {loaded && (
            <>
              <div className="hidden md:block absolute top-1/4 left-10 w-20 h-20 border border-cyber-highlight/30 rounded-full animate-pulse"></div>
              <div className="hidden md:block absolute bottom-1/4 right-10 w-32 h-32 border border-cyber-highlight/20 rounded-full animate-pulse delay-1000"></div>
              <div className="hidden md:block absolute bottom-10 left-1/4 w-16 h-16 border border-cyber-highlight/10 rounded-full animate-pulse delay-700"></div>
            </>
          )}
          
          {/* Data streams */}
          {loaded && Array.from({ length: 5 }).map((_, index) => (
            <div key={index} 
                className="data-stream" 
                style={{ 
                  left: `${Math.random() * 100}%`, 
                  animationDuration: `${2 + Math.random() * 4}s`,
                  animationDelay: `${Math.random() * 2}s`
                }}>
            </div>
          ))}
        </section>
      </main>
      
      <footer className="bg-cyber-dark border-t border-cyber-light py-3 sm:py-4 px-4 sm:px-6 transition-all duration-300">
        <div className="container mx-auto text-center">
          <p className="text-xs sm:text-sm text-cyber-text">
            © {new Date().getFullYear()} Cyber Security Portfolio. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
