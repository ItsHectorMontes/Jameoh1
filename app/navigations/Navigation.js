import React from "react";
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


const Tab = createBottomTabNavigator();
const SettingsStack = createStackNavigator();

function SettingsStackScreen({ navigation }) {
  navigation.setOptions({ tabBarVisible: false })
  return (
      <SettingsStack.Navigator>
          <SettingsStack.Screen name=" " component={AccountStack} options={{ headerShown: false }}/>
      </SettingsStack.Navigator>
  )
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="account"
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
