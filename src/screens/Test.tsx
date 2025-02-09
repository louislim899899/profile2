import React from 'react'
// import { GSAPInfoBar } from "https://codepen.io/GreenSock/pen/vYqpyLg.js"
// new GSAPInfoBar({ link: "https://gsap.com/docs/v3/Plugins/ScrollTrigger/", position:'top'});
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Test() {
    gsap.registerPlugin(ScrollTrigger);

    let panels = gsap.utils.toArray(".panel") as HTMLElement[];
    // we'll create a ScrollTrigger for each panel just to track when each panel's top hits the top of the viewport (we only need this for snapping)
    let tops = panels.map(panel => ScrollTrigger.create({trigger: panel, start: "top top"}));

    panels.forEach((panel, i) => {
    ScrollTrigger.create({
        trigger: panel,
        start: () => panel.offsetHeight < window.innerHeight ? "top top" : "bottom bottom", // if it's shorter than the viewport, we prefer to pin it at the top
        pin: true, 
        pinSpacing: false 
    });
    });

    ScrollTrigger.create({
    snap: {
        snapTo: (progress, self) => {
        let panelStarts = tops.map(st => st.start), // an Array of all the starting scroll positions. We do this on each scroll to make sure it's totally responsive. Starting positions may change when the user resizes the viewport
            snapScroll = gsap.utils.snap(panelStarts, self.scroll()); // find the closest one
        return gsap.utils.normalize(0, ScrollTrigger.maxScroll(window), snapScroll); // snapping requires a progress value, so convert the scroll position into a normalized progress value between 0 and 1
        },
        duration: 0.5
    }
    });



// 💚 This just adds the GSAP link to this pen, don't copy this bit

// 💚 Happy tweening!

  return (
    <div>
        <div className="description panel blue bg-green-400 h-lvh">
            <div><h1>Variable height stacked pinning</h1>
                <p>Use pinning to layer panels on top of each other as you scroll.</p>
            <div className="scroll-down">Scroll down<div className="arrow"></div></div>
        </div>
    </div>


    <section className="panel red bg-red-200 h-lvh">
    ONE
    </section>
    <section className="panel orange bg-slate-700 h-lvh" style={{"height": "220vh"}}>
    TWO
    </section>
    <section className="panel purple bg-lime-200 h-lvh" style={{"height": "50vh"}}>
    THREE
    </section>
    <section className="panel green bg-orange-500 h-lvh">
    FOUR
    </section>
    </div>
    )
}
