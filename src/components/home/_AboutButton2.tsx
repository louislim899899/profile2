import React, { useRef, useEffect, MouseEvent } from 'react';
import gsap from 'gsap';

const MagneticButton: React.FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const button = buttonRef.current;
    const container = containerRef.current;

    if (!button || !container) return;

    const boundingRect = button.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;

    const x = mouseX - boundingRect.left - boundingRect.width / 2;
    const y = mouseY - boundingRect.top - boundingRect.height / 2;

    gsap.to(button, {
      x: x * 0.3,
      y: y * 0.3,
      ease: 'power2.out',
      duration: 0.3,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      ease: 'power2.out',
      duration: 0.3,
    });
  };

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);


  return (
    <div ref={containerRef} className="magnetic-container absolute right-0">
      <button ref={buttonRef} className="magnetic-button">
        Hover Me
      </button>
    </div>
  );
};

export default MagneticButton;