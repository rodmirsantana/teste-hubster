import React from 'react';
import { Provider } from 'react-redux';

import GlobalStyle from './styles/global';

import Main from './pages/Main';
import Header from './components/Header';

import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Header />
      <Main />
      <GlobalStyle />
    </Provider>
  );
}

export default App;
