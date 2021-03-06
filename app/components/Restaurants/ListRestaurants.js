import React, {useState, useEffect} from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Image } from "react-native-elements";
import { size } from "lodash";
import { useNavigation } from "@react-navigation/native";

export default function ListRestaurants(props) {
  const { restaurants, handleLoadMore, isLoading } = props;
  const navigation = useNavigation();
  const [ordenedRestaurantsList, setOrdenedRestaurantsList] = useState([]);

  useEffect(() => {
    if (restaurants.length > 0 && restaurants.length !== ordenedRestaurantsList.length) {
      setOrdenedRestaurantsList([...restaurants.filter(rest => rest.destacado), ...restaurants.filter(rest => !rest.destacado)]);
    }
  });

  return (
    <View>
   
      {size(restaurants) > 0 ? (
        <FlatList
          data={ordenedRestaurantsList}
          renderItem={(restaurant) => (
            <Restaurant restaurant={restaurant} selectedId={props.selectedId} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.5}
          onEndReached={handleLoadMore}
          ListFooterComponent={<FooterList isLoading={isLoading} />}
        />
      ) : (
        <View style={styles.loaderRestaurants}>
          <ActivityIndicator size="large" />
          <Text>Cargando restaurantes</Text>
        </View>
      )}
    </View>
  );
}

function Restaurant(props) {
  const { selectedId, restaurant, navigation } = props;
  const { id, images, name, address, description, category, destacado } = restaurant.item;
  const imageRestaurant = images ? images[0] : null;
  const goRestaurant = () => {
    navigation.navigate("restaurant", {
      id,
      name,
    });
  };


  const RestaurantListItem = () => {
    return (
      <TouchableOpacity onPress={goRestaurant}>
        {
          destacado 
          ? (
          <View style={styles.destacado}>
            <Text>Destacado</Text>
          </View>)
          : null
        }
        <View style={styles.viewRestaurant}>
          <View style={styles.viewRestaurantImage}>
            <Image
              resizeMode="cover"
              scale={0.5}
              PlaceholderContent={<ActivityIndicator color="fff" />}
              source={
                imageRestaurant
                  ? { uri: imageRestaurant }
                  : require("../../../assets/img/no-image.png")
              }
              style={styles.imageRestaurant}
            />
          </View>
          <View>
            <Text style={styles.restaurantName}>{name}</Text>
            <Text style={styles.restaurantAddress}>{address}</Text>
            <Text style={styles.restaurantDescription}>
              {description.substr(0, 60)}...
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  if (selectedId) {
    if (selectedId === category) {
      return <RestaurantListItem />
    }
    return null; 
  } else {
    return <RestaurantListItem />
  }
}

function FooterList(props) {
  const { isLoading } = props;

  if (isLoading) {
    return (
      <View style={styles.loaderRestaurants}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <View style={styles.notFoundRestaurants}>
        <Text>No quedan restaurantes por cargar</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loaderRestaurants: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
    
  },
  destacado: {
    position: 'absolute',
    top: 10,
    right: 2,
    backgroundColor: '#e4df32',
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  viewRestaurant: {
    flexDirection: "row",
    margin: 10,
  },
  viewRestaurantImage: {
    marginRight: 15,
  },
  imageRestaurant: {
    width: 80,
    height: 80,          
    borderRadius: 80 / 2,
    overflow:"hidden", 
    borderWidth: 0.3,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    //pendiente
  },
  restaurantName: {
    fontWeight: "bold",
  },
  restaurantAddress: {
    paddingTop: 2,
    color: "grey",
  },
  restaurantDescription: {
    paddingTop: 2,
    color: "grey",
    width: 300,
  },
  notFoundRestaurants: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
  },
});
