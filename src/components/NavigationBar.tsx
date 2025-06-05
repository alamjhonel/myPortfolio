
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { isLoggedIn, logout } from '@/utils/auth';
import { useToast } from "@/components/ui/use-toast";

const NavigationBar: React.FC = () => {
  const { toast } = useToast();
  const adminLoggedIn = isLoggedIn();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    window.location.href = '/'; // Redirect to home
  };

  return (
    <nav className="bg-cyber-dark border-b border-cyber-light py-4 px-6 sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center justify-between w-full md:w-auto mb-4 md:mb-0">
          <Link to="/" className="flex items-center group">
            <Shield className="h-6 w-6 mr-2 text-cyber-highlight hover:scale-125 transition-transform duration-300 group-hover:animate-pulse" />
            <span className="text-xl font-bold text-cyber-highlight hover:text-white transition-colors duration-300">CyberSec</span>
          </Link>
          
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-cyber-text hover:text-cyber-highlight"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        
        <div className={`${mobileMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row w-full md:w-auto items-center gap-4`}>
          <Link to="/" className="nav-item px-3 py-2 text-cyber-text hover:text-cyber-highlight transition-colors duration-300 w-full md:w-auto text-center">
            Home
          </Link>
          <Link to="/about" className="nav-item px-3 py-2 text-cyber-text hover:text-cyber-highlight transition-colors duration-300 w-full md:w-auto text-center">
            About
          </Link>
          <Link to="/projects" className="nav-item px-3 py-2 text-cyber-text hover:text-cyber-highlight transition-colors duration-300 w-full md:w-auto text-center">
            Projects
          </Link>
          
          {adminLoggedIn ? (
            <>
              <Link to="/admin" className="nav-item px-3 py-2 text-cyber-highlight hover:text-white transition-colors duration-300 w-full md:w-auto text-center">
                Dashboard
              </Link>
              <Button 
                variant="ghost" 
                className="text-cyber-text hover:text-cyber-highlight hover:bg-cyber-light transition-all duration-300 w-full md:w-auto"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <Link to="/admin" className="group relative px-3 py-2 text-cyber-text hover:text-cyber-highlight transition-colors duration-300 w-full md:w-auto flex justify-center">
              <Shield className="h-5 w-5 group-hover:scale-125 transition-all duration-300 animate-pulse" />
              <span className="sr-only">Admin</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
