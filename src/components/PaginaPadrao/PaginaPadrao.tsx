import styles from './PaginaPadrao.module.scss';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

export default function PaginaPadrao() {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles['container-outlet']}>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
