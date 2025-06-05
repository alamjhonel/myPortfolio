
import React, { useEffect, useRef } from 'react';

interface MatrixBackgroundProps {
  animationState?: 'default' | 'glitch-effect' | 'pulse-effect' | 'color-shift';
}

const MatrixBackground: React.FC<MatrixBackgroundProps> = ({ animationState = 'default' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear existing columns when animation state changes
    container.innerHTML = '';

    // Create matrix columns
    const createMatrixRain = () => {
      const width = window.innerWidth;
      const count = Math.floor(width / 20); // Adjust density based on screen size
      
      for (let i = 0; i < count; i++) {
        const column = document.createElement('div');
        column.className = `matrix-column ${animationState !== 'default' ? animationState : ''}`;
        column.style.left = `${i * 20}px`;
        
        // Random animation duration between 1.5 and 3 seconds
        const duration = 1.5 + Math.random() * 1.5;
        column.style.animationDuration = `${duration}s`;
        
        // Random animation delay
        column.style.animationDelay = `${Math.random() * 2}s`;

        // Adjust content based on animation state
        let content = '';
        const length = Math.floor(Math.random() * 20) + 10;
        
        for (let j = 0; j < length; j++) {
          // Use different character sets based on animation state
          if (animationState === 'glitch-effect') {
            // More special characters for glitch effect
            content += String.fromCharCode(Math.floor(Math.random() * 30) + 33);
          } else {
            // Standard matrix characters
            const char = Math.random() > 0.8 
              ? String.fromCharCode(Math.floor(Math.random() * 26) + 65) 
              : Math.floor(Math.random() * 10);
            content += char;
          }
        }
        
        column.textContent = content;
        container.appendChild(column);
      }

      // Add additional visual effects based on animation state
      if (animationState === 'glitch-effect') {
        addGlitchEffects(container);
      } else if (animationState === 'pulse-effect') {
        addPulseEffects(container);
      } else if (animationState === 'color-shift') {
        addColorShiftEffects(container);
      }
    };

    const addGlitchEffects = (container: HTMLDivElement) => {
      const glitchCount = Math.floor(Math.random() * 3) + 1;
      
      for (let i = 0; i < glitchCount; i++) {
        setTimeout(() => {
          container.classList.add('glitch-distortion');
          setTimeout(() => {
            container.classList.remove('glitch-distortion');
          }, 200);
        }, i * 1000);
      }
    };

    const addPulseEffects = (container: HTMLDivElement) => {
      // Add pulsing elements
      for (let i = 0; i < 3; i++) {
        const pulse = document.createElement('div');
        pulse.className = 'pulse-circle';
        pulse.style.left = `${Math.random() * 100}%`;
        pulse.style.top = `${Math.random() * 100}%`;
        pulse.style.animationDelay = `${i * 0.5}s`;
        container.appendChild(pulse);
      }
    };
    
    const addColorShiftEffects = (container: HTMLDivElement) => {
      // Add color-shifting overlay
      const overlay = document.createElement('div');
      overlay.className = 'color-shift-overlay';
      container.appendChild(overlay);
    };

    createMatrixRain();

    // Resize handler
    const handleResize = () => {
      if (container) {
        container.innerHTML = '';
        createMatrixRain();
      }
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [animationState]);

  return (
    <div 
      ref={containerRef} 
      className={`matrix-bg ${animationState}`} 
      aria-hidden="true"
    ></div>
  );
};

export default MatrixBackground;
