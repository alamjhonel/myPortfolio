
import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import MatrixBackground from "@/utils/matrixBackground";
import BackButton from "@/components/BackButton";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen relative">
      <MatrixBackground />
      
      <div className="min-h-screen flex items-center justify-center bg-cyber-dark bg-opacity-70 px-4">
        <div className="text-center w-full max-w-md mx-auto p-4">
          <BackButton to="/" className="absolute top-4 left-4" />
          
          <h1 className="text-5xl sm:text-6xl font-bold mb-2 sm:mb-4 text-cyber-highlight">404</h1>
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Access Denied</h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-cyber-text">
            The resource you're looking for doesn't exist or you don't have permission to view it.
          </p>
          <div className="space-y-4">
            <p className="text-xs sm:text-sm text-cyber-text border border-cyber-light/30 p-3 sm:p-4 bg-cyber-light/10 rounded-md font-mono break-all">
              Error: Cannot access <span className="text-cyber-highlight">{location.pathname}</span>
            </p>
            <Link to="/">
              <Button className="bg-cyber-highlight text-cyber-dark hover:bg-opacity-80 text-sm sm:text-base py-2 px-4 w-full sm:w-auto">
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
