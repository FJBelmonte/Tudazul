import React from "react";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import configureStore from "./store";

import { YellowBox } from "react-native";
YellowBox.ignoreWarnings(["Remote debugger"]);

import firebase from "./services/firebase";

import Routes from "./routes";

const { store, persistor } = configureStore();

// com o Persistor é possível verificar se o usuário está autenticado a partir daqui. lógica não implementada para fins de desenvolvimento

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}
