import React, { useRef, useState } from 'react'
import { MenuItemData } from './MenuItemData'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import SideMenuStyle from '@/assets/styles/components/_sidemenu.module.scss'
import useMagnetic from '../../hooks/useMagnetic'
import MenuItem from './MenuItem'

const SideMenu = () => {

    const overlayRef = useRef<HTMLDivElement | null>(null);

    const [menuState, setMenuState] = useState<boolean>(false);

    const magneticRef = useMagnetic();

    const [menuKey, setMenuKey] = useState<number>(0); // 🔹 Force re-render

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {

        if (!menuState) {
            menuOpenAnimation()
            overlayRef.current!.classList.add(SideMenuStyle.active);
            overlayRef.current!.style.opacity = "0.35";

            // overlayOpen()
        } else {
            menuCloseAnimation()
            // overlayRef.current!.style.opacity = "0";

            overlayRef.current!.style.transition = "opacity 0.5s ease-in-out";
            overlayRef.current!.style.opacity = "0";

            setTimeout(() => {
                overlayRef.current!.classList.remove(SideMenuStyle.active);
            }, 500); // Match opacity transition duration
            // overlayClose()
        }
        setMenuState(!menuState)
        
    }

    const menuTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            setMenuKey((prevKey) => prevKey + 1);
            // overlayRef.current!.style.visibility = !menuState ?  'hidden' : '';
        }
        console.log(menuState);
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
        
        const elem = document.querySelector<HTMLElement>(`.${SideMenuStyle.overlay}`)!;
        console.log(elem);
    }   

    const menuCloseAnimation = () => {

    }

  return (
    <div className={`${SideMenuStyle.buttonWrapper} ${menuState ? SideMenuStyle.active : ''}`}>
        <button onClick={handleClick} className={`${SideMenuStyle.button}`} ref={magneticRef}>
            <div className={SideMenuStyle.buttonContainer}>
                <div className={SideMenuStyle.buttonIcon + ' button-icon'}></div>
            </div>
            
        </button>

        <div key={menuKey} className={SideMenuStyle.siteMenuContainer + ' bg-white  h-full side-menu-container relative'} onTransitionEnd={menuTransitionEnd}>
            <div className={SideMenuStyle.roundDivWrap}>
                <div className={SideMenuStyle.roundDiv}>
                    <div className={SideMenuStyle.round}></div>
                </div>
            </div>
            <div className={SideMenuStyle.sideMenu}>
                <p>NAVIGATION</p>
                <hr/>
                <ul>
                    {MenuItemData.map(item => <MenuItem title={item.title} url={item.url}/>)}
                </ul>
            </div>
        </div>
        <div></div>
        <div className={SideMenuStyle.overlay} ref={overlayRef}></div>

    
    </div>
  )
}

export default SideMenu