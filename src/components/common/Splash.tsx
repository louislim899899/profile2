import React, { useEffect, useRef } from 'react'
import SplashStyle from '@/assets/styles/components/_splash.module.scss'
import gsap from 'gsap'
import { useLocation } from 'react-router-dom';

function Splash() {

  const splashRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation(); // Get the current page path
  const titleRef = useRef<HTMLDivElement | null>(null);
  const roundDivTopRef = useRef<HTMLDivElement | null>(null);
  const roundDivBottomRef = useRef<HTMLDivElement | null>(null);
  var pageTitle = "Home";
  var homeGreeting = ['Hello', '你好', 'こんにちは', 'Apa Khabar']

  useEffect(() => {

    const tl = gsap.timeline();

    if (location.pathname === '/') {

      homeGreeting.forEach((word, index) => {
        if (index === 0) {
          tl.to(`.word-${index}`, { opacity: 1, duration: 0.8 })
          .to(`.word-${index}`, { opacity: 0, duration: 0 }, "+=0.4");
        } else if (index ===homeGreeting.length -1) {
          tl.to(`.word-${index}`, { opacity: 1, duration: 0 })
        } else {
          tl.to(`.word-${index}`, { opacity: 1, duration: 0 })
          .to(`.word-${index}`, { opacity: 0, duration: 0 }, "+=0.2");
        }
        
      });

      tl.add([
        gsap.to(splashRef.current, {
          transform: 'translateY(-100%)',
          duration: 1.5,
          // ease: "Power4.easeOut"
          // ease: "cubic-bezier(0.7, 0, 0.3, 1)",
          ease: "cubic-bezier(0.9, 0, 1, 0.5)",
          // ease: "cubic-bezier(0.25, 1, 0.5, 1)", 
          // ease: "power4.in",  // Starts slow, ends very fast
          delay: 0.3,
        }),
        gsap.to(roundDivTopRef.current, {
          borderRadius: 0,
          height: 0
        }),
        gsap.to(roundDivBottomRef.current, { 
          borderRadius: 0, 
          height: 0 
        })
      ])

    } else {
      tl.add([
        gsap.to(splashRef.current, {
          height: 0,
          duration: 1.5,
          ease: "power2.inOut"
        }),
        gsap.to(roundDivTopRef.current, {
          borderRadius: 0,
          height: 0
        }),
        gsap.to(roundDivBottomRef.current, { 
          borderRadius: 0, 
          height: 0 
        })
      ])
    }
  }, [location.pathname])


  useEffect(() => {
    console.log('qvqwr');
    if (!splashRef.current) return;


    const tl = gsap.timeline();
    // const roundDivTopWrap = splashRef.current.querySelector(`.${SplashStyle.roundDivTopWrap}`);
    // const roundDivBottomWrap = splashRef.current.querySelector(`.${SplashStyle.roundDivBottomWrap}`);

    // roundDivBottomRef.current?

    // if (!roundDivTopWrap || !roundDivBottomWrap) return; // Ensure both exist before animating


    // words.forEach((word, index) => {
    //   tl.to(`.word-${index}`, { opacity: 1, duration: 0.8 })
    //     .to(`.word-${index}`, { opacity: 0, duration: 0.5 }, "+=0.5");
    // });

    // Move splash screen up after words finish
   
  }, [location.pathname]);


  return (
    <div className={SplashStyle.splashContainer}>
    <div className={SplashStyle.splash} ref={splashRef}>
        <div className={SplashStyle.roundDivTopWrap} ref={roundDivTopRef}>
          <div className={SplashStyle.roundDivTop}></div>
        </div>
        <div className={SplashStyle.wordings}>
          {location.pathname == '/' ? homeGreeting.map((word, index) => (
            <h2 key={word} className={'word-'+index } >{word}</h2>
          )) : <h2 ref={titleRef}>{pageTitle}</h2>}
        </div>
        <div className={SplashStyle.roundDivBottomWrap} ref={roundDivBottomRef}>
          <div className={SplashStyle.roundDivBottom}></div>
        </div>
    </div>
    </div>
  )
}

export default Splash