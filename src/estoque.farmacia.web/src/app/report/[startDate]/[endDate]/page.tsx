'use client';

import styles from './page.module.scss';
import { ILote } from '@/utils/interfaces/ILote';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import isBetween from 'dayjs/plugin/isBetween';
import dayjs, { Dayjs } from 'dayjs';
import { TextField } from '@mui/material';
import Image from 'next/image';
import { IFornecedor } from '@/utils/interfaces/IFornecedor';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUpRightFromSquare,
  faImage,
  faPenToSquare,
  faPrint,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import classNames from 'classnames';

interface RouteParams {
  startDate: string;
  endDate: string;
}

export default function Report() {
  dayjs.extend(isBetween);
  const { startDate, endDate } = useParams() as unknown as RouteParams;
  const [startDateState, setStartDateState] = useState<Dayjs | null>(null);
  const [endDateState, setEndDateState] = useState<Dayjs | null>(null);
  const [batches, setBatches] = useState<ILote[]>([]);
  const [initialBatches, setInitialBatches] = useState<ILote[]>([]);
  const [entradas, setEntradas] = useState<number>(0);
  const [saidas, setSaidas] = useState<number>(0);
  const [manufactures, setManufactures] = useState<IFornecedor[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');

  useEffect(() => {
    setStartDateState(dayjs(startDate).startOf('day'));
    setEndDateState(dayjs(endDate).endOf('day'));

    loadBatches();
    loadManufactures();
  }, []);

  const loadBatches = () => {
    fetch('https://localhost:7208/api/Lotes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data: ILote[]) =>
        data.filter((item) =>
          dayjs(item.dataFabricacao).isBetween(
            startDateState,
            endDateState,
            'day',
            '[]'
          )
        )
      )
      .then((filteredData) => {
        setBatches(filteredData);
        setInitialBatches(filteredData);
        loadStats(batches);
      });
  };

  const loadManufactures = () => {
    fetch('https://localhost:7208/api/Fornecedores', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data: IFornecedor[]) => setManufactures(data));
  };

  const loadStats = (list: ILote[]) => {
    list.map((item) => {
      if (item.entradas) setEntradas(entradas + item.entradas.length);
      if (item.saidas) setSaidas(saidas + item.saidas.length);
    });
  };

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setSearchInput(value);

    if (!value) {
      setBatches(initialBatches);
    } else {
      filterList(value);
    }
  };

  const filterList = (text: string) => {
    const lowerText = text.toLowerCase();
    const newList = initialBatches.filter(
      (item) =>
        item.medicamento &&
        item.medicamento.nomeComercial.toLowerCase().indexOf(lowerText) > -1
    );

    setBatches(newList);
    loadStats(batches);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <section className={styles.report__container}>
        <div className={styles.report__header}>
          <div className={styles.report__header_title_container}>
            <h2>Relatório</h2>
            <button className={styles.save_button}>
              <FontAwesomeIcon icon={faPrint} />
              Imprimir
            </button>
            <Link href='/get-report'>
              <button className={styles.back_button}>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                Gerar outro delatório
              </button>
            </Link>
          </div>
          <div className={styles.report__header_stats}>
            <TextField
              value={searchInput}
              onInput={handleSearchInput}
              className={styles.report__header_search}
              id='outlined-basic'
              label='Pesquisar'
              variant='outlined'
            />
            <div className={styles.report__header_stats_item}>
              <h3>Total</h3>
              <p>{batches ? batches.length : 0}</p>
            </div>
            <div className={styles.report__header_stats_item}>
              <h3>Entradas</h3>
              <p>{entradas}</p>
            </div>
            <div className={styles.report__header_stats_item}>
              <h3>Saidas</h3>
              <p>{saidas}</p>
            </div>
          </div>
        </div>
        <div className={styles.report__list}>
          {batches.length === 0 ? (
            <p className={styles.report__list_no_item}>
              Nenhum lote encontrado
            </p>
          ) : (
            batches.map((batch, index) => (
              <div className={styles.report__list_item} key={index}>
                {batch.medicamento?.imagem ? (
                  <Image
                    src={`data:image/jpeg;base64,${batch.medicamento?.imagem}`}
                    height={0}
                    width={0}
                    unoptimized
                    alt={
                      'Imagem do medicamento ' +
                      batch.medicamento?.nomeComercial
                    }
                  />
                ) : (
                  <div className={styles.reposrt__list_item_no_image}>
                    <FontAwesomeIcon icon={faImage} />
                    <p>Sem imagem</p>
                  </div>
                )}
                <div
                  className={classNames({
                    [styles.report__list_item_info]: true,
                    [styles.titles]: true,
                  })}
                >
                  <div className={styles.report__list_item_info_block}>
                    <p>Nome:</p>
                  </div>
                  <div className={styles.report__list_item_info_block}>
                    <p>Lote:</p>
                  </div>
                  <div className={styles.report__list_item_info_block}>
                    <p>Validade:</p>
                  </div>
                  <div className={styles.report__list_item_info_block}>
                    <p>Fornecedor:</p>
                  </div>
                </div>
                <div className={styles.report__list_item_info}>
                  <div className={styles.report__list_item_info_block}>
                    <p>{batch.medicamento?.nomeComercial}</p>
                  </div>
                  <div className={styles.report__list_item_info_block}>
                    <p>{batch.id}</p>
                  </div>
                  <div className={styles.report__list_item_info_block}>
                    <p>{dayjs(batch.dataValidade)?.format('L')}</p>
                  </div>
                  <div className={styles.report__list_item_info_block}>
                    <p>
                      {batch.medicamento?.fornecedorId
                        ? manufactures.find(
                            (item) =>
                              item.id === batch.medicamento?.fornecedorId
                          )?.nomeFantasia
                        : 'Fornecedor não encontrado'}
                    </p>
                  </div>
                </div>
                <div className={styles.report__list_item_stats}>
                  <div className={styles.report__list_item_stats_item}>
                    <h3>Quantidade</h3>
                    <p>{batch.quantidade || 0}</p>
                  </div>
                  <div className={styles.report__list_item_stats_item}>
                    <h3>Entradas</h3>
                    <p>{batch.entradas ? batch.entradas.length : 0}</p>
                  </div>
                  <div className={styles.report__list_item_stats_item}>
                    <h3>Saidas</h3>
                    <p>{batch.saidas ? batch.saidas.length : 0}</p>
                  </div>
                </div>
                <Link href={`/batch/${batch.id}`}>
                  <button>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                </Link>
              </div>
            ))
          )}
        </div>
      </section>
    </LocalizationProvider>
  );
}
