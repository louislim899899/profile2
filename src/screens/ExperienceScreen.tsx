import React, { useEffect } from 'react'
import ExperienceMap from '@/utils/dicts/ExperienceMap'

export default function ExperienceScreen() {

  useEffect(()=> {
    initiateSlider();
    showDot(); 
  }, []);

  // custom code - https://www.csscodelab.com/vertical-slider-dots-indicator-using-javascript/
  function initiateSlider() {
    const sliders = Array.from(document.querySelectorAll('.wrapper'));

    sliders.forEach((slider) => {
      
      slider.querySelector('.panel:nth-child(1)')?.classList.add('_active');
      slider.querySelector('.nav-dot:nth-child(1)')?.classList.add('active');
      
      const navDots = Array.from(document.querySelectorAll('.nav-dot'));
      
      navDots.forEach((dot) => {
        dot.addEventListener('click', () => {
          slider.dispatchEvent(new Event('slide.changed'));
          dot.classList.add('active');
          const slideToGo = Number(dot.getAttribute('data-slide'));
          goToSlide(slideToGo);
        });
      });
      
      /*
      Reset all the slide dot, remove "active" from all slide dot
      */
      slider.addEventListener('slide.changed', () => {
        console.log('slide changed!');
        navDots.forEach((dot) => {
          dot.classList.remove('active');
        });

      });
      
      function goToSlide(slideToGo: number) {
        const activeSlide = slider.querySelector('.panel._active');
        activeSlide?.classList.remove('_active');
        slider.querySelectorAll('.panel')[slideToGo - 1]?.classList.add('_active');
        // slider.dispatchEvent(new Event('slide.changed'));
      }
    });
    // custom code end
  }
  
  const showDot = () => {
    let count = 1
    ExperienceMap.forEach((value, key) => {
      // console.log(typeof(value))
      const newEntry = ["slideOrder", count];
      value.set(...newEntry);
      count+=1;
    });
  } 

  return (
    <div className='exp-wrapper'>

      <div className="wrapper">
        <div className="nav-dots">
          
        {
        Array.from(ExperienceMap, ([key, value]) => {
          return (
            
            
            <div className="nav-dot" data-slide={value.get('slideOrder')}>
              <p>{key}</p>
            </div>
          )
        })}
        </div>
        
        {
        Array.from(ExperienceMap, ([key, value]) => {
        return (
          <div className="panel-wrapper">
            <div className="panel" data-slide={value.get('slideOrder')}>
              <div className="trans-layer" id={"layer-"+value.get('slideOrder')}></div>
              <section className="section" id={"section-"+value.get('slideOrder')}>
                <div className="section-content">
                  <div key={value.get('year')} className="exp-wrapper__block">
                    <h3>{value.get('year')}</h3>
                    <h4>{value.get('company')}</h4>
                    <h5 className="font-color--main">{value.get('position')}</h5>
                    <p>{
                    Array.isArray(value.get('description')) ? 
                    value.get('description').map((value) => 
                      (<li key={value}>{value}</li>)
                    ) :
                      <li key={value}>{value.get('description')}</li>
                    }</p>
                  </div>
                </div>
              </section>
          </div>
        </div>
        )})}
      </div>

    </div>
  )
}
