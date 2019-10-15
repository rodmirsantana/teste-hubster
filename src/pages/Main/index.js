import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MdAddShoppingCart } from 'react-icons/md';
import { formatPrice } from './../../utils/format';
import api from '../../services/api';

import Sidebar from './../../components/Sidebar';
import Cart from './../../components/Cart';
import * as CartActions from '../../store/actions/cart';

import { Container, ProductList } from './styles';

class Main extends Component {
  state = {
    products: [],
    categories: [],
    selectedCategory: 'Combos e promoções'
  };

  componentDidMount() {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts = async () => {
    const response = await api.get('/products');

    const data = response.data.products.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.salePrice)
    }));

    this.setState({ products: data });
  };

  loadCategories = async () => {
    const response = await api.get('/products');

    const data = response.data.categories;

    this.setState({ categories: data });
  };

  handleSelectCategory = category => {
    this.setState({ selectedCategory: category });
  };

  handleAddProduct = product => {
    const { addToCartRequest } = this.props;

    addToCartRequest(product);
  };

  render() {
    const { products, categories, selectedCategory } = this.state;
    const { amount } = this.props;
    return (
      <Container>
        <Sidebar categories={categories} handleSelectCategory={this.handleSelectCategory} />
        <ProductList>
          {products
            .filter(product => product.category.name === selectedCategory)
            .map(product => (
              <li key={product.id}>
                <img src={product.photo} alt={product.name} />
                <div className="product-description">
                  <strong>{product.name}</strong>
                  <span>{product.priceFormatted}</span>

                  <button type="button" onClick={() => this.handleAddProduct(product)}>
                    <div>
                      <MdAddShoppingCart size={16} color="#333" /> {amount[product.id] || 0}
                    </div>
                    <span>ADICIONAR AO CARRINHO</span>
                  </button>
                </div>
              </li>
            ))}
        </ProductList>
        <Cart />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    console.log(state);
    amount[product.id] = product.amount;

    return amount;
  }, {})
});

const mapDispatchToProps = dispatch => bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
