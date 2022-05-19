import React from 'react';
import logo from '../images/logo.svg'
import { Route, Routes, Link } from 'react-router-dom';

function Header({
  email,
  signOut
}) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип" />
      <Routes>

        <Route exact path="/" element={
          <div className='header__info'>
            <p className='email'>{email}</p>
            <Link to="/" className='exit' onClick={signOut}>Выйти</Link>
          </div>
        }>

        </Route>

        <Route exact path="/sign-up" element={
          <Link to="/sign-in" className='come-in'>Войти</Link>
        }>
        </Route>

        <Route exact path="/sign-in" element={
          <Link to="/sign-up" className='come-in'>Регистрация</Link>
        }>
        </Route>

      </Routes>
    </header>
  )
}

export default Header;
