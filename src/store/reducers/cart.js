import produce from 'immer';
import { addToCartSuccess, updateAmountSuccess } from '../actions/cart';

const INITIAL_STATE = {
  cart: []
};

export default function cart(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@cart/ADD_REQUEST':
      console.log(state);
      const findProduct = state => state.cart.find(p => p.id === action.product.id);
      const productExists = findProduct(state);
      const currentAmount = productExists ? productExists.amount : 0;
      const amount = currentAmount + 1;
      if (productExists) {
        updateAmountSuccess(action.product.id, action.product.amount);
      } else {
        action.product.amount = 1;
        state.cart.push(action.product);
        // state.push({ id: action.product.id, count: 1 });
        const data = {
          ...state
        };
        console.log('reducer', data);
        addToCartSuccess(data);
      }

      return { ...state };

    case '@cart/ADD_SUCCESS':
      const { product } = action;
      return state.cart.cart.push(product);

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
