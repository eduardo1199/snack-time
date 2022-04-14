import { Fastfood } from '@mui/icons-material';

import { useSession } from 'next-auth/react';
import { AccountMenu } from '../AccountMenu/AccountMenu';

import styles from './styles.module.scss';

export function Header() {
  const { data: session, status } = useSession();

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <div className={styles.logoContainer}>
          <Fastfood />
          <span>SlackTime</span>
        </div>
        <div className={styles.userContainer}>
          <AccountMenu />
          <p>{status === 'authenticated' ? session.user.name : 'Não informado'}</p>
        </div>
      </div>
    </header>
  )
}