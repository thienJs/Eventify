import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Nav.module.css';

const Nav = () => (
  <nav className={classes.Nav}>
    <div className={classes.Nav__brand}>Eventify</div>
    <ul className={classes.Nav__items}>
      <li>
        <NavLink to="/">Eventos</NavLink>
      </li>
      <li>
        <NavLink to="/">Personas</NavLink>
      </li>
      <li>
        <NavLink to="/">Chat room</NavLink>
      </li>
      <li>
        <NavLink to="/">Crear Evento</NavLink>
      </li>
    </ul>
    <div className={classes.Nav__right}>
      <NavLink to="/">Login</NavLink>
      <NavLink to="/">Registrarse</NavLink>
      <ol>
        <li className={classes.menu__item}>
          <a href="#0">Widgets</a>
          <ol className={classes.sub__menu}>
            <li className={classes.menu__item}>
              <a href="#0">Big Widgets</a>
            </li>
            <li className={classes.menu__item}>
              <a href="#0">Bigger Widgets</a>
            </li>
            <li className={classes.menu__item}>
              <a href="#0">Huge Widgets</a>
            </li>
          </ol>
        </li>
      </ol>
    </div>
  </nav>
);

export default Nav;
