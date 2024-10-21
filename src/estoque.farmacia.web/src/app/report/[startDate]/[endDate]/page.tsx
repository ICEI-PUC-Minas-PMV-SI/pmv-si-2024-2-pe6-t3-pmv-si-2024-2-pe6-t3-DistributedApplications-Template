'use client';

import styles from './page.module.scss';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { IMedicine } from '@/utils/interfaces/IMedicine';
import dayjs from 'dayjs';
import Image from 'next/image';

export default function Report() {
  const { startDate, endDate } = useParams();
  const [total, setTotal] = useState<number>(0);
  const [entrada, setEntrada] = useState<number>(0);
  const [saida, setSaida] = useState<number>(0);
  const [medicines, setMedicines] = useState<IMedicine[]>([
    {
      id: '6603dc0a-9dfa-488a-b555-10366eafd9c7',
      name: 'Dipirona',
      batchId: '87c2a1c1-5dc1-4f07-925d-8b17a0b0be1d',
      manufacturerId: 'd8e686a7-3e64-4eeb-adf9-edfa85856d60',
      validity: dayjs('2024-10-21T13:47:02.969Z'),
      image: '/imgs/dipirona.jpg',
    },
    {
      id: '6603dc0a-9dfa-488a-b555-10366eafd9c7',
      name: 'Dipirona',
      batchId: '87c2a1c1-5dc1-4f07-925d-8b17a0b0be1d',
      manufacturerId: 'd8e686a7-3e64-4eeb-adf9-edfa85856d60',
      validity: dayjs('2024-10-21T13:47:02.969Z'),
      image: '/imgs/dipirona.jpg',
    },
    {
      id: '6603dc0a-9dfa-488a-b555-10366eafd9c7',
      name: 'Dipirona',
      batchId: '87c2a1c1-5dc1-4f07-925d-8b17a0b0be1d',
      manufacturerId: 'd8e686a7-3e64-4eeb-adf9-edfa85856d60',
      validity: dayjs('2024-10-21T13:47:02.969Z'),
      image: '/imgs/dipirona.jpg',
    },
  ]);

  return (
    <section>
      <div>
        <h2>Relatório</h2>
        <Link href={'register-report'}>
          <button>Gerar outro relatório</button>
        </Link>
      </div>
      <div>
        <div>
          <p>Total</p>
          <h3>{total}</h3>
        </div>
        <div>
          <p>Entrada{entrada > 0 && 's'}</p>
          <h3>{entrada}</h3>
        </div>
        <div>
          <p>Saída{saida > 0 && 's'}</p>
          <h3>{saida}</h3>
        </div>
      </div>
      <div>
        {medicines.map((medicine, index) => (
          <div key={index}>
            <Image
              src='/imgs/dipirona.jpg'
              height={0}
              width={0}
              unoptimized
              alt={'Imagem do produto' + medicine.name}
            />
            <div>
              <div>
                <p>Nome:</p>
                <p>{medicine.name}</p>
              </div>
              <div>
                <p>Lote:</p>
                <p>{medicine.batchId}</p>
              </div>
              <div>
                <p>Fabricante:</p>
                <p>{medicine.manufacturerId}</p>
              </div>
              <div>
                <p>Validade:</p>
                <p>{medicine.validity?.format()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
