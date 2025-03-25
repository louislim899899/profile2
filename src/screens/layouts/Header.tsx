import React from 'react'
import Navbar from '../../components/Menu/Navbar'
import SideMenu from '../../components/Menu/SideMenu'
import { useDispatch } from 'react-redux'
import { menuActions } from '../../services/store/menuSlice'
import HeaderStyle from '../../assets/styles/layout/_header.module.scss' 
import NavStyle from '@/assets/styles/components/_nav.module.scss'
import { MenuItemData } from '../../components/Menu/MenuItemData'
import { Link, useLocation } from 'react-router-dom'
import MenuItem from '../../components/Menu/MenuItem'

export default function Header() {
  const dispatch = useDispatch()
  const location = useLocation();

  const toggleMenu = () => {
    dispatch(menuActions.toggleMenu())
  }

  //thunks

  return (
    <header className='header w-full'>
      <SideMenu/>
      {/* <Navbar/> */}
      <div className='flex justify-between mt-4 px-10'>
        {/* <button onClick={toggleMenu} className="header__button" data-testid="navBtn"> */}
          <h2 className='header__button__title'>
          <Link to="/">Ls.</Link>
            </h2>
        {/* </button> */}
        <div className={NavStyle.nav}>
      <ul className={HeaderStyle.topNav + ' flex justify-between'}>
        {/* <li>About</li>
        <li>Projects</li>
        <li>Contact</li> */}

        {MenuItemData.map((item) => (
          item.title !=="Home" ?
          // <li key={item.title}><Link key={item.title} to={item.url} className={(location.pathname === item.url ? NavStyle.active : "") + " nav__link"} data-testid={item.title}>{item.title}</Link></li>
          <MenuItem title={item.title} url={item.url}/>
          : ''
        ))}
      </ul>
      </div>
      </div>

      
    </header>
    
  )
}
