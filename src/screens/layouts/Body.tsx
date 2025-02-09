import ProfileImage from '@/components/profile/ProfileImage'
import ProfileSkill from '@/components/profile/ProfileSkill'
import { RootState } from '@/services/store'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes, useLocation } from 'react-router-dom'
import HomeScreen from '../HomeScreen'
import ProjectScreen from '../ProjectScreen'
import '@/assets/styles/animation.css'
import { useDispatch } from 'react-redux'
import { transitionActions } from '@/services/store/transitionSlice'
import { screenActions } from '@/services/store/screenSlice'
import AboutScreen from '../AboutScreen'
import ExperienceScreen from '../ExperienceScreen'
import ContactScreen from '../ContactScreen'
import Github from '@/components/profile/Github'
// import profileCss from '@/assets/styles/pages/_profile.module.scss'
import ProjectView from '../../components/project/ProjectView'
import AppStyle from '../../../src/assets/styles/layout/_app.module.scss'


// const HomeScreen = lazy(() => import('../HomeScreen'));
// const AboutScreen = lazy(() => import('../AboutScreen'));

export default function Body() {
    const location = useLocation()
    const dispatch = useDispatch()

    const isHomeScreen = useSelector((state: RootState) => state.screen.isHomeScreen)
    const currentUrl = useSelector((state: RootState) => state.screen.currentUrl)
    const transition = useSelector((state: RootState) => state.transition.transition)
    const device = useSelector((state: RootState) => state.screen.device)

    const isMounted = React.useRef(false);

    const compareUrl = () => {
        // dispatch(screenActions.currentUrl())
        // console.log(location.pathname)
        
        if (transition === "fade-out") {
            dispatch(transitionActions.changeTransition("FADE_IN"))
            dispatch(screenActions.setCurrentUrl(location.pathname))
        } 
    }

    useEffect(() => {
        if (location.pathname !== currentUrl) {
            dispatch(transitionActions.changeTransition("FADE_OUT"))
        } 

        const checkHomeScreen = () => {
            currentUrl === "/profile" ? dispatch(screenActions.isHomeScreen()) : dispatch(screenActions.notHomeScreen());
        }
        
        checkHomeScreen(); 

    }, [location, currentUrl, dispatch])

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
      } else {
        // setTimeout(() => {
        //     getDevice();
        // }, 5000)

        const getDevice = () => {
            dispatch(screenActions.getDevice());
        }

        getDevice(); 
      }
    }, [device, dispatch])  // run only first time;
  

  return (
    <div className={AppStyle.app} >
        <div >
            <div onAnimationEnd={()=> {compareUrl()}}>
                <Routes location={currentUrl} >
                    <Route path="/" element={<HomeScreen/>}/>
                    <Route path="/about" element={<AboutScreen/>}/>
                    <Route path="/project" element={<ProjectScreen/>}/>
                    <Route key="view" path="/project/view/:id" element={<ProjectView/>}/>
                    <Route path="/contact" element={<ContactScreen/>}/>
                </Routes>
            </div>
        </div>        
    </div>
  )
}
