import { addToCartSuccess, updateAmountSuccess } from '../actions/cart';

const INITIAL_STATE = {
  cart: []
};

export default function cart(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@cart/ADD_REQUEST':
      const findProduct = state => state.cart.find(p => p.id === action.product.id);
      const productExists = findProduct(state);
      const currentAmount = productExists ? productExists.amount : 0;
      const amount = currentAmount + 1;

      if (productExists) {
        action.product.amount = amount;
        updateAmountSuccess(action.product.id, action.product.amount);
      } else {
        action.product.amount = 1;
        state.cart.push(action.product);
        const data = {
          ...state
        };
        addToCartSuccess(data);
      }

      return { ...state };

    case '@cart/ADD_SUCCESS':
      const { product } = action;
      return state.cart.cart.push(product);

    case '@cart/REMOVE':
      const removeProductIndex = state.cart.findIndex(p => p.id === action.id);
      if (removeProductIndex >= 0) {
        const newState = state;
        newState.cart.splice(removeProductIndex, 1);
        return { ...newState };
      }

      return { ...state };

    case '@cart/UPDATE_AMOUNT_REQUEST':
      if (action.amount < 0) return { ...state };
      const productIndex = state.cart.findIndex(p => p.id === action.id);
      if (productIndex >= 0) {
        state.cart[productIndex].amount = Number(action.amount);
      }
      return { ...state };

    case '@cart/CLEAR_CART':
      return {
        cart: []
      };

    default:
      return state;
  }
}
