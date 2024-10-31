'use client';

import styles from './page.module.scss';
import { IFornecedor } from '@/utils/interfaces/IFornecedor';
import { ILote } from '@/utils/interfaces/ILote';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface RouteParams {
  startDate: string;
  endDate: string;
}

export default function PrintReport() {
  dayjs.extend(isBetween);
  const { startDate, endDate } = useParams() as unknown as RouteParams;
  const [startDateState, setStartDateState] = useState<Dayjs | null>(null);
  const [endDateState, setEndDateState] = useState<Dayjs | null>(null);
  const [batches, setBatches] = useState<ILote[]>([]);
  const [manufactures, setManufactures] = useState<IFornecedor[]>([]);
  const [batchesLoaded, setBatchesLoaded] = useState<boolean>(false);
  const [manufacturesLoaded, setManufacturesLoaded] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus) {
      setStartDateState(dayjs(startDate).startOf('day'));
      setEndDateState(dayjs(endDate).endOf('day'));
      loadBatches();
      loadManufactures();
    } else {
      router.push('/login');
    }
  }, []);

  useEffect(() => {
    if (batchesLoaded === true && manufacturesLoaded === true) {
      window.print();
    }
  }, [batchesLoaded, manufacturesLoaded]);

  const loadBatches = () => {
    fetch(
      `https://${process.env.NEXT_PUBLIC_API_ENDPOINT}:${process.env.NEXT_PUBLIC_PORT}/api/Lotes`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
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
        setBatchesLoaded(true);
      });
  };

  const loadManufactures = () => {
    fetch(
      `https://${process.env.NEXT_PUBLIC_API_ENDPOINT}:${process.env.NEXT_PUBLIC_PORT}/api/Fornecedores`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then((data: IFornecedor[]) => {
        setManufactures(data);
        setManufacturesLoaded(true);
      });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <section className={styles.print_report__container}>
        <h1>Relatório Lotes</h1>
        <h2>
          {startDateState?.format('L')} - {endDateState?.format('L')}
        </h2>
        <div className={styles.print_report__list}>
          {batches &&
            batches.map((batch, index) => (
              <div className={styles.print_report__list_item} key={index}>
                {batch.medicamento?.imagem ? (
                  <Image
                    src={`data:image/jpeg;base64,${batch.medicamento?.imagem}`}
                    height={0}
                    width={0}
                    unoptimized
                    alt={`Imagem do medicamento ${batch.medicamento?.nomeComercial}`}
                  />
                ) : (
                  <div className={styles.print_report__list_item_no_image}>
                    <FontAwesomeIcon icon={faImage} />
                    <p>Sem imagem</p>
                  </div>
                )}
                <div className={styles.print_report__list_item_info}>
                  <div className={styles.print_report__list_item_info_block}>
                    <p>Nome do medicamento:</p>
                    <p>{batch.medicamento?.nomeComercial}</p>
                  </div>
                  <div className={styles.print_report__list_item_info_block}>
                    <p>Lote:</p>
                    <p>{batch.id}</p>
                  </div>
                  <div className={styles.print_report__list_item_info_block}>
                    <p>Fornecedor:</p>
                    <p>
                      {batch.medicamento?.fornecedorId
                        ? manufactures.find(
                            (item) =>
                              item.id === batch.medicamento?.fornecedorId
                          )?.nomeFantasia
                        : 'Fornecedor não encontrado'}
                    </p>
                  </div>
                  <div className={styles.print_report__list_item_info_block}>
                    <p>Validade:</p>
                    <p>{dayjs(batch.dataValidade).format('L')}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
    </LocalizationProvider>
  );
}
