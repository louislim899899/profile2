import React, { useRef, useState } from 'react'
import { MenuItemData } from './MenuItemData'
import  ButtonStyle  from '@/assets/styles/components/_button.module.scss'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import NavStyle from '@/assets/styles/components/_nav.module.scss'
import useMagnetic from '../../hooks/useMagnetic'
import MenuItem from './MenuItem'


const SideMenu = () => {

    const overlayRef = useRef<HTMLDivElement | null>(null);
    const [menuState, setMenuState] = useState<boolean>(false);
    const magneticRef = useMagnetic();
    const [menuKey, setMenuKey] = useState<number>(0); // 🔹 Force re-render

    useGSAP(() => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".header__button__title", // Element to trigger the animation
            start: "300px", 
            end: '100%',
            toggleActions: "play none none reverse",
            markers: true
          },
        });
      
        // Step 1: Popup Animation
        timeline
          .fromTo(
            ".navButton",
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
      }, { dependencies: [] });
      

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!menuState) {
            menuOpenAnimation()
            overlayRef.current!.classList.add(NavStyle.active);
            overlayRef.current!.style.opacity = "0.35";
            // document.body.style.overflow = "hidden";

            // overlayOpen()
        } else {
            menuCloseAnimation()
            // overlayRef.current!.style.opacity = "0";

            overlayRef.current!.style.transition = "opacity 0.5s ease-in-out";
            overlayRef.current!.style.opacity = "0";

            setTimeout(() => {
                overlayRef.current!.classList.remove(NavStyle.active);
            }, 500); // Match opacity transition duration
            // overlayClose()
            // document.body.style.overflow = "";
        }
        setMenuState(!menuState)
    }

    const menuTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            setMenuKey((prevKey) => prevKey + 1);
            // overlayRef.current!.style.visibility = !menuState ?  'hidden' : '';
        }
    }

    // const overlayOpen = () => {
    //     gsap.to(overlayRef.current, {
    //       opacity: 1,
    //       display: "block",
    //       duration: 0.5,
    //       ease: "power2.out",
    //     });
    //     document.body.classList.add("no-scroll");
    //   };
    
    //   const overlayClose = () => {
    //     gsap.to(overlayRef.current, {
    //       opacity: 0,
    //       duration: 0.5,
    //       ease: "power2.out",
    //       onComplete: () => {
    //         overlayRef.current!.style.display = "none";
    //       },
    //     });
    //     setMenuState(false);
    //     menuCloseAnimation();
    //   };
    

    const menuOpenAnimation = () => {
        
        const elem = document.querySelector<HTMLElement>(`.${NavStyle.overlay}`)!;
        console.log(elem);
    }   

    const menuCloseAnimation = () => {

    }

  return (
    <div className={`${NavStyle.buttonWrapper} ${menuState ? NavStyle.active : ''}`}>
        <button onClick={handleClick} className={`${NavStyle.button} navButton`} ref={magneticRef}>
            <div className={`${NavStyle.buttonContainer} ${ButtonStyle.buttonHover}`}>
                <div className={NavStyle.buttonIcon + ' button-icon'}></div>
            </div>
            
        </button>

        <div key={menuKey} className={NavStyle.siteMenuContainer + ' bg-white  h-full side-menu-container relative'} onTransitionEnd={menuTransitionEnd}>
            <div className={NavStyle.roundDivWrap}>
                <div className={NavStyle.roundDiv}>
                    <div className={NavStyle.round}></div>
                </div>
            </div>
            <div className={NavStyle.sideMenu + " " + NavStyle.nav}>
                <div className='menu'>
                    <p>NAVIGATION</p>
                    <hr/>
                    <ul>
                        {MenuItemData.map(item => <MenuItem title={item.title} url={item.url}/>)}
                    </ul>
                </div>
                <div className='mt-20 social'>
                    <p>SOCIALS</p>
                    <div>
                        <a href='/' className='mr-3'>LinkedIn</a>
                        <a href='/'>Github</a>
                    </div>
                    
                </div>
            </div>
        </div>
        <div></div>
        <div className={NavStyle.overlay} ref={overlayRef}></div>

    
    </div>
  )
}

export default SideMenu