import React, { useRef, useEffect } from "react";
import { gsap, Elastic } from "gsap";
// import "./styles.scss";

interface MagneticProps {
  name: string,
  url: string,
}

const MagneticButton = ({name, url}: MagneticProps) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;

    function handleMouseLeave() {
      gsap.to(".button-circle, .button-text", {
        duration: 2,
        scale: 1,
        x: 0,
        y: 0,
        ease: Elastic.easeOut.config(2, 0.3)
      });
    }

    function handleMouseMove(e) {
      parallaxIt(e, ".button-circle", 75);
      parallaxIt(e, ".button-text", 50);
    }

    function parallaxIt(e, target, movement) {
      const boundingRect = wrapper.getBoundingClientRect();
      const relX = e.clientX - boundingRect.left;
      const relY = e.clientY - boundingRect.top;

      gsap.to(target, {
        duration: 0.3,
        x: ((relX - boundingRect.width / 2) / boundingRect.width) * movement,
        y: ((relY - boundingRect.height / 2) / boundingRect.width) * movement
      });
    }

    wrapper.addEventListener("mouseleave", handleMouseLeave);
    wrapper.addEventListener("mousemove", handleMouseMove);

    return () => {
      wrapper.removeEventListener("mouseleave", handleMouseLeave);
      wrapper.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="button-circle right-10" ref={wrapperRef}>
      <span className="button-text">{name}</span>
    </div>
  );
};

export default MagneticButton;
