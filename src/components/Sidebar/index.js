import React, { Component } from 'react';

import { Container } from './styles';

class Sidebar extends Component {
  render() {
    const { categories, handleSelectCategory } = this.props;

    return (
      <Container>
        {categories.map(category => (
          <p key={category.id} onClick={() => handleSelectCategory(category.name)}>
            {category.name}
          </p>
        ))}
      </Container>
    );
  }
}

export default Sidebar;
