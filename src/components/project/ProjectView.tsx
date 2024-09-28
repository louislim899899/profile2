import React from 'react'
import { Link, useParams } from 'react-router-dom';
import projectMap from '../../utils/dicts/ProjectMap';

export default function ProjectView() {

  const { id } = useParams();
  const project = projectMap.get(id ?? '')  

  // console.log(project.stack)

  if (!project) {
    return <div>No project ID provided</div>;
  }

  return (
    <div className="block content-padding-top project__view">
      <div className=''>
        <Link to="/project" className='font-color--main'>← Back to project list</Link>
        <h3 className='mt-3 text-3xl'>{project.name}</h3>
      </div>

      <p>{project.desc}</p>

      <ul className='list-disc pl-5'>
      {project.features.map((feature) => {
        return(<li>{feature}</li>)
      }
      )}
       </ul>

      <h4 className='mt-5'>Stack</h4>
      <div>
      {project.stack.map((logo) => {
        return(<span>{logo}</span>)
      })}
      </div>

      <div className='project__link'>
        <a href={project.link} target='_blank' rel="noopener noreferrer">Visit website</a>
      </div>

      <div className="project__image">
        <img src={project.img} alt="my profile" className='project__header__image'/>
      </div>
     

    </div>

  )
}
