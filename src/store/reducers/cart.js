import produce from 'immer';
import { addToCartSuccess, updateAmountSuccess } from '../actions/cart';
import { formatPrice } from './../../utils/format';

const INITIAL_STATE = {
  cart: [],
  amount: [
    {
      id: '',
      count: 0
    }
  ]
};

export default function cart(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@cart/ADD_REQUEST':
      const findProduct = state => state.cart.find(p => p.id === action.product.id);
      const productExists = findProduct(state);
      console.log(state);
      const currentAmount = productExists ? productExists.amount : 0;

      const amount = currentAmount + 1;
      if (productExists) {
        updateAmountSuccess(action.product.id, amount);
      } else {
        const data = {
          ...state,
          amount: 1,
          priceFormatted: formatPrice(action.product.salePrice)
        };
        addToCartSuccess(data);
      }

      return { ...state };

    case '@cart/ADD_SUCCESS':
      return produce(state, draft => {
        const { product } = action;

        draft.push(product);
      });
    case '@cart/REMOVE':
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.id);

        if (productIndex >= 0) {
          draft.splice(productIndex, 1);
        }
      });
    case '@cart/UPDATE_AMOUNT_SUCCESS': {
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.id);
        if (productIndex >= 0) {
          draft[productIndex].amount = Number(action.amount);
        }
      });
    }

    default:
      return state;
  }
}
