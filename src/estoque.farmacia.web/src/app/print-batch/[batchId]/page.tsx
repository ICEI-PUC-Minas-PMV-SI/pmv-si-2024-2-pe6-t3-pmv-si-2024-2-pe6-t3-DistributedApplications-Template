'use client';

import styles from './page.module.scss';
import { IFornecedor } from '@/utils/interfaces/IFornecedor';
import { ILote } from '@/utils/interfaces/ILote';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

interface BatchRouteParams {
  batchId: string;
}

export default function PrintBatch() {
  const { batchId } = useParams() as unknown as BatchRouteParams;
  const [batch, setBatch] = useState<ILote | null>(null);
  const [manufacturer, setManufacturer] = useState<IFornecedor | null>(null);
  const [batchLoaded, setBatchLoaded] = useState<boolean>(false);
  const [manufacturerLoaded, setManufacturerLoaded] = useState<boolean>(false);
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
    if (batchLoaded === true && manufacturerLoaded === true) {
      window.print();
    }
  }, [batchLoaded, manufacturerLoaded]);

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
        setBatchLoaded(true);

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
      .then((manufacturer: IFornecedor) => {
        setManufacturer(manufacturer);
        setManufacturerLoaded(true);
      });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <section className={styles.print_batch__container}>
        <h1>Lote {batchId}</h1>
        <div className={styles.print_batch__batch}>
          {batch?.medicamento?.imagem ? (
            <Image
              src={`data:image/jpeg;base64,${batch.medicamento?.imagem}`}
              height={0}
              width={0}
              unoptimized
              alt={'Imagem da medicamento '}
            />
          ) : (
            <div className={styles.print_batch__batch_no_image}>
              <FontAwesomeIcon icon={faImage} />
              <p>Sem imagem</p>
            </div>
          )}
          <div className={styles.print_batch__batch_info}>
            <div className={styles.print_batch__batch_info_block}>
              <p>Nome do medicamento:</p>
              <p>{batch?.medicamento?.nomeComercial}</p>
            </div>
            <div className={styles.print_batch__batch_info_block}>
              <p>Lote:</p>
              <p>{batch?.id}</p>
            </div>
            <div className={styles.print_batch__batch_info_block}>
              <p>Validade:</p>
              <p>{dayjs(batch?.dataValidade).format('L')}</p>
            </div>
            <div className={styles.print_batch__batch_info_block}>
              <p>Fornecedor:</p>
              <p>{manufacturer?.nomeFantasia}</p>
            </div>
          </div>
          <div className={styles.print_batch__batch_info_quantity}>
            <p>Quantidade</p>
            <p>{batch?.quantidade}</p>
          </div>
        </div>
        <div className={styles.print_batch__entradas_saidas_container}>
          <div className={styles.print_batch__entradas}>
            <h2>Entradas</h2>
            {batch?.entradas && batch?.entradas.length > 0 ? (
              batch.entradas.map((entrada, index) => (
                <div className={styles.print_batch__entradas_item} key={index}>
                  <div className={styles.print_batch__entradas_item_quantity}>
                    <p>Quantidade recebida:</p>
                    <p>{entrada.quantidadeRecebida}</p>
                  </div>
                  <p>{dayjs(entrada.dataEntrada).format('L')}</p>
                </div>
              ))
            ) : (
              <div>
                <p>Nenhuma entrada cadastrada</p>
              </div>
            )}
          </div>
          <div className={styles.print_batch__saidas}>
            <h2>Saídas</h2>
            {batch?.saidas && batch?.saidas.length > 0 ? (
              batch.saidas.map((saida, index) => (
                <div className={styles.print_batch__saidas_item} key={index}>
                  <div className={styles.print_batch__saidas_item_quantity}>
                    <p>Quantidade retirada:</p>
                    <p>{saida.quantidadeSaida}</p>
                  </div>
                  <p>{dayjs(saida.dataSaida).format('L')}</p>
                </div>
              ))
            ) : (
              <div>
                <p>Nenhuma saida cadastrada</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </LocalizationProvider>
  );
}
