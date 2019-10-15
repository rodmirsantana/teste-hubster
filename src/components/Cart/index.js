import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { MdRemoveCircleOutline, MdAddCircleOutline, MdDelete } from 'react-icons/md';
import { formatPrice } from './../../utils/format';

import * as CartActions from '../../store/actions/cart';

import { Container, ProductTable, Summary } from './styles';

function Cart({
  cart,
  subtotal,
  discount,
  serviceFee,
  total,
  removeFromCart,
  updateAmountRequest
}) {
  function increment(product) {
    updateAmountRequest(product.id, product.amount + 1);
  }

  function decrement(product) {
    updateAmountRequest(product.id, product.amount - 1);
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(product => (
            <tr key={product.id}>
              {/* {console.log(product)} */}
              <td>
                <strong>{product.name}</strong>
                <span>Preço unitario: {formatPrice(product.salePrice)}</span>
              </td>

              <td>
                <div>
                  <button type="button" onClick={() => decrement(product)}>
                    <MdRemoveCircleOutline size={20} color="#fe844c" />
                  </button>
                  <input type="number" readOnly value={product.amount} />
                  <button type="button" onClick={() => increment(product)}>
                    <MdAddCircleOutline size={20} color="#fe844c" />
                  </button>
                </div>
              </td>

              <td>
                <strong>{product.subtotal}</strong>
              </td>

              <td>
                <button type="button" onClick={() => removeFromCart(product.id)}>
                  <MdDelete size={20} color="#fe844c" />
                </button>
              </td>
            </tr>
          ))}

          {/* <tr>
            <td>
              <strong>Coca</strong>
              <span>Preço unitario: R$ 4,50</span>
            </td>

            <td>
              <div>
                <button type="button">
                  {' '}
                  <MdRemoveCircleOutline size={20} color="#fe844c" />
                </button>
                <input type="number" readOnly value="2" />
                <button type="button">
                  {' '}
                  <MdAddCircleOutline size={20} color="#fe844c" />
                </button>
              </div>
            </td>

            <td>
              <strong>R$ 9,00</strong>
            </td>

            <td>
              <button
                type="button"
              >
                <MdDelete size={20} color="#fe844c" />
              </button>
            </td>
          </tr> */}
        </tbody>
      </ProductTable>

      <footer>
        <Summary>
          <div>
            <span>Subtotal</span>
            <strong>{subtotal}</strong>
          </div>
          <div>
            <span>Desconto</span>
            <strong>{discount}</strong>
          </div>
          <div>
            <span>Taxa de serviço</span>
            <strong>{serviceFee}</strong>
          </div>
          <div>
            <span>TOTAL</span>
            <strong>{total}</strong>
          </div>
        </Summary>
        {/* <Summary>
          <div>
            <span>Subtotal</span>
            <strong>R$ 17,00</strong>
          </div>
          <div>
            <span>Desconto</span>
            <strong>0 %</strong>
          </div>
          <div>
            <span>Taxa de serviço</span>
            <strong>0 %</strong>
          </div>
          <div>
            <span>TOTAL</span>
            <strong>R$ 17,00</strong>
          </div>
        </Summary> */}
        <button type="button">Finalizar pedido</button>
      </footer>
    </Container>
  );
}

const mapStateToProps = state => ({
  cart: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount)
  })),
  total: formatPrice(
    state.cart.reduce((total, product) => {
      return total + product.salePrice * product.amount;
    }, 0)
  )
});

const mapDispatchToProps = dispatch => bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
