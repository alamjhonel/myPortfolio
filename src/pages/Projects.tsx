import React from 'react';
import NavigationBar from '@/components/NavigationBar';
import MatrixBackground from '@/utils/matrixBackground';
import FlipCard from '@/components/FlipCard';
import BackButton from '@/components/BackButton';

const Projects: React.FC = () => {
  // Project data with images
  const projects = [
    {
      title: "Cyber Security Portfolio Website",
      description: "A personal portfolio website designed to showcase my skills, projects, and experience in cyber security and IT. Includes a downloadable CV, interactive UI, and real-time visitor analytics.",
      imageUrl: "/images/portfolio.png",
      technologies: ["React", "Vite", "Shadcn-ui", "TypeScript", "TailwindCSS", "Node.js"],
      linkUrl: "https://jhonel-portfolio.vercel.app/"
    },
    {
      title: "Code Assessment using Rubric-based Fuzzy Logic",
      description: "A web application that automates code assessment for students using a rubric-based fuzzy logic system, providing fair and consistent grading based on multiple criteria.",
      imageUrl: "/images/codeassess.png",
      technologies: ["React", "Node.js", "TailwindCSS", "Fuzzy Logic"],
      linkUrl: "https://github.com/alamjhonel/CodeAssess.git"
    },
    {
      title: "Boarding House Rental Management System",
      description: "A management system for boarding house owners and tenants, streamlining room rentals, payments, and tenant records with an easy-to-use dashboard.",
      imageUrl: "/images/rental.jpg",
      technologies: ["PHP", "Laravel", "Bootstrap"],
      linkUrl: "https://github.com/jhonelalam/BHRMS.git"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <MatrixBackground />
      <NavigationBar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <BackButton to="/" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-cyber-highlight hover:text-white transition-colors duration-300">Projects</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {projects.map((project, index) => (
              <FlipCard
                key={index}
                title={project.title}
                description={project.description}
                imageUrl={project.imageUrl}
                technologies={project.technologies}
                linkUrl={project.linkUrl}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Projects;
