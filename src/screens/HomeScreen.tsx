import React, {useEffect} from "react";
import Hero from "../components/home/Hero";
import About from "../components/home/About";
import Skill from "../components/home/Skill";
import Project from "../components/home/Project";
import Contact from "../components/home/Contact";

export default function HomeScreen() {
    useEffect(() => {
        const introElems = document.querySelectorAll(".intro>*") 
        const skillElems = document.querySelectorAll(".profile__skill>*>*") 
        const gitElems = document.querySelectorAll(".block__github>*>*")

        const initialOpacity = (elems) => {
            elems.forEach(elem =>  {
                elem.style.opacity = 0
            })
        }

        const fadeInAnim = (elems) => {
            let delay = 300
            elems.forEach(elem =>  {
                elem.style.animation = `fade-in-right 500ms forwards`;
                elem.style.animationDelay = `${delay}ms`;
                delay += 300;
            })
        }

        window.addEventListener('load', () => {
                initialOpacity([...introElems, ...skillElems, ...gitElems]);
                fadeInAnim(introElems);
                fadeInAnim(skillElems);
                fadeInAnim(gitElems);

        })



        // const eachElemStyle = (elems, styles) => {
        //     elems.forEach(elem => {
        //         styles.forEach(s => {
        //             elem.style[s] = 
        //         })
        //     });
        // }
        

        // setTimeout(()=>{
        //     const test = document.querySelector(".intro__title") as HTMLElement
        //     test.style.animation = "fade-in-up 500ms forwards";
        //     console.log('run');
        // },4000)
        

    }, [])


    return(
        <div>
            <Hero />
            <About/>
            <Skill />
            <Project />
            <Contact />
        </div>
    )


}