import React, { useState, useEffect, useCallback, useRef } from "react";

import { StyleSheet, View, Text, ScrollView, Dimensions, SectionList, SafeAreaView, KeyboardAwareScrollView, ViewBase } from "react-native";

import { Icon } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import ListRestaurants from "../../components/Restaurants/ListRestaurants";

//promo

import Restaurant from "../Restaurants/Restaurant";
//categorias
import RestaurantCategory from "../Restaurants/RestaurantCategory";
import PromotionsRestaurant from "../PromotionsRestaurant";
import { dummyDataPromos } from "../../data/DataPromos";
//userinfo
import UserLoggedInfo from "../Account/UserLoggedInfo";
//search
import Search from "../Search";
//categori
import Category1 from "../../components/Categories/Category1";
import Category2 from "../../components/Categories/Category2";
import Category3 from "../../components/Categories/Category3";
import Category4 from "../../components/Categories/Category4";
import Category5 from "../../components/Categories/Category5";
import Category6 from "../../components/Categories/Category6";
import Category7 from "../../components/Categories/Category7";
import Category8 from "../../components/Categories/Category8";
import Category9 from "../../components/Categories/Category9";




const db = firebase.firestore(firebaseApp);
const screenWidth = Dimensions.get("window").width;

export default function Restaurants(props) {
  const { navigation } = props;
  const [user, setUser] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [totalResaturants, setTotalResaturants] = useState(0);
  const [startRestaurants, setStartRestaurants] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const limitRestaurants = 10;
  //user
  //


  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      setUser(userInfo);
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      db.collection("restaurants")
        .get()
        .then((snap) => {
          setTotalResaturants(snap.size);
        });

      const resultRestaurants = [];

      db.collection("restaurants")
        .orderBy("createAt", "desc")
        .limit(limitRestaurants)
        .get()
        .then((response) => {
          setStartRestaurants(response.docs[response.docs.length - 1]);

          response.forEach((doc) => {
            const restaurant = doc.data();
            restaurant.id = doc.id;
            resultRestaurants.push(restaurant);
          });
          setRestaurants(resultRestaurants);
        });
    }, [])
  );

  const handleLoadMore = () => {
    const resultRestaurants = [];
    restaurants.length < totalResaturants && setIsLoading(true);

    db.collection("restaurants")
      .orderBy("createAt", "desc")
      .startAfter(startRestaurants.data().createAt)
      .limit(limitRestaurants)
      .get()
      .then((response) => {
        if (response.docs.length > 0) {
          setStartRestaurants(response.docs[response.docs.length - 1]);
        } else {
          setIsLoading(false);
        }

        response.forEach((doc) => {
          const restaurant = doc.data();
          restaurant.id = doc.id;
          resultRestaurants.push(restaurant);
        });

        setRestaurants([...restaurants, ...resultRestaurants]);
      });
  };

  return (



    <ScrollView style={styles.viewBody}>

      <UserLoggedInfo

      />
      <ScrollView
      horizontal
      >
      <Category1 />
      <Category2 />
      <Category3 />
      <Category4 />
      <Category5 />
      <Category6 />
      <Category7 />
      <Category8 />
      <Category9 />


      </ScrollView>
      
      

      <ListRestaurants
        restaurants={restaurants}
        handleLoadMore={handleLoadMore}
        isLoading={isLoading}
      />


      {/* {user && (
        <Icon
          reverse
          type="material-community"
          name="plus"
          color="#541204"
          containerStyle={styles.btnContainer}
          onPress={() => navigation.navigate("add-restaurant")}
        />
      )} */}
    </ScrollView  >
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#fff",
  },
  btnContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
  },
  textBienvenida: {
    fontWeight: "bold",

  },
});
