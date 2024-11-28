'use client';

import classNames from 'classnames';
import styles from './Header.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Menu, MenuItem } from '@mui/material';
import React from 'react';

interface IPage {
  name: string;
  url: string;
}

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const pages: IPage[] = [
    {
      name: 'Medicamentos',
      url: '/medicines',
    },
    {
      name: 'Criar medicamento',
      url: '/register-medicine',
    },
    {
      name: 'Relatórios',
      url: '/get-report',
    },
    {
      name: 'Criar usuário',
      url: '/register',
    },
  ];
  const path = usePathname();
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    router.push('/login');
  };

  return (
    <header className={styles.header__container}>
      <Link href={pages[0].url}>
        <Image
          src='/imgs/logo.png'
          height={0}
          width={0}
          unoptimized
          alt='Logo da Farmácia saúde'
        />
      </Link>
      <div className={styles.header__links_container}>
        <ul className={styles.header__links_list}>
          {pages &&
            pages.map((page, index) => (
              <Link
                href={page.url}
                className={classNames({
                  [styles.header__links_item]: true,
                  [styles.active]: path === page.url,
                })}
                key={index}
              >
                <li>{page.name}</li>
              </Link>
            ))}
          <li
            onClick={logout}
            className={classNames({
              [styles.header__links_item]: true,
              [styles.logout]: true,
            })}
          >
            Sair
            <FontAwesomeIcon icon={faRightFromBracket} />
          </li>
        </ul>
        <div className={styles.header__links_menu_container}>
          <button onClick={handleClick}>
            <FontAwesomeIcon icon={faBars} />
          </button>
          <Menu
            className={styles.menu}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {pages &&
              pages.map((page, index) => (
                <MenuItem key={index}>
                  <Link href={page.url} className={styles.header__links_item}>
                    {page.name}
                  </Link>
                </MenuItem>
              ))}
          </Menu>
        </div>
      </div>
    </header>
  );
}
