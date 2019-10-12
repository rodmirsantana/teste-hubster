import React from 'react';

import GlobalStyle from './styles/global';

import Main from './pages/Main';
import Header from './components/Header';

const App = () => (
  <div className="App">
    <Header />
    <Main />
    <GlobalStyle />
  </div>
);

export default App;
