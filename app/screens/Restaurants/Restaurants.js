import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, ScrollView, Image,  Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import ListRestaurants from "../../components/Restaurants/ListRestaurants";

import AllCategories from "../../components/Categories/AllCategories";
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

export default function Restaurants(props) {
  const { navigation } = props;
  const [user, setUser] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [totalResaturants, setTotalResaturants] = useState(0);
  const [startRestaurants, setStartRestaurants] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const limitRestaurants = 10;
  const [selectedId, setSelectedId] = useState(null);
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
    <>
      <View style={styles.bgContainer}>
        <Image source={require('../../../assets/FondoRestaurantes.png')} style={styles.bg} /> 
      </View>
      <ScrollView style={styles.viewBody} showsVerticalScrollIndicator={false}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <AllCategories setSelectedId={()=>setSelectedId(null)} />
          <Category1 setSelectedId={setSelectedId}/>
          <Category2 setSelectedId={setSelectedId}/>
          <Category3 setSelectedId={setSelectedId}/>
          <Category4 setSelectedId={setSelectedId}/>
          <Category5 setSelectedId={setSelectedId}/>
          <Category6 setSelectedId={setSelectedId}/>
          <Category7 setSelectedId={setSelectedId}/>
          <Category8 setSelectedId={setSelectedId}/>
          <Category9 setSelectedId={setSelectedId}/>
        </ScrollView>
        <View>
          <Text style={{fontSize: 28, color: '#00000077'}}>Restaurantes</Text>
        </View>
        <ListRestaurants
          restaurants={restaurants}
          handleLoadMore={handleLoadMore}
          isLoading={isLoading}
          selectedId={selectedId}
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
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
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
  bgContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'stretch',
    borderWidth: 2,
  }
});
