import styles from './page.module.scss';
import { faTruckMedical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home() {
  return (
    <div className={styles.page__container}>
      <h1>Controle de Estoque de Farmácia</h1>
      <FontAwesomeIcon icon={faTruckMedical} />
    </div>
  );
}
