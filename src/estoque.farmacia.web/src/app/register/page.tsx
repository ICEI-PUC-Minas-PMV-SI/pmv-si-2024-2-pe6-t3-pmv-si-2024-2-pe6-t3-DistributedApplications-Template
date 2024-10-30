'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './page.module.scss';
import {
  Alert,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Snackbar,
} from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [userName, setUserName] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (!authStatus) {
      router.push('/login');
    }
  }, []);

  const handleUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    if (newValue) setUserName(newValue);
  };

  const handleUserPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    if (newValue) setUserPassword(newValue);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowNotification = () => {
    setShowNotification(true);
  };

  const handleHideNotification = () => {
    setShowNotification(false);
  };

  const handleHasError = () => {
    setHasError(true);
  };

  const handleHasNotError = () => {
    setHasError(false);
  };

  const handleFormSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newUser = {
      nomeUsuario: userName,
      senha: userPassword,
    };

    fetch('https://localhost:7208/api/Usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then(() => {
        handleHasNotError();
        handleShowNotification();
        clearForm();
      })
      .catch((error) => {
        console.error(error);
        handleHasError();
        handleShowNotification();
      });
  };

  const clearForm = () => {
    setUserName('');
    setUserPassword('');
  };

  return (
    <section className={styles.register__container}>
      <div className={styles.register__logo_container}>
        <Image
          src='/imgs/logo.png'
          height={0}
          width={0}
          unoptimized
          alt='Logo da Farmácia saúde'
        />
      </div>
      <div className={styles.register__form_container}>
        <form onSubmit={handleFormSubmit}>
          <h2>Criar Conta</h2>
          <FormControl className={styles.register__input} variant='filled'>
            <InputLabel htmlFor='filled-adornment-password'>
              Nome de usuário
            </InputLabel>
            <FilledInput
              value={userName}
              onChange={handleUserName}
              id='filled-adornment-password'
              type='text'
            />
          </FormControl>
          <FormControl className={styles.register__input} variant='filled'>
            <InputLabel htmlFor='filled-adornment-password'>Senha</InputLabel>
            <FilledInput
              value={userPassword}
              onChange={handleUserPassword}
              id='filled-adornment-password'
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleShowPassword}
                    edge='end'
                  >
                    {showPassword ? (
                      <FontAwesomeIcon icon={faEyeSlash} />
                    ) : (
                      <FontAwesomeIcon icon={faEye} />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <button className={styles.register__submit_button} role='submit'>
            CRIAR
          </button>
          <Snackbar
            open={showNotification}
            autoHideDuration={5000}
            onClose={handleHideNotification}
          >
            <Alert
              onClose={handleHideNotification}
              severity={hasError ? 'error' : 'success'}
              variant='filled'
            >
              {hasError
                ? 'Erro! Não foi possível criar o usuário'
                : 'Sucesso! Usuário criado'}
            </Alert>
          </Snackbar>
        </form>
      </div>
    </section>
  );
}
