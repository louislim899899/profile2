import React, { useRef } from 'react'
import AboutStyle from '@/assets/styles/components/_about.module.scss'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagneticButton from './_MagneticButton'

// import HeroStyle from '../../assets/styles/components/_about.module.scss'
// import img from "@/assets/images/man-123.png"

export default function About() {


  // const container = useRef(null);
  // useGSAP(() => {
  //   gsap.from("h3 span", {
  //     duration: 1,
  //     // opacity: 0,
  //     yPercent: -58,
  //     height: 0,
  //     ease: 'back.out',
  //     scrollTrigger: {
  //       trigger: "h3",
  //       start: "top 80%",
  //       markers: true,
  //     }
  //   });
  // }, {dependencies: [], scope: container})

  const container = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    gsap.fromTo("h3 span", {
      y: 50,
      opacity: 0,
      // stagger: 1,
      clipPath: "inset(0 0 100% 0)",
    }, {
      y: 0,
      opacity: 1,
      clipPath: "inset(0 0 0% 0)",
      duration: 0.8,
      stagger: 0.05,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "h3 span",
        start: "top 80%",
        // end: "top 20%",
        toggleActions: "play reverse play reverse",
        // markers: true,
      },
    });
  }, {dependencies: [], scope: container,})

  useGSAP(() => {
    gsap.fromTo("#about p", {
      y: 50,
      opacity: 0,
      // stagger: 1,
      clipPath: "inset(0 0 100% 0)",
    }, {
      y: 0,
      opacity: 1,
      clipPath: "inset(0 0 0% 0)",
      duration: 0.8,
      stagger: 0.05,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#about p",
        start: "top 80%",
        // end: "top 20%",
        toggleActions: "play reverse play reverse",
        // markers: true,
      },
    });
  }, {dependencies: [], scope: container,})

  // useGSAP(() => {
  //   gsap.fromTo(".buttonContainer", {
  //     opacity: 0,
  //     scale: 0.5,
  //     transformOrigin: "center center",
  //   }, {
  //     scale: 1,
  //     opacity: 1,
  //     y: 0,
  //     duration: 0.8,
  //     ease: "back.out(1.7)",
  //     scrollTrigger: {
  //       trigger: ".container",
  //       start: "top 80%",
  //       toggleActions: "play reverse play reverse",
  //       markers: true
  //     }
  //   })
  // }, {dependencies: [], scope: container,})


  useGSAP(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "h3 span", // Element to trigger the animation
        start: "top 50%", // Start animation when the element is 80% in the viewport
        toggleActions: "play reverse play reverse", // Play once
        markers: true
      },
    });
  
    // Step 1: Popup Animation
    timeline
      .fromTo(
        ".buttonContainer",
        {
          scale: 0.5, // Start smaller
          opacity: 0, // Start invisible
          transformOrigin: "center"
        },
        {
          scale: 1, // Grow to full size
          opacity: 1, // Fully visible
          duration: 0.8, // Animation duration
          ease: "back.out(1.7)", // Smooth overshoot effect
        }
      )
      // Step 2: Scroll Animation
      .to(".buttonContainer", {
        y: (i, el) =>
          -(1 - parseFloat(el.getAttribute("data-speed"))) *
          ScrollTrigger.maxScroll(window), // Movement based on data-speed
        ease: "none", // Linear scrolling
        scrollTrigger: {
          start: 0, // Start scrolling from the top of the page
          end: "max", // End at the bottom of the page
          scrub: 0.5, // Smooth scrolling synchronization
          invalidateOnRefresh: true, // Recalculate on window resize
        },
      });
  }, { dependencies: [] });

  
  return (
    <section className={AboutStyle.about} id='about' ref={container}>
      <div className='container relative'>
        <div className={AboutStyle.buttonContainer + " buttonContainer absolute"} data-speed=".5">
          <MagneticButton name="About Me" url=""/>
        </div>
        {/* < MagneticButton />
        < AboutButton3 /> */}
        <h1>Louis</h1>
        <h3>
          {/* <span>A passionate learner</span><br></br>
          <span>who believe in changing people life better</span><br></br>
          <span>using technology.</span><br></br> */}
          <span>A</span>
          <span>passionate</span>
          <span>learner</span>
          <span>who</span>
          <span>believes</span>
          <span>in</span>
          <span>changing</span>
          <span>people's</span>
          <span>lives</span>
          <span>better</span>
          <span>using</span>
          <span>technology.</span>
        </h3>
        <p>Combining visual design with 
        backend expertise to deliver real solutions</p>
        
      </div>
    </section>
  )
}
