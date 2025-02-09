import React from 'react'
import Navbar from '../../components/Menu/Navbar'
import SideMenu from '../../components/Menu/SideMenu'
import { useDispatch } from 'react-redux'
import { menuActions } from '../../services/store/menuSlice'
import Headerstyle from '../../assets/styles/layout/_header.module.scss' 
import { MenuItemData } from '../../components/Menu/MenuItemData'
import { Link } from 'react-router-dom'

export default function Header() {
  const dispatch = useDispatch()

  const toggleMenu = () => {
    dispatch(menuActions.toggleMenu())
  }

  //thunks

  return (
    <header className='header w-full'>
      <SideMenu/>
      <Navbar/>
      <div className='flex justify-between mt-4 px-10'>
        <button onClick={toggleMenu} className="header__button" data-testid="navBtn">
          <h2 className='header__button__title'>Ls.</h2>
        </button>
      <ul className={Headerstyle.nav + ' flex justify-between'}>
        {/* <li>About</li>
        <li>Projects</li>
        <li>Contact</li> */}

        {MenuItemData.map((item) => (
          <li key={item.title}><Link  to={item.url} className="nav__link" data-testid={item.title}>{item.title}</Link></li>
        ))}
      </ul>
      </div>

      
    </header>
    
  )
}
