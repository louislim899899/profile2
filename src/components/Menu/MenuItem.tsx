import React from 'react'
import useMagnetic from '../../hooks/useMagnetic'
import NavStyle from '@/assets/styles/components/_nav.module.scss'
import { useLocation } from 'react-router-dom'

interface MenuItemProps {
  title: string,
  url: string
}

function MenuItem({title, url} : MenuItemProps) {
  const magneticTitleRef = useMagnetic()
  const location = useLocation();

  return (
    <li>
      <a href={url} ref={magneticTitleRef} className={location.pathname === url ? NavStyle.active : ''}>{title}</a>
    </li>
  )
}

export default MenuItem