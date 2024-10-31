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
import React, { useState } from 'react';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();

  const [userName, setUserName] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const handleUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleUserPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserPassword(event.target.value);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowNotification = (errorStatus: boolean) => {
    setHasError(errorStatus);
    setShowNotification(true);
  };

  const handleHideNotification = () => {
    setShowNotification(false);
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(
        'https://localhost:7208/api/Usuarios/Autenticar',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nomeUsuario: userName,
            senha: userPassword,
          }),
        }
      );

      if (!response.ok) {
        handleShowNotification(true);
        return;
      }

      localStorage.setItem('isAuthenticated', 'true'); // Armazena autenticação no localStorage
      handleShowNotification(false);

      setTimeout(() => {
        router.push('/medicines');
      }, 1000);
    } catch (error) {
      console.error('Erro de autenticação:', error);
      handleShowNotification(true);
    }
  };

  return (
    <section className={styles.register__container}>
      <div className={styles.register__logo_container}>
        <Image
          src='/imgs/logo.png'
          height={100}
          width={100}
          unoptimized
          alt='Logo da Farmácia saúde'
        />
      </div>
      <div className={styles.register__form_container}>
        <form onSubmit={handleFormSubmit}>
          <h2>Entrar</h2>
          <FormControl className={styles.register__input} variant='filled'>
            <InputLabel htmlFor='filled-adornment-username'>
              Nome de usuário
            </InputLabel>
            <FilledInput
              value={userName}
              onChange={handleUserName}
              id='filled-adornment-username'
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
          <button className={styles.register__submit_button} type='submit'>
            Entrar
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
                ? 'Erro! Nome de usuário ou senha incorretos'
                : 'Sucesso! Redirecionando para a página de produtos...'}
            </Alert>
          </Snackbar>
        </form>
      </div>
    </section>
  );
}
