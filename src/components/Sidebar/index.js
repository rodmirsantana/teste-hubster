import React from 'react';

import { Container } from './styles';

function Sidebar({ categories }) {
  return (
    <Container>
      {categories.map(category => (
        <p key={category.id}>{category.name}</p>
      ))}
    </Container>
  );
}

export default Sidebar;
