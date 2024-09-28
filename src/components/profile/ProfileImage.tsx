import React from 'react'
import img from "@/assets/images/man-123.png"

export default function ProfileImage() {
  return (
    <div className="profile__image__container">
      <img src={img} alt="my profile" className='h-full grayscale pt-[120px] m-auto'/>
    </div>
  )
}
