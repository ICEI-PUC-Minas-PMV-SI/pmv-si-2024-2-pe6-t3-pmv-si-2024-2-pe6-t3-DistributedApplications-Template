'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './page.module.scss';
import {
  faFileArrowUp,
  faSave,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import {
  TextField,
  MenuItem,
  Button,
  styled,
  Alert,
  Snackbar,
} from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Image from 'next/image';
import { IMedicine } from '@/utils/interfaces/IMedicine';
import { v4 as uuidv4 } from 'uuid';

export default function RegisterMedicine() {
  const [nameInput, setNameInput] = useState<string>('');
  const handleNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (newValue) {
      setNameInput(newValue);
    }
  };

  const [batchInput, setBatchInput] = useState<string>('');
  const handleBatchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (newValue) {
      setBatchInput(newValue);
    }
  };
  const batchMock: string[] = [
    'b398b3ed-f602-4fb5-8fe8-4c8cd1ce3bfd',
    '87c2a1c1-5dc1-4f07-925d-8b17a0b0be1d',
    '8b82bd8c-2b09-4a52-b14f-c36803b8d43c',
  ];

  const [manufacturerInput, setManufacturerInput] = useState<string>('');
  const handleManufacturerInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = event.target.value;
    if (newValue) {
      setManufacturerInput(newValue);
    }
  };
  const manufacturerMock: string[] = [
    '7e7c0109-b6e3-44af-8bd3-105167003c5a',
    'd8e686a7-3e64-4eeb-adf9-edfa85856d60',
    'd640c574-e45a-4c99-bed2-3eadc3d57108',
  ];

  const [validityInput, setValidityInput] = useState<Dayjs | null>(dayjs());

  const [imageInput, setImageInput] = useState<string | null>(null);
  const handleImageInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.files?.[0];
    if (newValue) setImageInput(URL.createObjectURL(newValue));
  };

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const submitNewMedicine = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      nameInput &&
      batchInput &&
      manufacturerInput &&
      validityInput &&
      validityInput
    ) {
      const newMedicineData: IMedicine = {
        id: uuidv4(),
        name: nameInput,
        batchId: batchInput,
        manufacturerId: manufacturerInput,
        validity: validityInput,
        image: imageInput,
      };
      console.log(newMedicineData);

      clearForm();
    } else {
      setHasError(true);
    }

    setShowNotification(true);
  };

  const clearForm = () => {
    setNameInput('');
    setBatchInput('');
    setManufacturerInput('');
    setValidityInput(null);
    setImageInput(null);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <section className={styles.register_medicine__container}>
        <div className={styles.register_medicine__header}>
          <h2>Cadastrar um novo medicamento</h2>
          <button>
            <FontAwesomeIcon icon={faSave} />
          </button>
        </div>
        <div className={styles.register_medicine__content}>
          <div className={styles.register_medicine__medicine_preview}>
            {imageInput ? (
              <div className={styles.register_medicine__image_picker_container}>
                <Image
                  src={imageInput}
                  height={0}
                  width={0}
                  unoptimized
                  alt={'Imagem do medicamento: ' + nameInput}
                />
                <Button
                  onClick={() => setImageInput(null)}
                  variant='contained'
                  color='error'
                  endIcon={<FontAwesomeIcon icon={faTrashCan} />}
                >
                  Remover
                </Button>
              </div>
            ) : (
              <div className={styles.register_medicine__image_picker_container}>
                <Button
                  component='label'
                  role={undefined}
                  variant='contained'
                  tabIndex={-1}
                  startIcon={<FontAwesomeIcon icon={faFileArrowUp} />}
                >
                  Foto
                  <VisuallyHiddenInput
                    type='file'
                    onChange={handleImageInput}
                    multiple
                  />
                </Button>
              </div>
            )}
            <div className={styles.register_medicine__medicine_preview_info}>
              <div
                className={
                  styles.register_medicine__medicine_preview_info_container
                }
              >
                <p>Nome: </p>
                {nameInput ? (
                  <p>{nameInput}</p>
                ) : (
                  <p className={styles.no_value}>Digite um nome</p>
                )}
              </div>
              <div
                className={
                  styles.register_medicine__medicine_preview_info_container
                }
              >
                <p>Lote: </p>
                {batchInput ? (
                  <p>{batchInput}</p>
                ) : (
                  <p className={styles.no_value}>Selecione um lote</p>
                )}
              </div>
              <div
                className={
                  styles.register_medicine__medicine_preview_info_container
                }
              >
                <p>Fabricante: </p>
                {manufacturerInput ? (
                  <p>{manufacturerInput}</p>
                ) : (
                  <p className={styles.no_value}>Selecione um fabricante</p>
                )}
              </div>
              <div
                className={
                  styles.register_medicine__medicine_preview_info_container
                }
              >
                <p>Validade: </p>
                {validityInput && <p>{validityInput?.format('L')}</p>}
              </div>
            </div>
          </div>
          <form
            onSubmit={submitNewMedicine}
            className={styles.register_medicine__medicine_form}
          >
            <TextField
              value={nameInput}
              onChange={handleNameInput}
              label='Nome do medicamento'
              variant='outlined'
            />
            <TextField
              select
              value={batchInput}
              onChange={handleBatchInput}
              label='Lote'
            >
              {batchMock.map((item, index) => (
                <MenuItem value={item} key={index}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              value={manufacturerInput}
              onChange={handleManufacturerInput}
              label='Fabricante'
            >
              {manufacturerMock.map((item, index) => (
                <MenuItem value={item} key={index}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
            <DatePicker
              label='Controlled picker'
              value={validityInput}
              onChange={(newValue: Dayjs | null) => setValidityInput(newValue)}
            />
            <button
              className={styles.register_medicine__medicine_form_submit_button}
            >
              Cadastrar
            </button>
            <Snackbar
              open={showNotification}
              autoHideDuration={5000}
              onClose={() => setShowNotification(false)}
            >
              <Alert
                onClose={() => setShowNotification(false)}
                severity={hasError ? 'error' : 'success'}
                variant='filled'
              >
                {hasError
                  ? 'Erro! Não foi possível cadastrar um novo medicamento'
                  : 'Sucesso! Medicamento cadastrado'}
              </Alert>
            </Snackbar>
          </form>
        </div>
      </section>
    </LocalizationProvider>
  );
}
