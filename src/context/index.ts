import { createContext, useContext } from 'react';
import { action, observable, computed, toJS, makeObservable } from 'mobx';
import { formatPrice } from '../pages/establishments/utils';

export type Order = {
  name: string;
  quantity: number;
  establishment: string;
  price: number;
}

export type Slug = {
  description: string;
  establishment: string;
  id: number;
  name: string;
  price: number;
  type: string;
  quantity: number;
}

export type ResponseSlug = Omit<Slug, 'quantity'>;

class ShoppingCart {
  @observable order: Order[];
  @observable slugs: Slug[];
  
  constructor() {
    makeObservable(this);
    this.order = [];
    this.slugs = [];
  }

  @action setSlugs(value: Slug[]){
    this.slugs = value;

    value.map(slug => {
      if(slug.quantity){
        this.setOrderShoppingCart(
          {
            name: slug.name,
            quantity: slug.quantity,
            establishment: slug.establishment,
            price: slug.price
          }
        )        
      }
    });

  }

  @action setOrdersEmpty(){
    this.order = [];
    this.slugs = [];
  }

  @action setOrderShoppingCart = (orderParams: Order) => {
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

  @action getFilterSlugs(name: string) {
    if(name) {
      return this.slugs.filter(slug => (slug.name.toLocaleLowerCase()).includes(name.toLocaleLowerCase()));
    }

    return this.slugs;
  }

  @computed get totalPriceOrder(): string {
    const calculatorTotal = formatPrice(this.order.reduce((sumTotal, order) => {
      return sumTotal + order.quantity * order.price
    }, 0));

    return calculatorTotal;
  }

  @computed get totalQuantity(): number {

    const calculatorTotal = this.order.reduce((sumTotal, order) => {
      return sumTotal + order.quantity;
    }, 0);

    return calculatorTotal;
  }


  
}

export const ShoppingCartStore = createContext(new ShoppingCart());
