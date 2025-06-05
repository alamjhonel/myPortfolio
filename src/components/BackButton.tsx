
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  to?: string;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ to, className = '' }) => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <Button 
      onClick={handleBack}
      variant="ghost" 
      size="sm"
      className={`mb-4 text-cyber-text hover:text-cyber-highlight hover:bg-cyber-light/20 ${className}`}
    >
      <ArrowLeft className="mr-2 h-4 w-4" /> Back
    </Button>
  );
};

export default BackButton;
