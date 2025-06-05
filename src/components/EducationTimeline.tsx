
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from 'lucide-react';

interface Education {
  degree: string;
  institution: string;
  period: string;
  description: string;
}

const educationData: Education[] = [
  {
    degree: "Master of Science in Cyber Security",
    institution: "University of Technology",
    period: "2019 - 2021",
    description: "Specialized in advanced network security, penetration testing, and security operations center management. Thesis on AI-based threat detection systems."
  },
  {
    degree: "Bachelor of Engineering in Computer Science",
    institution: "National Institute of Technology",
    period: "2015 - 2019",
    description: "Focused on computer networks, programming, and information security fundamentals. Graduated with honors and distinction."
  },
  {
    degree: "Certified Information Systems Security Professional (CISSP)",
    institution: "ISC²",
    period: "2022",
    description: "Industry-recognized certification validating expertise across various security domains including access control, cryptography, and security architecture."
  },
  {
    degree: "Certified Ethical Hacker (CEH)",
    institution: "EC-Council",
    period: "2020",
    description: "Comprehensive certification in ethical hacking methodologies, tools, and techniques for identifying and addressing security vulnerabilities."
  }
];

const EducationTimeline: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto my-12">
      <h2 className="text-3xl font-bold mb-8 text-center text-cyber-highlight">Education & Certifications</h2>
      
      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-cyber-light"></div>
        
        {/* Timeline items */}
        {educationData.map((item, index) => (
          <div 
            key={index} 
            className={`relative z-10 mb-12 flex flex-col items-start md:items-center md:flex-row ${
              index % 2 === 0 ? 'md:flex-row-reverse' : ''
            }`}
          >
            {/* Timeline marker */}
            <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-cyber-highlight border-4 border-cyber-dark"></div>
            
            {/* Timeline content */}
            <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
              <Card className="bg-cyber-light border-cyber-highlight transition-all duration-300 hover:shadow-[0_0_15px_rgba(100,255,218,0.3)] transform hover:-translate-y-1">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center mb-1">
                    <CardTitle className="text-cyber-highlight text-xl">{item.degree}</CardTitle>
                  </div>
                  <div className="text-cyber-text font-semibold">{item.institution}</div>
                  <div className="flex items-center text-cyber-text/70 text-sm">
                    <Clock className="h-3 w-3 mr-1" />
                    {item.period}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-cyber-text">{item.description}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationTimeline;
