import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Account from "../screens/Account/Account";
import Login from "../screens/Account/Login";
import Register from "../screens/Account/Register";


const Stack = createStackNavigator();



export default function AccountStack() {
  return (
    <Stack.Navigator
   
    >
      <Stack.Screen
        name="mi cuenta"
        component={Account}
        options={{ headerShown: false }}
        // options={{ title: "Mi Cuenta" }}
        
        
      />
      <Stack.Screen
        name="login"
        component={Login}
        options={{ headerShown: false }}
        //options={{ title: "Iniciar sesión" }}
      />
      <Stack.Screen
        name="register"
        component={Register}
        options={{ headerShown: false }}
        // options={{ title: "Registro" }}
      />
    </Stack.Navigator>
  );
}
