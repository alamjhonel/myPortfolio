import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface FlipCardProps {
  title: string;
  description: string; // back to string
  imageUrl: string;
  technologies: string[];
  linkUrl?: string;
}

const FlipCard: React.FC<FlipCardProps> = ({
  title,
  description,
  imageUrl,
  technologies,
  linkUrl
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleCardClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div 
      className={`project-card border border-cyber-light hover:border-cyber-highlight transition-all duration-500 rounded-lg shadow-lg hover:shadow-[0_0_15px_rgba(100,255,218,0.5)] cursor-pointer ${expanded ? 'scale-105' : ''}`}
      onClick={handleCardClick}
    >
      <div className="flex flex-col h-full">
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 text-cyber-highlight">{title}</h3>
          
          <div className="mb-4">
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-40 object-cover mb-4 rounded transition-transform duration-300 hover:scale-105"
            />
          </div>

          {!expanded ? (
            <p className="text-sm mb-4 line-clamp-3 text-justify">{description}</p>
          ) : (
            <div className="animate-fade-in">
              <p className="text-sm mb-4 text-justify">{description}</p>
              
              <div className="mb-4">
                <h4 className="font-bold text-sm mb-2">Technologies:</h4>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, index) => (
                    <HoverCard key={index}>
                      <HoverCardTrigger>
                        <span 
                          className="text-xs bg-cyber-light px-2 py-1 rounded-full text-cyber-highlight hover:bg-cyber-dark transition-colors duration-300"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {tech}
                        </span>
                      </HoverCardTrigger>
                      <HoverCardContent className="bg-cyber-dark border border-cyber-highlight">
                        Technology: {tech}
                      </HoverCardContent>
                    </HoverCard>
                  ))}
                </div>
              </div>
              
              {linkUrl && (
                <Button 
                  className="bg-cyber-highlight text-cyber-dark hover:bg-opacity-80 transition-all duration-300 mt-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(linkUrl, '_blank');
                  }}
                >
                  View Project
                </Button>
              )}
            </div>
          )}
          
          {!expanded && (
            <div className="text-cyber-highlight text-xs mt-2">
              Click to see more
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
