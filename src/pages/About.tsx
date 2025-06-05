import React, { useEffect, useState } from 'react';
import NavigationBar from '@/components/NavigationBar';
import MatrixBackground from '@/utils/matrixBackground';
import BackButton from '@/components/BackButton';
import { Shield, Award, BookOpen, Code } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const About: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [zoomedCard, setZoomedCard] = useState<string | null>(null);

  useEffect(() => {
    // Animate elements after they've loaded
    setTimeout(() => {
      setLoaded(true);
    }, 100);
  }, []);
  
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const toggleZoom = (card: string) => {
    if (zoomedCard === card) {
      setZoomedCard(null);
    } else {
      setZoomedCard(card);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <MatrixBackground />
      <NavigationBar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <BackButton to="/" />
          </div>
          
          <div className={`transform transition-all duration-1000 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-cyber-highlight flex items-center hover:text-white transition-all duration-300">
              <Shield className="mr-3 h-8 w-8" />
              About Me
            </h1>
            
            {/* Professional Profile */}
            <div 
              className={`bg-cyber-dark border-2 cursor-pointer rounded-lg p-6 mb-8 shadow-lg transition-all duration-300 
                ${expandedSection === 'profile' 
                  ? 'border-cyber-highlight shadow-[0_0_15px_rgba(100,255,218,0.5)] scale-[1.02]' 
                  : 'border-cyber-light hover:border-cyber-highlight hover:shadow-[0_0_15px_rgba(100,255,218,0.3)]'}`}
              onClick={() => toggleSection('profile')}
            >
              <h2 className="text-xl font-bold mb-4 text-cyber-highlight">Professional Profile</h2>
              
              {expandedSection === 'profile' ? (
                <div className="animate-fade-in">
                  <p className="text-justify">Dedicated IT Support Specialist and Cybersecurity Professional with a solid foundation in network security, system administration, and technical troubleshooting. Skilled in identifying and mitigating security vulnerabilities, managing IT infrastructure, and ensuring system integrity and uptime. Proven ability to implement cybersecurity best practices, conduct risk assessments, and support secure, efficient IT operations. Committed to advancing digital protection strategies and staying updated with emerging threats and technologies in the cybersecurity landscape.</p>
                  <div className="text-cyber-highlight text-xs mt-4">
                    Click to collapse
                  </div>
                </div>
              ) : (
                <div>
                  <p className="mb-4 line-clamp-2">
                    Dedicated IT Support Specialist and Cybersecurity Professional with a solid foundation in network security, system administration, and technical troubleshooting. Skilled in identifying and mitigating security vulnerabilities, managing IT infrastructure, and ensuring system integrity and uptime. Proven ability to implement cybersecurity best practices, conduct risk assessments, and support secure, efficient IT operations. Committed to advancing digital protection strategies and staying updated with emerging threats and technologies in the cybersecurity landscape.
                  </p>
                  <div className="text-cyber-highlight text-xs mt-2">
                    Click to see more
                  </div>
                </div>
              )}
            </div>
            
            {/* Skills and Education Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Certifications */}
              <div 
                className={`bg-cyber-dark border-2 cursor-pointer rounded-lg p-6 shadow-lg transition-all duration-500
                  ${zoomedCard === 'certifications' 
                    ? 'border-cyber-highlight shadow-[0_0_20px_rgba(100,255,218,0.7)] scale-[1.15] z-20' 
                    : 'border-cyber-light hover:border-cyber-highlight hover:shadow-[0_0_15px_rgba(100,255,218,0.3)] hover:-translate-y-1'}`}
                onClick={() => toggleZoom('certifications')}
              >
                <div className="flex items-center mb-4">
                  <Award className="h-6 w-6 text-cyber-highlight mr-2" />
                  <h2 className="text-lg font-bold text-cyber-highlight">Certifications</h2>
                </div>
                
                <Collapsible open={zoomedCard === 'certifications'} className="w-full">
                  <CollapsibleTrigger className="w-full text-left">
                    <ul className="space-y-2">
                      <li className="flex items-center hover:text-cyber-highlight transition-colors duration-300">
                        <span className="mr-2 text-cyber-highlight">•</span>
                        <span>CISCO - Cybersecurity</span>
                      </li>
                      <li className="flex items-center hover:text-cyber-highlight transition-colors duration-300">
                        <span className="mr-2 text-cyber-highlight">•</span>
                        <span>NC II - Computer System Servicing</span>
                      </li>
                    </ul>
                    {zoomedCard !== 'certifications' && (
                      <div className="text-cyber-highlight text-xs mt-2">
                        Click to see more
                      </div>
                    )}
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent className="animate-fade-in">
                    <ul className="space-y-2 mt-2">
                      <li className="flex items-center hover:text-cyber-highlight transition-colors duration-300">
                        <span className="mr-2 text-cyber-highlight">•</span>
                        <span>Critical Infrastructure Protection</span>
                      </li>
                      <li className="flex items-center hover:text-cyber-highlight transition-colors duration-300">
                        <span className="mr-2 text-cyber-highlight">•</span>
                        <span>Data Protection and Security</span>
                      </li>
                    </ul>
                    <div className="text-cyber-highlight text-xs mt-3">
                      Click to collapse
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
              
              {/* Technical Skills */}
              <div 
                className={`bg-cyber-dark border-2 cursor-pointer rounded-lg p-6 shadow-lg transition-all duration-500
                  ${zoomedCard === 'skills' 
                    ? 'border-cyber-highlight shadow-[0_0_20px_rgba(100,255,218,0.7)] scale-[1.15] z-20' 
                    : 'border-cyber-light hover:border-cyber-highlight hover:shadow-[0_0_15px_rgba(100,255,218,0.3)] hover:-translate-y-1'}`}
                onClick={() => toggleZoom('skills')}
              >
                <div className="flex items-center mb-4">
                  <Code className="h-6 w-6 text-cyber-highlight mr-2" />
                  <h2 className="text-lg font-bold text-cyber-highlight">Technical Skills</h2>
                </div>
                
                <Collapsible open={zoomedCard === 'skills'} className="w-full">
                  <CollapsibleTrigger className="w-full text-left">
                    <ul className="space-y-2">
                      <li className="flex items-center hover:text-cyber-highlight transition-colors duration-300">
                        <span className="mr-2 text-cyber-highlight">•</span>
                        <span>Threat Analysis</span>
                      </li>
                      <li className="flex items-center hover:text-cyber-highlight transition-colors duration-300">
                        <span className="mr-2 text-cyber-highlight">•</span>
                        <span>Malware Analysis</span>
                      </li>
                    </ul>
                    {zoomedCard !== 'skills' && (
                      <div className="text-cyber-highlight text-xs mt-2">
                        Click to see more
                      </div>
                    )}
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent className="animate-fade-in">
                    <ul className="space-y-2 mt-2">
                      <li className="flex items-center hover:text-cyber-highlight transition-colors duration-300">
                        <span className="mr-2 text-cyber-highlight">•</span>
                        <span>Incident Response</span>
                      </li>
                      <li className="flex items-center hover:text-cyber-highlight transition-colors duration-300">
                        <span className="mr-2 text-cyber-highlight">•</span>
                        <span>Cloud Security</span>
                      </li>
                    </ul>
                    <div className="text-cyber-highlight text-xs mt-3">
                      Click to collapse
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
              
              {/* Education */}
              <div 
                className={`bg-cyber-dark border-2 cursor-pointer rounded-lg p-6 shadow-lg transition-all duration-500
                  ${zoomedCard === 'education' 
                    ? 'border-cyber-highlight shadow-[0_0_20px_rgba(100,255,218,0.7)] scale-[1.15] z-20' 
                    : 'border-cyber-light hover:border-cyber-highlight hover:shadow-[0_0_15px_rgba(100,255,218,0.3)] hover:-translate-y-1'}`}
                onClick={() => toggleZoom('education')}
              >
                <div className="flex items-center mb-4">
                  <BookOpen className="h-6 w-6 text-cyber-highlight mr-2" />
                  <h2 className="text-lg font-bold text-cyber-highlight">Education</h2>
                </div>
                
                <Collapsible open={zoomedCard === 'education'} className="w-full">
                  <CollapsibleTrigger className="w-full text-left">
                    <ul className="space-y-2">
                      <li className="flex items-center hover:text-cyber-highlight transition-colors duration-300">
                        <span className="mr-2 text-cyber-highlight">•</span>
                        <span>B.S. Computer Science</span>
                      </li>
                      <li className="flex items-center hover:text-cyber-highlight transition-colors duration-300">
                        <span className="mr-2 text-cyber-highlight">•</span>
                        <span>Information Communication Technology</span>
                      </li>
                    </ul>
                    {zoomedCard !== 'education' && (
                      <div className="text-cyber-highlight text-xs mt-2">
                        Click to see more
                      </div>
                    )}
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent className="animate-fade-in">
                    <ul className="space-y-2 mt-2">
                      <li className="flex items-center hover:text-cyber-highlight transition-colors duration-300">
                        <span className="mr-2 text-cyber-highlight">•</span>
                        <span>Google Cloud Digital Leader</span>
                      </li>
                      <li className="flex items-center hover:text-cyber-highlight transition-colors duration-300">
                        <span className="mr-2 text-cyber-highlight">•</span>
                        <span>Cryptography & Cybersecurity</span>
                      </li>
                    </ul>
                    <div className="text-cyber-highlight text-xs mt-3">
                      Click to collapse
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>
            
            {/* Professional Experience */}
            <div 
              className={`bg-cyber-dark border-2 cursor-pointer rounded-lg p-6 shadow-lg transition-all duration-300
                ${expandedSection === 'experience' 
                  ? 'border-cyber-highlight shadow-[0_0_15px_rgba(100,255,218,0.5)] scale-[1.02]' 
                  : 'border-cyber-light hover:border-cyber-highlight hover:shadow-[0_0_15px_rgba(100,255,218,0.3)]'}`}
              onClick={() => toggleSection('experience')}
            >
              <h2 className="text-xl font-bold mb-4 text-cyber-highlight">Professional Experience</h2>
              
              {expandedSection === 'experience' ? (
                <div className="animate-fade-in">
                  <div className="space-y-6">
                    <div className="hover:bg-cyber-light/10 p-3 rounded-lg transition-colors duration-300">
                      <h3 className="text-lg font-semibold hover:text-cyber-highlight transition-colors duration-300">HR & IT Support Intern</h3>
                      <p className="text-cyber-text text-sm mb-2">2025 - Present</p>
                      <p className="text-justify">Assisted in employee onboarding and offboarding by coordinating IT account setups and access permissions, supported HR in maintaining accurate employee records, and provided first-level technical support by troubleshooting hardware, software, and connectivity issues, ensuring smooth cross-departmental operations and data security compliance.</p>
                    </div>
                    
                    <div className="hover:bg-cyber-light/10 p-3 rounded-lg transition-colors duration-300">
                      <h3 className="text-lg font-semibold hover:text-cyber-highlight transition-colors duration-300">Technical Support Associate (Chat)</h3>
                      <p className="text-cyber-text text-sm mb-2">2022</p>
                      <p className="text-justify">Provided real-time technical assistance to customers via chat, troubleshooting software and hardware issues, resolving account and connectivity problems, and ensuring high customer satisfaction through clear and effective communication.</p>
                    </div>
                  </div>
                  <div className="text-cyber-highlight text-xs mt-4">
                    Click to collapse
                  </div>
                </div>
              ) : (
                <div>
                  <div className="space-y-6">
                    <div className="hover:bg-cyber-light/10 p-3 rounded-lg transition-colors duration-300">
                      <h3 className="text-lg font-semibold hover:text-cyber-highlight transition-colors duration-300">HR & IT Support Intern</h3>
                      <p className="text-cyber-text text-sm mb-2">2025 - Present</p>
                      <p className="text-justify">Assisted in employee onboarding and offboarding by coordinating IT account setups and access permissions, supported HR in maintaining accurate employee records, and provided first-level technical support by troubleshooting hardware, software, and connectivity issues, ensuring smooth cross-departmental operations and data security compliance.</p>
                    </div>
                  </div>
                  <div className="text-cyber-highlight text-xs mt-2">
                    Click to see more
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
