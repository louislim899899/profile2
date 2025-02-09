import React, { useRef } from 'react'
import ProfileImage from '../profile/ProfileImage'
import HeroStyle from '../../assets/styles/components/_hero.module.scss'
import img from "@/assets/images/man-123.png"
import TextRing from './TextRing'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Hero() {

  const container = useRef(null);
  // useGSAP(() => {
  //   gsap.to(".circle", {
  //     rotation: "+=360",
  //     duration: 3,
  //     repeat: -1,
  //     stagger: 0.1,
  //     ease: "none"
  //   })
  // }, { dependencies: [], scope: container })

  // gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    gsap.to("#hero",{
      scrollTrigger:{
      trigger: "#hero",
      pin: true,
      pinSpacing: false,
      start: "top top",
      end: "bottom top",
      // markers: true,
      id: "hero"
    }});
  })

  const words = ["WordPress", "React", "Front-End"];
  let index = 0;

  // console.log(document.querySelector("#word"));

  useGSAP(() => {
    // gsap.to("#word",{
    //   opacity: 0,
    //   duration: 0.5,
    //   onComplete: () => {
    //     document.querySelector("#word").textContent = words[index];
    //     gsap.to("#word", { opacity: 1, duration: 0.5 });
    //     index = (index + 1) % words.length;
    //   }
    // });
    // gsap.from("#word", {
    //   rotationX: -100,
    //   transformOrigin: "50% 50% -160px",
    //   opacity: 0,
    //   duration: 0.8, 
    //   ease: "power3",
    //   stagger: 0.25
    // })
  })


  // useGSAP(() => {
  //   ScrollTrigger.create({
  //     trigger: '#hero',
  //     start: 'top top',
  //     end: '+=300%',
  //     pin: true,
  //     scrub: true,
  //     markers: {
  //       startColor: "purple",
  //       endColor: "blue",
  //     }
  //   });
  //   })

    // gsap.registerPlugin(ScrollTrigger);

    // const sections = gsap.utils.toArray('section')
    // sections.forEach((element) => {
    //   gsap.to(sections, {
    //     // yPercent: -100,
    //     // ease: 'none',
    //     scrollTrigger: {
    //       trigger: element,
    //       start: 'top top',
    //       end: 'bottom top',
    //       pin: true,
    //       pinSpacing: false,
    //       scrub: 1,
    //       snap: 1 / 3,
    //     },
    //   })
    // })

  const rotateWord = () => {
    gsap.timeline()
      .to("#word", { 
        y: 20, 
        rotationX: 90, 
        opacity: 0, 
        duration: 0.5,
        onComplete: () => {
          // document.querySelector("#word").textContent = words[index];
          index = (index + 1) % words.length;
        }
      })
      .fromTo("#word", { 
        y: -20, 
        rotationX: -90, 
        opacity: 0 
      }, { 
        y: 0, 
        rotationX: 0, 
        opacity: 1, 
        duration: 0.5 
      })
      .to("#word", { 
        delay: 5, // Stay visible for 5 seconds
        y: 20, 
        rotationX: 90, 
        opacity: 0, 
        duration: 0.5 
      });
  }

// setInterval(rotateWord, 3000);

  return (
    <section className={HeroStyle.hero} id="hero">
        <div id='word' className={HeroStyle.location}>Penang, Malaysia</div>

        {/* <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className={HeroStyle.circular_text}
        >
          <path
            id="circlePath"
            d="
              M 10, 50
              a 40,40 0 1,1 80,0
              40,40 0 1,1 -80,0
            "
          />
          <text>
            <textPath href="#circlePath">
              Malaysia • Penang
            </textPath>
          </text>
        </svg> */}
        <div ref={container}>
        </div>
        

        < TextRing />

        <div className={HeroStyle.role_container} >
          <svg className={HeroStyle.arrow} width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"/></svg>
          <p　className={HeroStyle.role}>
            <span className={HeroStyle.word} id='word'>Full Stack</span> Developer
          </p>
        </div>

        {/* <ProfileImage></ProfileImage> */}
        <div className={HeroStyle.profile_image}>
          <img src={img} alt="my profile" className='h-full m-auto'/>
        </div>
    </section>
  )
}
