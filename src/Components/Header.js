import { NavLink } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import styles from '../styles/Header.module.css'
import {auth} from "../firebase-config";
export default function Header() {
  const [user] = useAuthState(auth);
  return (
    <header className={styles.header}>
      <div className={styles.leftnav}>
        <NavLink to='/'>
          <a className={styles.headerlogos}><img src="/brick-wall.png" alt="Brick logo" className={styles.headerlogo}/></a>
        </NavLink>
        <nav>
        <ul>
          <li>
            <NavLink to='/products/bricks'>
              <a>Bricks</a>
            </NavLink>
          </li>
          </ul>
          </nav>
      </div>

      <nav>
        <ul>
        {user && user.uid===`${process.env.REACT_APP_USERID}` && (
            // If logged in
            <>
              <li>
                <NavLink to='/company'>
                  <a>Company</a>
                </NavLink>
              </li>
            </>
          )}
          <li>
            <NavLink to='/about'>
              <a>Who are we?</a>
            </NavLink>
          </li>
          <NavLink to='/profile'>
          <a className={styles.headerlogo}><img src="/profile-icon-png-899.png" alt="Profile icon" className={styles.headerlogo}/></a>
        </NavLink>
        <NavLink to='/profile/checkout'>
          <a className={styles.headerlogo}><img src="/cart.png" alt="Cart icon" className={styles.headerlogo}/></a>
        </NavLink>
        </ul>
        
      </nav>
    </header>
  )
}