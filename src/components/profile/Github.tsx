import React from 'react'
import { GithubLogo } from '../logo/Logo'

export default function Github() {
  return (
    <div className='block'>
      <div className="block__github">
        <a href="https://github.com/louislim899899/profile" target="_blank" rel="noreferrer">
          <p className='mb-4'>View Github projects</p>
          <GithubLogo/>
        </a>
      </div>
    </div>
  )
}

<style>
    
</style>