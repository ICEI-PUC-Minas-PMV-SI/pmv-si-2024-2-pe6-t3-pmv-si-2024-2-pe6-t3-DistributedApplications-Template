'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './page.module.scss';
import {
  faFileArrowUp,
  faSave,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
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
import { IFornecedor } from '@/utils/interfaces/IFornecedor';
import { ILote } from '@/utils/interfaces/ILote';
import { IMedicamento } from '@/utils/interfaces/IMedicamento';

export default function RegisterMedicine() {
  const [nameInput, setNameInput] = useState<string>('');
  const [batchInput, setBatchInput] = useState<string>('');
  const [batches, setBatches] = useState<ILote[]>([]);
  const [manufacturerInput, setManufacturerInput] = useState<string>('');
  const [manufactures, setManufactures] = useState<IFornecedor[]>([]);
  const [validityInput, setValidityInput] = useState<Dayjs | null>(dayjs());
  const [imageInput, setImageInput] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    fetch('https://localhost:7208/api/Lotes', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => setBatches(data));

    fetch('https://localhost:7208/api/Fornecedores', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => setManufactures(data));
  }, []);

  const handleNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (newValue) {
      setNameInput(newValue);
    }
  };

  const handleBatchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (newValue) {
      setBatchInput(newValue);
    }
  };

  const handleManufacturerInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = event.target.value;
    if (newValue) {
      setManufacturerInput(newValue);
    }
  };

  const handleImageInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.files?.[0];
    if (newValue) setImageInput(URL.createObjectURL(newValue));
  };

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newMedicine: IMedicamento = {
      nomeComercial: nameInput,
      fornecedorId: Number(manufacturerInput),
      precoCusto: 0,
      precoVenda: 0,
    };

    const newMedicineRes = await fetch(
      'https://localhost:7208/api/Medicamentos',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMedicine),
      }
    );

    if (!newMedicineRes.ok) {
      setHasError(true);
      setShowNotification(true);
      throw new Error('Failed to POST new medicine');
    } else {
      setHasError(false);
      setShowNotification(true);
      clearForm();
    }
  };

  const clearForm = () => {
    setNameInput('');
    setBatchInput('');
    setManufacturerInput('');
    setValidityInput(dayjs());
    setImageInput(null);
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
            onSubmit={handleSubmit}
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
              {batches.map((item, index) => (
                <MenuItem value={item.id} key={index}>
                  {item.id}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              value={manufacturerInput}
              onChange={handleManufacturerInput}
              label='Fabricante'
            >
              {manufactures.map((item, index) => (
                <MenuItem value={item.id} key={index}>
                  {item.nomeFantasia}
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
              autoHideDuration={6000}
              onClose={() => setShowNotification(false)}
            >
              <Alert
                onClose={() => setShowNotification(false)}
                severity={hasError ? 'error' : 'success'}
                variant='filled'
                sx={{ width: '100%' }}
              >
                {hasError
                  ? 'Algo deu errado! Não foi possivel cadastrar um novo medicamento'
                  : 'Sucesso! Novo medicamento cadastrado'}
              </Alert>
            </Snackbar>
          </form>
        </div>
      </section>
    </LocalizationProvider>
  );
}
