import React, { createContext } from 'react';
// import logo from './logo.svg';
// import './App.css';
import './assets/styles/main.scss';
import './assets/styles/main.module.scss'
import Header from './screens/layouts/Header';
import Body from './screens/layouts/Body';
import SplashScreen from './screens/SplashScreen'
import { ReactLenis, useLenis } from '@studio-freight/react-lenis'
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenis = useLenis(({ scroll }) => {
    // called every scroll
  })

  lenis?.on('scroll', ScrollTrigger.update);

  // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
  // This ensures Lenis's smooth scroll animation updates on each GSAP tick
  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000); // Convert time from seconds to milliseconds
  });

  // Disable lag smoothing in GSAP to prevent any delay in scroll animations
  gsap.ticker.lagSmoothing(0);

  // gsap.to("[data-speed]", {
  //   y: (i, el) => (1 - parseFloat(el.getAttribute("data-speed"))) * ScrollTrigger.maxScroll(window) ,
  //   ease: "none",
  //   scrollTrigger: {
  //     start: 0,
  //     end: "max",
  //     invalidateOnRefresh: true,
  //     scrub: 0
  //   }
  // });
  const LenisContext = createContext<LenisContextType | undefined>(undefined);



  return (
    <div className="app">
      {/* <SplashScreen/> */}

        <header className="App-header">
          <Header />
        </header>
        <main>
          {/* <ReactLenis root options={{lerp: 0.1, duration: 1.5}}> */}
          <Body />
          {/* <Test /> */}
          {/* </ReactLenis> */}
          
        </main>
    </div>
  );
}

export default App;
