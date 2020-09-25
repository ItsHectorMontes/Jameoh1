import React, {useState, useEffect} from "react";
import {StyleSheet, ActivityIndicator} from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import RestaurantsStack from "./RestaurantsStack";
import FavoritesStack from "./FavoritesStack";
import TopRestaurantsStack from "./TopRestaurantsStack";
import SearchStack from "./SearchStack";
import AccountStack from "./AccountStack";
import PromotionsStack from "./PromotionsStack";
//
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import * as firebase from "firebase";

import  UserGuest from '../screens/Account/UserGuest';
import LoginForm from '../components/Account/LoginForm';
import LoginFacebook from '../components/Account/LoginFacebook';
import RegisterForm from '../components/Account/RegisterForm';
import { View } from "react-native";
import { render } from "react-dom";



const Tab = createBottomTabNavigator();
const SettingsStack = createStackNavigator();
const Login = createStackNavigator()



function SettingsStackScreen({ navigation }) {
  navigation.setOptions({ tabBarVisible: false })
  return (
      <SettingsStack.Navigator>
          <SettingsStack.Screen name=" " component={AccountStack} options={{ headerShown: false }}/>
      </SettingsStack.Navigator>
  )
}


export default function Navigation() {
  const sessiontype = useSelector(state => state.userdata.sessiontype)
  const dispatch = useDispatch()
  
  useEffect(() => {
    console.log(sessiontype)
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        dispatch({type : 'OnUserSession', payload: {sessiontype : 1, userdata : {
          username: 'invitado', email : 'Bienvenido'}}})
      } else {
        dispatch({type : 'OnUserSession', payload: {sessiontype : 2, userdata : {
          username: 'invitado', email : 'Bienvenido'}}})
      }
    });
  }, []);
  
    if( sessiontype == 0 ){
      return(
        <View style={styles.container}>
          <ActivityIndicator/>
        </View>
      )
    } if (sessiontype == 1){
      return (
        <NavigationContainer>
          <Login.Navigator headerMode='none'                
          initialRouteName="Userguest">
            <Login.Screen name="Userguest" component = {UserGuest}/>
            <Login.Screen name="login" component = {LoginForm}/>
            <Login.Screen name="LoginFacebook" component={LoginFacebook}/>
            <Login.Screen name="register" component={RegisterForm}/>
          </Login.Navigator>
        </NavigationContainer>
      )
    } else if (sessiontype == 2){
  
      return (
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="promotions"
            tabBarOptions={{
              inactiveTintColor: "#c87941",
              activeTintColor: "#541204",
              
            }}
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color }) => screenOptions(route, color),
            })}
          >
              <Tab.Screen
              name="promotions"
              component={PromotionsStack}
              options={{ title: "Promos" }}
            />
            <Tab.Screen
              name="restaurants"
              component={RestaurantsStack}
              options={{ title: "Restaurantes" }}
            />
               <Tab.Screen
              name="search"
              component={SearchStack}
              options={{ title: "Buscar" }}
            />
            <Tab.Screen
              name="favorites"
              component={FavoritesStack}
              options={{ title: "Favoritos" }}
            />
            <Tab.Screen
              name="top-restaurants"
              component={TopRestaurantsStack}
              options={{ title: "Top 5" }}
            />
         
            <Tab.Screen
              name="account"
              component={SettingsStackScreen}
              options={{ title: "Cuenta" }}
              
            />
          
          </Tab.Navigator>
        </NavigationContainer>
      );
    }
}


function screenOptions(route, color) {
  let iconName;

  switch (route.name) {
    case "promotions":
      iconName = "food-fork-drink";
      break;
    case "restaurants":
      iconName = "home-variant-outline";
      break;
    case "favorites":
      iconName = "heart-outline";
      break;
    case "top-restaurants":
      iconName = "star-outline";
      break;
    case "search":
      iconName = "magnify";
      break;
    case "account":
      iconName = "account";
      break;
    default:
      break;
  }
  return (
    <Icon type="material-community" name={iconName} size={22} color={color} />
  );
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
