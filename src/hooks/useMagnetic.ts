import { useRef, useEffect } from "react";
import { gsap, Elastic } from "gsap";

const useMagnetic = ({
    movement = 50, // Default movement strength
    duration = 0.3, // Animation duration
    easing = Elastic.easeOut.config(2, 0.3) // Default easing
  } = {}) => {
    const elementRef = useRef(null);
  
    useEffect(() => {
      const element = elementRef.current;
  
      if (!element) return;
  
      const handleMouseMove = (e) => {
        const boundingRect = element.getBoundingClientRect();
        const relX = e.clientX - boundingRect.left;
        const relY = e.clientY - boundingRect.top;
  
        gsap.to(element, {
          duration,
          x: ((relX - boundingRect.width / 2) / boundingRect.width) * movement,
          y: ((relY - boundingRect.height / 2) / boundingRect.height) * movement,
        });
      };
  
      const handleMouseLeave = () => {
        gsap.to(element, {
          duration: 2,
          x: 0,
          y: 0,
          scale: 1,
          ease: easing,
        });
      };
  
      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseLeave);
  
      return () => {
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, [movement, duration, easing]);
  
    return elementRef;
  };
  
  export default useMagnetic;