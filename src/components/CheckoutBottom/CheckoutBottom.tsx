import styles from '../../styles/checkoutBottom.module.scss';

interface CheckoutBottomProps {
  ordersTotal: number;
  priceTotal: string;
}

export function CheckoutBottom(props: CheckoutBottomProps) {
  return(
    <div className={styles.header}>
      <h1>Quantidade de pedidos: {props.ordersTotal}</h1>
      <h1>Total : {props.priceTotal}</h1>
    </div>
  )
}