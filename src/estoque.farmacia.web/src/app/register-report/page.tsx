'use client';

import styles from './page.module.scss';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import Link from 'next/link';
import { useState } from 'react';

export default function RegisterReport() {
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setEndtDate] = useState<Dayjs | null>(dayjs());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <section className={styles.register_report__container}>
        <h2>Gerar um Relatório</h2>
        <div className={styles.register_report__dates_container}>
          <DatePicker
            label='Data inicial'
            value={startDate}
            onChange={(newValue: Dayjs | null) => setStartDate(newValue)}
          />
          <DatePicker
            label='Data final'
            value={endDate}
            onChange={(newValue: Dayjs | null) => setEndtDate(newValue)}
          />
        </div>
        <div className={styles.register_report__submit_container}>
          <Link href={`/report/${startDate}/${endDate}`}>
            <button>Gerar</button>
          </Link>
        </div>
      </section>
    </LocalizationProvider>
  );
}
