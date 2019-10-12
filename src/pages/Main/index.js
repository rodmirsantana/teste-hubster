import React, { Component } from 'react';
import api from '../../services/api';
import { MdAddShoppingCart } from 'react-icons/md';
import { formatPrice } from './../../utils/format';

import Sidebar from './../../components/Sidebar';

import { Container, ProductList } from './styles';

export default class Main extends Component {
  state = {
    products: [],
    categories: []
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

  render() {
    const { products, categories } = this.state;
    return (
      <Container>
        <Sidebar categories={categories} />
        <ProductList>
          {products.map(product => (
            <li key={product.id}>
              <img src={product.photo} alt={product.name} />
              <div className="product-description">
                <strong>{product.name}</strong>
                <span>{product.priceFormatted}</span>

                <button type="button">
                  <div>
                    <MdAddShoppingCart size={16} color="#333" />{' '}
                  </div>
                  <span>ADICIONAR AO CARRINHO</span>
                </button>
              </div>
            </li>
          ))}
        </ProductList>
      </Container>
    );
  }
}
