import styles from './Pagination.module.css';

interface PaginationProps {
  productsPerPage: number;
  totalProducts: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

export default function Pagination({ productsPerPage, totalProducts, paginate, currentPage }: PaginationProps) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={styles.pagination}>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`${styles.button} ${currentPage === number ? styles.active : ''}`}
        >
          {number}
        </button>
      ))}
    </nav>
  );
}
