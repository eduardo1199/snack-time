import { createContext, useContext } from 'react';
import { action, observable, computed, toJS, makeObservable } from 'mobx';
import { formatPrice } from '../utils';

type Order = {
  name: string;
  quantity: number;
  establishment: string;
  price: number;
}

class ShoppingCart {
  @observable order: Order[];

  constructor() {
    makeObservable(this);
    this.order = [];
  }

  @action setOrderShoppingCart = (orderParams: Order) => {

    console.log(orderParams);

    if(this.order.length === 0) {
      const newOrder = [orderParams];
      
      this.order = newOrder;
    } else {
      const orderExist = this.order.find(order => order.name === orderParams.name);

      if(orderExist) {
        this.order = this.order.map(order => {
          if(order.name === orderParams.name) {
            return orderParams;
          } else {
            return order;
          }
        })
      } else {
        this.order.push(orderParams);
      }
    }
  }

  @computed get totalPriceOrder(): string {
    const calculatorTotal = formatPrice(this.order.reduce((sumTotal, order) => {
      return sumTotal + order.quantity * order.price
    }, 0));

    return calculatorTotal;
  }

  @computed get totalQuantity(): number {
    console.log(toJS(this.order));

    const calculatorTotal = this.order.reduce((sumTotal, order) => {
      return sumTotal + order.quantity;
    }, 0);

    return calculatorTotal;
  }
  
}

export const ShoppingCartStore = createContext(new ShoppingCart());
