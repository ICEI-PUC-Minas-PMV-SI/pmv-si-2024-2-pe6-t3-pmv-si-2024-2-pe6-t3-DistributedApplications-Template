"use client";
import { Dispatch, SetStateAction, useState } from 'react';
import styles from './SearchAndFilterBar.module.css';

interface SearchAndFilterBarProps {
  onSearch: (search: string) => void;
  onFilter: Dispatch<SetStateAction<string>>;
}

export default function SearchAndFilterBar({ onSearch, onFilter }: SearchAndFilterBarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className={styles.searchFilterBar}>
      <input 
        type="text" 
        placeholder="Digite aqui" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} 
        className={styles.searchInput} 
      />
      <button 
        onClick={() => onSearch(searchTerm)}
        className={styles.searchButton}
      >
        OK
      </button>
      <button onClick={() => onFilter('asc')} className={styles.filterButton}>
        Ordenar Ascendente
      </button>
      <button onClick={() => onFilter('desc')} className={styles.filterButton}>
        Ordenar Descendente
      </button>
    </div>
  );
}
