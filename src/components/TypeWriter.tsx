
import React, { useState, useEffect } from 'react';

interface TypeWriterProps {
  strings: string[];
  delay?: number; // Delay between strings in ms
  typingSpeed?: number; // Typing speed in ms
}

const TypeWriter: React.FC<TypeWriterProps> = ({ 
  strings,
  delay = 2000,
  typingSpeed = 100
}) => {
  const [currentStringIndex, setCurrentStringIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    // Function to handle the typing effect
    const handleTyping = () => {
      // Current string being typed/deleted
      const currentString = strings[currentStringIndex];
      
      if (!isDeleting) {
        // Typing mode
        setCurrentText(currentString.substring(0, currentText.length + 1));
        
        // If we've typed the full string, start deleting after a delay
        if (currentText.length === currentString.length) {
          timeout = setTimeout(() => {
            setIsDeleting(true);
          }, delay);
          return;
        }
      } else {
        // Deleting mode
        setCurrentText(currentString.substring(0, currentText.length - 1));
        
        // If we've deleted everything, move to the next string
        if (currentText.length === 0) {
          setIsDeleting(false);
          setCurrentStringIndex((currentStringIndex + 1) % strings.length);
          return;
        }
      }
      
      // Schedule the next update based on typing or deleting speed
      const speed = isDeleting ? typingSpeed / 2 : typingSpeed;
      timeout = setTimeout(handleTyping, speed);
    };
    
    // Start the typing effect
    timeout = setTimeout(handleTyping, typingSpeed);
    
    return () => {
      clearTimeout(timeout);
    };
  }, [currentText, currentStringIndex, isDeleting, strings, delay, typingSpeed]);
  
  return (
    <span>
      {currentText}
      <span className="typed-cursor">|</span>
    </span>
  );
};

export default TypeWriter;
