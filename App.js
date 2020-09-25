import React from "react";
import { YellowBox } from "react-native";
import { firebaseApp } from "./app/utils/firebase";
import Navigation from "./app/navigations/Navigation";
import { decode, encode } from "base-64";
import { createStore } from 'redux'
import reducers from './app/redux/reducers'
import { Provider as StoreProvider } from 'react-redux'

const store = createStore(reducers)

YellowBox.ignoreWarnings(["Setting a timer"]);

if (!global.btoa) global.btoa = encode;
if (!global.atob) global.atob = decode;

export default function App() {
  return (
    <StoreProvider store={store}>
      <Navigation/>
    </StoreProvider>
  ) 
}
