import React from 'react'
import HeroStyle from '@/assets/styles/components/_hero.module.scss'

export default function TextRing() {

    const str:string = "Penang • Malaysia" ;
    const text = document.getElementById("ringText");
        window.onload = function(){
            for (let i = 0; i < str.length; i++) {
                let span = document.createElement('span');
                span.innerHTML = str[i] 
                text?.appendChild(span);
                span.style.transform = `rotate(${11*i}deg)`;
            }
        }
  return (
    <p id='ringText' className={HeroStyle.ringtext}></p>
  )
}
