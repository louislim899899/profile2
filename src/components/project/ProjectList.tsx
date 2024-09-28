import React from 'react'
import projectMap from '../../utils/dicts/ProjectMap'
import { Link } from 'react-router-dom'

export default function ProjectList() {
  return (
    <div className="project-img-wrapper">
      <h2>Projects.</h2>
      {
        Array.from(projectMap, ([key, value]) => {
          return (
            <Link to={`/project/view/${key}`}>
              <img src={value.img} alt="my profile" className='project__header__image'/>
            </Link>
          )
        })
      }
    </div>
  )
}
