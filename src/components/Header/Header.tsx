import { Fastfood } from '@mui/icons-material';
import { Input } from '@mui/material';

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
          <div>
            <p>{status === 'authenticated' ? session.user.name : 'Não informado'}</p>
            <span>{status === 'authenticated' ? session.user.email : 'Não informado'}</span>
          </div>
        </div>
      </div>
    </header>
  )
}