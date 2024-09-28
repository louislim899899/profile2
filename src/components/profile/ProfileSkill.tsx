import React from 'react'
import {VueLogo, ReactLogo, TailwindLogo, PhpLogo, SqlLogo, PythonLogo, SassLogo} from '../logo/Logo'

export default function ProfileSkill () {
  return (
    <div>
        <h3>Skills.</h3>
        <p>Frontend</p>
          <div className='mb-6 mt-1'>
              <VueLogo />
              <ReactLogo />
              <TailwindLogo />
              <SassLogo />
          </div>
        <p className='-mb-4'>Backend</p>
          <div className='mb-6 mt-1'>
            <PhpLogo />
            <SqlLogo />
            <PythonLogo />
          </div>
    </div>
  )
}
