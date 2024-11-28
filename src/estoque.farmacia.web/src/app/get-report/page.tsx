'use client';

import styles from './page.module.scss';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function GetReport() {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [startDateFormated, setStartDateFormated] = useState<string | null>(
    null
  );
  const [endDate, setEndtDate] = useState<Dayjs | null>(null);
  const [endDateFormated, setEndtDateFormated] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (!authStatus) {
      router.push('/login');
    }
  }, []);

  const handleStartData = (value: Dayjs | null) => {
    if (value) {
      setStartDate(value);
      setStartDateFormated(value.format('l').replaceAll('/', '-'));
    }
  };

  const handleEndData = (value: Dayjs | null) => {
    if (value) {
      setEndtDate(value);
      setEndtDateFormated(value.format('l').replaceAll('/', '-'));
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <section className={styles.register_report__container}>
        <h2>Gerar um Relatório</h2>
        <div className={styles.register_report__dates_container}>
          <DatePicker
            label='Data inicial'
            value={startDate}
            onChange={handleStartData}
            className={styles.register_report__dates_item}
          />
          <DatePicker
            label='Data final'
            value={endDate}
            onChange={handleEndData}
            className={styles.register_report__dates_item}
          />
        </div>
        <div className={styles.register_report__submit_container}>
          <Link href={`/report/${startDateFormated}/${endDateFormated}`}>
            <button disabled={!startDate || !endDate}>Gerar</button>
          </Link>
        </div>
      </section>
    </LocalizationProvider>
  );
}
