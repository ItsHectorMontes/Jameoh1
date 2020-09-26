import React, {useState, useEffect} from "react";
import { YellowBox } from "react-native";
import { firebaseApp } from "./app/utils/firebase";
import Navigation from "./app/navigations/Navigation";
import { decode, encode } from "base-64";
import { createStore } from 'redux'
import reducers from './app/redux/reducers'
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { StyleProvider } from "native-base";
import { AppLoading } from 'expo';
import getTheme from './theme/components'
import variables from "./theme/variables/commonColor";
import { Provider as StoreProvider } from 'react-redux'
const store = createStore(reducers)

YellowBox.ignoreWarnings(["Setting a timer"]);

if (!global.btoa) global.btoa = encode;
if (!global.atob) global.atob = decode;

export default function App() {
  const [isready, prepareready] = useState(false) 
  
  useEffect(() => {
    Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    prepareready(true)
  }, []);
  if(isready){
    return (
      <StyleProvider style={getTheme(variables)}>
        <StoreProvider store={store}>
          <Navigation/>
        </StoreProvider>
      </StyleProvider>
    )
  } else {
    return (
      <AppLoading/>
    )
  }
}
