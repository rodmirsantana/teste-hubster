import React from 'react';

import { Container, Search } from './styles';

export default function Header() {
  return (
    <Container>
      <h1>Ponto de venda Hubster</h1>
      <Search>
        <input type="search" />
      </Search>
    </Container>
  );
}
