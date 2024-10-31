'use client';

import { IEntrada } from '@/utils/interfaces/IEntrada';
import styles from './page.module.scss';
import { IFornecedor } from '@/utils/interfaces/IFornecedor';
import { ILote } from '@/utils/interfaces/ILote';
import {
  faAnglesDown,
  faAnglesUp,
  faChevronDown,
  faImage,
  faSave,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { ISaida } from '@/utils/interfaces/ISaida';
import Link from 'next/link';

interface BatchRouteParams {
  batchId: string;
}

interface UpdateBatchProps {
  type: BatchType;
  data: IEntrada | ISaida;
  quantidade: number;
}

enum BatchType {
  ENTRADA,
  SAIDA,
}

export default function Batch() {
  const { batchId } = useParams() as unknown as BatchRouteParams;
  const [batch, setBatch] = useState<ILote | null>(null);
  const [manufacturer, setManufacturer] = useState<IFornecedor | null>(null);
  const [entradas, setEntradas] = useState<number>(0);
  const [saidas, setSaidas] = useState<number>(0);
  const [saidasError, setSaidasError] = useState<boolean>(false);
  const [updateBatchObj, setUpdateBatchObj] = useState<UpdateBatchProps | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus) {
      loadBatch();
    } else {
      router.push('/login');
    }
  }, []);

  useEffect(() => {
    if (updateBatchObj && updateBatchObj?.type === 0) {
      updateBatch({
        newEntrada: updateBatchObj.data as IEntrada,
        quantidade: updateBatchObj.quantidade,
      });
    } else if (updateBatchObj && updateBatchObj.type === 1) {
      updateBatch({
        newSaida: updateBatchObj.data as ISaida,
        quantidade: updateBatchObj.quantidade,
      });
    }
  }, [updateBatchObj]);

  const loadBatch = () => {
    fetch(
      `https://${process.env.NEXT_PUBLIC_API_ENDPOINT}:${process.env.NEXT_PUBLIC_PORT}/api/Lotes/${batchId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then((batch: ILote) => {
        setBatch(batch);
        if (batch.medicamento?.fornecedorId) {
          loadManufacturer(batch.medicamento?.fornecedorId);
        } else {
          console.error('Could not found manufacturer id');
        }
      });
  };

  const loadManufacturer = (id: number) => {
    fetch(
      `https://${process.env.NEXT_PUBLIC_API_ENDPOINT}:${process.env.NEXT_PUBLIC_PORT}/api/Fornecedores/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then((manufacturer: IFornecedor) => setManufacturer(manufacturer));
  };

  const handleEntradas = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setEntradas(newValue);
  };

  const handleSaidas = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    if (batch?.quantidade && newValue > batch?.quantidade) {
      setSaidasError(true);
    } else {
      setSaidasError(false);
    }
    setSaidas(newValue);
  };

  const addNewEntrada = () => {
    const newEntrada: IEntrada = {
      loteId: Number(batchId),
      quantidadeRecebida: entradas,
      dataEntrada: dayjs().toDate(),
    };

    let quantidade = batch?.quantidade;
    if (!quantidade) {
      quantidade = entradas;
    } else {
      quantidade += entradas;
    }

    fetch(
      `https://${process.env.NEXT_PUBLIC_API_ENDPOINT}:${process.env.NEXT_PUBLIC_PORT}/api/Entradas`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEntrada),
      }
    )
      .then((res) => res.json())
      .then((newEntrada: IEntrada) => {
        setUpdateBatchObj({
          type: BatchType.ENTRADA,
          data: newEntrada,
          quantidade: quantidade,
        });
      });
  };

  const addNewSaida = () => {
    const newSaida: ISaida = {
      loteId: Number(batchId),
      quantidadeSaida: saidas,
      dataSaida: dayjs().toDate(),
    };

    let quantidade = batch?.quantidade;
    if (!quantidade) {
      quantidade = saidas;
    } else {
      quantidade -= saidas;
    }

    fetch(
      `https://${process.env.NEXT_PUBLIC_API_ENDPOINT}:${process.env.NEXT_PUBLIC_PORT}/api/Saidas`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSaida),
      }
    )
      .then((res) => res.json())
      .then((newSaida: ISaida) => {
        setUpdateBatchObj({
          type: BatchType.SAIDA,
          data: newSaida,
          quantidade: quantidade,
        });
      });
  };

  interface updateBatchParams {
    newEntrada?: IEntrada;
    newSaida?: ISaida;
    quantidade: number;
  }

  const updateBatch = async (params: updateBatchParams) => {
    console.log(params);

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
        quantidade: params.quantidade,
        saidas: newSaidas,
      };

      const updateBatchRes = await fetch(
        `https://${process.env.NEXT_PUBLIC_API_ENDPOINT}:${process.env.NEXT_PUBLIC_PORT}/api/Lotes/${batchId}`,
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
          <Link
            href={`/print-batch/${batchId}`}
            rel='noopener noreferrer'
            target='_blank'
          >
            <button>
              <FontAwesomeIcon icon={faSave} />
              Imprimir
            </button>
          </Link>
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
                <div className={styles.batch__preview_no_image}>
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
              <h4>{batch?.quantidade}</h4>
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
                className={styles.batch__preview_info_block_input}
              />
              <button onClick={addNewEntrada} disabled={!entradas}>
                Adicionar
              </button>
            </div>
            <div className={styles.batch__controls_block}>
              <TextField
                value={saidas}
                onInput={handleSaidas}
                disabled={batch?.quantidade === 0}
                error={saidasError}
                helperText={
                  saidasError
                    ? 'A quantidade de retirada não pode exceder a quantidade em estoque'
                    : ''
                }
                label='Saídas'
                variant='outlined'
                type='number'
                InputProps={{ inputProps: { min: 0 } }}
                className={styles.batch__preview_info_block_input}
              />
              <button
                onClick={addNewSaida}
                disabled={!saidas || saidasError || batch?.quantidade === 0}
              >
                Remover
              </button>
            </div>
          </div>
        </div>
        <div className={styles.batch__data_container}>
          <Accordion className={styles.batch__data_block} defaultExpanded>
            <AccordionSummary
              expandIcon={<FontAwesomeIcon icon={faChevronDown} />}
              aria-controls='panel1-content'
              id='panel1-header'
            >
              <h4>Entradas</h4>
            </AccordionSummary>
            <AccordionDetails className={styles.batch__data_block_list}>
              {batch?.entradas ? (
                batch.entradas.map((entrada, index) => (
                  <div className={styles.batch__data_item} key={index}>
                    <p className={styles.entrada}>
                      <FontAwesomeIcon icon={faAnglesDown} />
                      Quantidade: {entrada.quantidadeRecebida}
                    </p>
                    <p>{dayjs(entrada.dataEntrada).format(`L`)}</p>
                  </div>
                ))
              ) : (
                <p className={styles.no_item_block}>
                  Nenhuma entrada cadastrada
                </p>
              )}
            </AccordionDetails>
          </Accordion>
          <Accordion className={styles.batch__data_block} defaultExpanded>
            <AccordionSummary
              expandIcon={<FontAwesomeIcon icon={faChevronDown} />}
              aria-controls='panel2-content'
              id='panel2-header'
            >
              <h4>Saídas</h4>
            </AccordionSummary>
            <AccordionDetails className={styles.batch__data_block_list}>
              {batch?.saidas ? (
                batch.saidas.map((saida, index) => (
                  <div className={styles.batch__data_item} key={index}>
                    <p className={styles.saida}>
                      <FontAwesomeIcon icon={faAnglesUp} />
                      Quantidade: {saida.quantidadeSaida}
                    </p>
                    <p>{dayjs(saida.dataSaida).format(`L`)}</p>
                  </div>
                ))
              ) : (
                <p className={styles.no_item_block}>Nenhuma saída cadastrada</p>
              )}
            </AccordionDetails>
          </Accordion>
        </div>
      </section>
    </LocalizationProvider>
  );
}
