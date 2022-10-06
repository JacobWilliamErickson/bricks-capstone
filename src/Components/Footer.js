import { Link } from 'react-router-dom'
import styles from '../styles/Footer.module.css'
import { AiFillInstagram,AiFillFacebook } from "react-icons/ai";
export default function Footer() {
  return (
    <footer >
      <div className={styles.footer}>
      <AiFillInstagram/>
      <AiFillFacebook/>
      </div>
        <div className={styles.footer}>
      <p>Copyright &copy; Jacob Erickson 2022</p>
        </div>
      <div className={styles.break}>

      </div>
      <div className={styles.footer}>
      <p>
        <Link to='/about'>
          <a>About This Project</a></Link>
      </p>
<br />

      </div>
    </footer>
  )
}