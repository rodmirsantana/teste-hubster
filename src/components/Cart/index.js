import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toast, ToastContainer } from 'react-toastify';

import { MdRemoveCircleOutline, MdAddCircleOutline, MdDelete } from 'react-icons/md';
import { formatPrice } from './../../utils/format';

import * as CartActions from '../../store/actions/cart';

import { Container, ProductTable, Summary } from './styles';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      discount: 0,
      serviceFee: 0,
      total: 0
    };
  }

  notify = () => {
    toast.success('Venda concluída!');
  };

  increment = product => {
    const { updateAmountRequest } = this.props;
    updateAmountRequest(product.id, product.amount + 1);
  };

  decrement = product => {
    const { updateAmountRequest } = this.props;
    updateAmountRequest(product.id, product.amount - 1);
  };

  updateDiscount = e => {
    const discount = e.target.value;
    if (discount) {
      this.setState({ discount });
    } else {
      this.setState({ discount: 0 });
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.total !== nextProps.subTotal) {
      return {
        total: nextProps.subTotal
      };
    }

    return null;
  }

  resetCart = () => {
    const { clearCart } = this.props;
    clearCart();
  };

  render() {
    const { cart, unformattedSubTotal, subTotal, removeFromCart } = this.props;
    const { discount } = this.state;
    return (
      <Container>
        <ProductTable>
          <thead>
            <tr>
              <th>PRODUTO</th>
              <th />
              <th />
              <th />
              <th />
              <th />
              <th />
              <th>QTD</th>
              <th />
              <th />
              <th />
              <th>SUBTOTAL</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(product => (
              <>
                <tr key={product.id}>
                  <td>
                    <strong>{product.name}</strong>
                    <span>Preço unitario: {formatPrice(product.salePrice)}</span>
                  </td>

                  <td>
                    <div>
                      <button type="button" onClick={() => this.decrement(product)}>
                        <MdRemoveCircleOutline size={20} color="#fe844c" />
                      </button>
                      <input type="number" readOnly value={product.amount} />
                      <button type="button" onClick={() => this.increment(product)}>
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
              </>
            ))}
          </tbody>
        </ProductTable>

        <footer>
          <Summary>
            <div>
              <span>Subtotal</span>
              <strong>{subTotal}</strong>
            </div>
            <div>
              <span>Desconto</span>
              <input
                type="number"
                min="0"
                max="100"
                placeholder="0,0"
                step=".1"
                onChange={e => this.updateDiscount(e)}
              />
              <strong>%</strong>
            </div>
            <div className="total">
              <span>TOTAL</span>
              <strong>
                {discount === 0
                  ? subTotal
                  : formatPrice(unformattedSubTotal * (1 - discount / 100))}
              </strong>
            </div>
          </Summary>
          <button
            type="button"
            onClick={() => {
              this.notify();
              this.resetCart();
            }}
          >
            Finalizar pedido
          </button>
          <ToastContainer autoClose={2000} position={toast.POSITION.TOP_RIGHT} />
        </footer>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.salePrice * product.amount)
  })),
  subTotal: formatPrice(
    state.cart.cart.reduce((total, product) => {
      return total + product.salePrice * product.amount;
    }, 0)
  ),
  unformattedSubTotal: state.cart.cart.reduce((total, product) => {
    return total + product.salePrice * product.amount;
  }, 0)
});

const mapDispatchToProps = dispatch => bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
