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

export default function Register() {
  const [userName, setUserName] = useState<string>('');
  const handleUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    if (newValue) setUserName(newValue);
  };

  const [userPassword, setUserPassword] = useState<string>('');
  const handleUserPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    if (newValue) setUserPassword(newValue);
  };

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [showNotification, setShowNotification] = useState<boolean>(false);
  const handleShowNotification = () => {
    setShowNotification(true);
  }
  const handleHideNotification = () => {
    setShowNotification(false);
  }

  const [hasError, setHasError] = useState<boolean>(false);
  const handleHasError = () => {
    setHasError(true);
  }
  const handleHasNotError = () => {
    setHasError(false);
  }

  const handleFormSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (userName === null || userName === '' ||
         userPassword === null || userPassword === '') {
        throw new Error('User must contain name and password');
      } else {
        const useData = {
          username: userName,
          password: userPassword,
        };

        console.log(useData);
        handleHasNotError();
        handleShowNotification();
        clearForm();
      }
    } catch {
      handleHasError();
      handleShowNotification();
    }
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
          <Snackbar open={showNotification} autoHideDuration={5000} onClose={handleHideNotification}>
            <Alert
              onClose={handleHideNotification}
              severity={hasError ? 'error' : 'success'}
              variant='filled'
            >
              {hasError ? 'Erro! Não foi possível criar o usuário' : 'Sucesso! Usuário criado'}
            </Alert>
          </Snackbar>
        </form>
      </div>
    </section>
  );
}
