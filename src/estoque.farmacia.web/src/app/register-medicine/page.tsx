'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './page.module.scss';
import { faFileArrowUp, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { TextField, MenuItem, Button, Alert, Snackbar } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Image from 'next/image';
import { IFornecedor } from '@/utils/interfaces/IFornecedor';
import { ILote } from '@/utils/interfaces/ILote';
import { IMedicamento } from '@/utils/interfaces/IMedicamento';
import { useRouter } from 'next/navigation';

export default function RegisterMedicine() {
  const [nameInput, setNameInput] = useState<string>('');
  const [batchInput, setBatchInput] = useState<string>('');
  const [activeBatch, setActiveBatch] = useState<ILote | null>(null);
  const [batches, setBatches] = useState<ILote[]>([]);
  const [manufacturerInput, setManufacturerInput] = useState<string>('');
  const [manufactures, setManufactures] = useState<IFornecedor[]>([]);
  const [validityInput, setValidityInput] = useState<Dayjs | null>(null);
  const [imageInput, setImageInput] = useState<File | null>(null);
  const [base64Image, setBase64Image] = useState<string>('');
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus) {
      loadBatches();
      loadManufactures();
    } else {
      router.push('/login');
    }
  }, []);

  const loadBatches = () => {
    fetch('https://localhost:7208/api/Lotes', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data: ILote[]) =>
        data.filter((item) => item.medicamentoId === null)
      )
      .then((batches) => setBatches(batches));
  };

  const loadManufactures = () => {
    fetch('https://localhost:7208/api/Fornecedores', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => setManufactures(data));
  };

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
      const currBatch = batches.find((item) => item.id === Number(newValue));
      if (currBatch) {
        setActiveBatch(currBatch);
        setValidityInput(dayjs(currBatch?.dataValidade));
      }
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

    if (newValue) {
      setImageInput(newValue);
      convertFileToBase64(newValue)
        .then((base64) => {
          setBase64Image(base64);
        })
        .catch((error) => {
          console.error('Error converting file to base64:', error);
        });
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result
          ? (reader.result as string).split(',')[1]
          : '';
        resolve(base64String);
      };
      reader.onerror = () => {
        reject(new Error('Error reading file'));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('NomeComercial', nameInput);
    formData.append('PrecoCusto', '0');
    formData.append('PrecoVenda', '0');
    formData.append('FornecedorId', String(manufacturerInput));

    if (imageInput) {
      formData.append('imagem', base64Image);
    }

    const newMedicineRes = await fetch(
      'https://localhost:7208/api/Medicamentos',
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!newMedicineRes.ok) {
      setHasError(true);
      setShowNotification(true);
      throw new Error('Failed to POST new medicine');
    } else {
      const newMedicine: IMedicamento = await newMedicineRes.json();

      const newBatchData = {
        dataFabricacao: activeBatch?.dataFabricacao,
        dataValidade: activeBatch?.dataValidade,
        entradas: null,
        id: activeBatch?.id,
        medicamento: null,
        medicamentoId: newMedicine.id,
        quantidade: activeBatch?.quantidade,
        saidas: null,
      };

      const updateBatchRes = await fetch(
        `https://localhost:7208/api/Lotes/${activeBatch?.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newBatchData),
        }
      );
      if (!updateBatchRes.ok) {
        setHasError(true);
        setShowNotification(true);
        throw new Error('Failed to update Lote with new medicamentoId');
      } else {
        setHasError(false);
        setShowNotification(true);
        loadBatches();
        clearForm();
      }
    }
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
        </div>
        <div className={styles.register_medicine__content}>
          <div className={styles.register_medicine__medicine_preview}>
            {imageInput ? (
              <div className={styles.register_medicine__image_picker_container}>
                <Image
                  src={URL.createObjectURL(imageInput)}
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
                  <input
                    type='file'
                    onChange={handleImageInput}
                    style={{ display: 'none' }}
                    accept='image/*'
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
                <p>Fornecedor: </p>
                {manufacturerInput ? (
                  <p>{manufacturerInput}</p>
                ) : (
                  <p className={styles.no_value}>Selecione um fornecedor</p>
                )}
              </div>
              <div
                className={
                  styles.register_medicine__medicine_preview_info_container
                }
              >
                <p>Validade: </p>
                {validityInput ? (
                  <p>{validityInput?.format('L')}</p>
                ) : (
                  <p className={styles.no_value}>Relacionada ao lote</p>
                )}
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
              disabled={batches.length <= 0}
              helperText={batches.length <= 0 && 'Nenhum lote disponível'}
              label='Lote'
            >
              {batches.map((item, index) => (
                <MenuItem value={item.id} key={index}>
                  Lote {item.id}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              value={manufacturerInput}
              onChange={handleManufacturerInput}
              label='Fornecedor'
            >
              {manufactures.map((item, index) => (
                <MenuItem value={item.id} key={index}>
                  {item.nomeFantasia}
                </MenuItem>
              ))}
            </TextField>
            <DatePicker
              disabled
              label='Data de validade'
              value={validityInput}
            />
            <button
              disabled={
                !nameInput ||
                nameInput === '' ||
                !batchInput ||
                !manufacturerInput
              }
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
