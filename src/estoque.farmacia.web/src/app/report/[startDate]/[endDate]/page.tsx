'use client';

import { ILote } from '@/utils/interfaces/ILote';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import isBetween from 'dayjs/plugin/isBetween';
import dayjs, { Dayjs } from 'dayjs';
import { TextField } from '@mui/material';
import Image from 'next/image';
import { IFornecedor } from '@/utils/interfaces/IFornecedor';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

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
  const [manufactures, setManufactures] = useState<IFornecedor[]>([]);

  useEffect(() => {
    setStartDateState(dayjs(startDate));
    setEndDateState(dayjs(endDate));

    fetch('https://localhost:7208/api/Lotes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data: ILote[]) =>
        data.filter((item) =>
          dayjs(item.dataFabricacao).isBetween(startDateState, endDateState)
        )
      )
      .then((filteredData) => {
        console.log(filteredData);
        setBatches(filteredData);
      });

    fetch('https://localhost:7208/api/Fornecedores', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data: IFornecedor[]) => setManufactures(data));
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <section>
        <div>
          <h2>Relatório</h2>
          <TextField id='outlined-basic' label='Outlined' variant='outlined' />
          <div>
            <div>
              <h3>Total</h3>
              <p>10</p>
            </div>
            <div>
              <h3>Entradas</h3>
              <p>10</p>
            </div>
            <div>
              <h3>Saidas</h3>
              <p>10</p>
            </div>
          </div>
        </div>
        <div>
          {batches.length === 0 ? (
            <p>Nenhum lote encontrado</p>
          ) : (
            batches.map((batch, index) => (
              <div key={index}>
                <Image
                  src={`data:image/jpeg;base64,${batch.medicamento?.imagem}`}
                  height={0}
                  width={0}
                  unoptimized
                  alt={
                    'Imagem do medicamento ' + batch.medicamento?.nomeComercial
                  }
                />
                <div>
                  <div>
                    <p>Nome do medicamento:</p>
                    <p>{batch.medicamento?.nomeComercial}</p>
                  </div>
                  <div>
                    <p>Lote:</p>
                    <p>{batch.id}</p>
                  </div>
                  <div>
                    <p>Validade: </p>
                    <p>{dayjs(batch.dataValidade)?.format('L')}</p>
                  </div>
                  <div>
                    <p>Fabricante:</p>
                    <p>
                      {
                        manufactures.find(
                          (item) => item.id === batch.medicamento?.fornecedorId
                        )?.nomeFantasia
                      }
                    </p>
                  </div>
                </div>
                <div>
                  <div>
                    <h3>Total</h3>
                    <p>10</p>
                  </div>
                  <div>
                    <h3>Entradas</h3>
                    <p>10</p>
                  </div>
                  <div>
                    <h3>Saidas</h3>
                    <p>10</p>
                  </div>
                </div>
                <button>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
              </div>
            ))
          )}
        </div>
      </section>
    </LocalizationProvider>
  );
}
