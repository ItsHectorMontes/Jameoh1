import React from "react";
import {View, Text, TouchableOpacity} from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import Restaurants from "../screens/Restaurants/Restaurants";
import Restaurant from "../screens/Restaurants/Restaurant";
import AddReviewRestaurant from "../screens/Restaurants/AddReviewRestaurant";
import Search from  "../screens/Search";
import * as firebase from 'firebase/app';
import 'firebase/auth';
import * as Linking from 'expo-linking';
import Icon from 'react-native-vector-icons/MaterialIcons';


const Stack = createStackNavigator();

export default function ResaturantsStack() {

  const HeaderTitle = ({user}) => {
    return (
      <View>
        <Text style={{fontSize: 24}}>Hola {user.displayName}</Text>
      </View>
    );
  };

  const RightButtonsHeader = props => {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={{padding: 10}} onPress={() =>Linking.openURL('http://play.google.com/store/apps/details?id=com.HectorMontes.jameohapp')} >
          <Icon name="share" size={16} />
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <Stack.Navigator>
      
   
      <Stack.Screen
        name="restaurants"
        component={Restaurants}
        options={{ 
          headerTitle: props => <HeaderTitle {...props} user={firebase.auth().currentUser} />,
          headerRight: props => <RightButtonsHeader {...props} />
         }}
      />
     
      {/* <Stack.Screen
        name="add-restaurant"
        component={AddRestaurant}
        options={{ title: "Añadir nuevo restaurante" }}
      /> */}
      <Stack.Screen name="restaurant" component={Restaurant} />
      <Stack.Screen
        name="add-review-restaurant"
        component={AddReviewRestaurant}
        options={{ title: "Nuevo comentario" }}
      />
    </Stack.Navigator>
  );
}
