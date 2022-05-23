import { Fastfood } from '@mui/icons-material';

import { AccountMenu } from '../AccountMenu/AccountMenu';

import styles from './styles.module.scss';

export function Header() {

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <div className={styles.logoContainer}>
          <Fastfood />
          <span>SnackTime</span>
        </div>
        <div className={styles.userContainer}>
          <AccountMenu />
        </div>
      </div>
    </header>
  )
}