'use client';

import { IEntrada } from '@/utils/interfaces/IEntrada';
import styles from './page.module.scss';
import { IFornecedor } from '@/utils/interfaces/IFornecedor';
import { ILote } from '@/utils/interfaces/ILote';
import { faImage, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { ISaida } from '@/utils/interfaces/ISaida';

interface BatchRouteParams {
  batchId: string;
}

export default function Batch() {
  const { batchId } = useParams() as unknown as BatchRouteParams;
  const [batch, setBatch] = useState<ILote | null>(null);
  const [batchQuantity, setBatchQuantity] = useState<number>(0);
  const [manufacturer, setManufacturer] = useState<IFornecedor | null>(null);
  const [entradas, setEntradas] = useState<number>(0);
  const [saidas, setSaidas] = useState<number>(0);

  useEffect(() => {
    loadBatch();
  }, []);

  const loadBatch = () => {
    fetch(`https://localhost:7208/api/Lotes/${batchId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((batch: ILote) => {
        setBatch(batch);
        setBatchQuantity(batch.quantidade);
        if (batch.medicamento?.fornecedorId) {
          loadManufacturer(batch.medicamento?.fornecedorId);
        } else {
          console.error('Could not found manufacturer id');
        }
      });
  };

  const loadManufacturer = (id: number) => {
    fetch(`https://localhost:7208/api/Fornecedores/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((manufacturer: IFornecedor) => setManufacturer(manufacturer));
  };

  const handleEntradas = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setEntradas(newValue);
  };

  const handleSaidas = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setSaidas(newValue);
  };

  const addNewEntrada = () => {
    const newEntrada: IEntrada = {
      loteId: Number(batchId),
      quantidadeRecebida: entradas,
      dataEntrada: dayjs().toDate(),
    };

    if (batch?.quantidade) {
      setBatchQuantity(batch.quantidade + entradas);
    } else {
      setBatchQuantity(entradas);
    }

    fetch('https://localhost:7208/api/Entradas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEntrada),
    })
      .then((res) => res.json())
      .then((newEntrada: IEntrada) => {
        console.log(batch);

        updateBatch({ newEntrada: newEntrada });
      });
  };

  const addNewSaida = () => {
    const newSaida: ISaida = {
      loteId: Number(batchId),
      quantidadeSaida: saidas,
      dataSaida: dayjs().toDate(),
    };

    fetch('https://localhost:7208/api/Saidas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newSaida),
    })
      .then((res) => res.json())
      .then((newSaida: ISaida) => {
        setBatch((prev) => {
          if (!prev) return null;
          return {
            dataFabricacao: prev.dataFabricacao,
            dataValidade: prev.dataValidade,
            entradas: prev.entradas,
            id: prev.id,
            medicamento: prev.medicamento,
            medicamentoId: prev.medicamentoId,
            quantidade: prev.quantidade - saidas,
            saidas: prev.saidas,
          };
        });
        updateBatch({ newSaida: newSaida });
      });
  };

  interface updateBatchParams {
    newEntrada?: IEntrada;
    newSaida?: ISaida;
  }

  const updateBatch = async (params: updateBatchParams) => {
    if (batch) {
      let newEntradas: IEntrada[] = [];
      if (batch.entradas) newEntradas = batch.entradas;
      if (params.newEntrada) newEntradas.push(params.newEntrada);

      let newSaidas: ISaida[] = [];
      if (batch.saidas) newSaidas = batch.saidas;
      if (params.newSaida) newSaidas.push(params.newSaida);

      const newBatch: ILote = {
        dataFabricacao: batch?.dataFabricacao,
        dataValidade: batch?.dataValidade,
        entradas: newEntradas,
        id: batch?.id,
        medicamento: batch.medicamento,
        medicamentoId: batch.medicamentoId,
        quantidade: batchQuantity,
        saidas: newSaidas,
      };

      const updateBatchRes = await fetch(
        `https://localhost:7208/api/Lotes/${batchId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newBatch),
        }
      );
      if (!updateBatchRes.ok) {
        throw new Error('Failed to update batch');
      } else {
        setBatch(newBatch);
        if (params.newEntrada) setEntradas(0);
        if (params.newSaida) setSaidas(0);
      }
    } else {
      throw new Error('Missing batch data');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <section className={styles.batch__container}>
        <div className={styles.batch__header}>
          <h2>Lote {batchId}</h2>
          <button>
            <FontAwesomeIcon icon={faSave} />
            Imprimir
          </button>
        </div>
        <div className={styles.batch__preview_container}>
          <h3>Medicamento</h3>
          <div className={styles.batch__preview_content}>
            <div className={styles.batch__preview}>
              {batch?.medicamento?.imagem ? (
                <Image
                  src={`data:image/jpeg;base64,${batch.medicamento?.imagem}`}
                  height={0}
                  width={0}
                  unoptimized
                  alt={'Imagem da medicamento '}
                />
              ) : (
                <div>
                  <FontAwesomeIcon icon={faImage} />
                  <p>Sem imagem</p>
                </div>
              )}
              <div className={styles.batch__preview_info}>
                <div className={styles.batch__preview_info_block}>
                  <p>Nome:</p>
                  <p>Lote:</p>
                  <p>Validade:</p>
                  <p>Fornecedor</p>
                </div>
                <div className={styles.batch__preview_info_block}>
                  <p>{batch?.medicamento?.nomeComercial}</p>
                  <p>{batch?.id}</p>
                  <p>{dayjs(batch?.dataValidade).format('L')}</p>
                  <p>{manufacturer?.nomeFantasia}</p>
                </div>
              </div>
            </div>
            <div className={styles.batch__preview_quantity}>
              <p>Quantidade em estoque</p>
              <h4>{batchQuantity}</h4>
            </div>
          </div>
        </div>
        <div className={styles.batch__controls_container}>
          <p>
            Gerencie o estoque do lote adicionando ou removendo uma quantidade
            de medicamentos
          </p>
          <div className={styles.batch__controls}>
            <div className={styles.batch__controls_block}>
              <TextField
                value={entradas}
                onInput={handleEntradas}
                label='Entradas'
                variant='outlined'
                type='number'
                InputProps={{ inputProps: { min: 0 } }}
              />
              <button onClick={addNewEntrada} disabled={!entradas}>
                Adicionar
              </button>
            </div>
            <div className={styles.batch__controls_block}>
              <TextField
                value={saidas}
                onInput={handleSaidas}
                label='Saídas'
                variant='outlined'
                type='number'
                InputProps={{ inputProps: { min: 0 } }}
              />
              <button onClick={addNewSaida} disabled={!saidas}>
                Remover
              </button>
            </div>
          </div>
        </div>
      </section>
    </LocalizationProvider>
  );
}
