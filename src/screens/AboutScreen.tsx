import ProfileSkill from '@/components/profile/ProfileSkill'
import React from 'react'

export default function AboutScreen() {
  return (
    <div className='about content-padding-top'>
        <h2 className='about__title'>About Me.</h2>
        <p>Improving people life with technology has been my passion to learn programming. I am a visual person who enjoy tweaking special animation effect and design modern website. Though, I have learned backend programming in order to deliver not only visual effect but real business value to the end customer. Experiencing customer satisfaction and feedback about my creation is the biggest satisfaction that keeps me learning more about programming. </p>
            
        <p>Programming knowledge is wide and I am still studying during my leisure time. Now, what fascinating me is the best practices to build a scalable project used in large enterprise such as CI/CD, agile, TDD, better OOP, design pattern, architecture and refactoring skill.</p>

        <div>
            <ProfileSkill/>
        </div>
    </div>
  )
}
