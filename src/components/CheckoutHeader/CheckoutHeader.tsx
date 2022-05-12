import styles from '../../styles/checkoutHeader.module.scss';

export function CheckoutHeader() {
  return(
    <div className={styles.header}>
      <h1>quantidade de pedidos: 5</h1>
      <button>Confirmar pedidos</button>
    </div>
  )
}