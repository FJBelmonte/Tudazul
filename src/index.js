import {PersistGate} from 'redux-persist/lib/integration/react';
import {Provider} from 'react-redux';
import React from 'react';
import Routes from './routes';
import {YellowBox} from 'react-native';
import configureStore from './store';
import firebase from './services/firebase';

YellowBox.ignoreWarnings(['Remote debugger']);
YellowBox.ignoreWarnings(['RCTRootView cancelTouches']);

const {store, persistor} = configureStore();

// com o Persistor é possível verificar se o usuário está autenticado a partir daqui. lógica não implementada para fins de desenvolvimento

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}
