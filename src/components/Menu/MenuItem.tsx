import React from 'react'
import useMagnetic from '../../hooks/useMagnetic'
import SideMenuStyle from '@/assets/styles/components/_sidemenu.module.scss'
import { useLocation } from 'react-router-dom'

interface MenuItemProps {
  title: string,
  url: string
}

function MenuItem({title, url} : MenuItemProps) {
  const magneticTitleRef = useMagnetic()
  const location = useLocation();

  console.log(location.pathname)
  console.log(url)
  

  return (
    <li>
      <a href={url} ref={magneticTitleRef} className={location.pathname === url ? SideMenuStyle.active : ''}>{title}</a>
    </li>
  )
}

export default MenuItem