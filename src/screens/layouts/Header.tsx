import React from 'react'
import Navbar from '../../components/Navbar'
import { useDispatch } from 'react-redux'
import { menuActions } from '../../services/store/menuSlice'

export default function Header() {
  const dispatch = useDispatch()

  const toggleMenu = () => {
    dispatch(menuActions.toggleMenu())
  }

  //thunks

  return (
    <header className='header'>
      <button onClick={toggleMenu} className="header__button" data-testid="navBtn">
        <h2 className='header__button__title'>Ls.</h2>
        </button>
      <Navbar/>
    </header>
    
  )
}
