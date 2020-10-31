import React, {useState, useEffect, useRef} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE, Circle} from 'react-native-maps';
import {View, StyleSheet, Text, Image, TouchableOpacity, Animated, TextInput} from 'react-native';
import {Rating} from 'react-native-elements';
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Location from 'expo-location';

async function getLocation(location) {
  let area = [];
  let errMsg;
  try {
    if (!location) {
      let {status} = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        errMsg = 'El acceso a la ubicación fue denegado';
      } else {
        location = await Location.getCurrentPositionAsync({});
        location = location.coords;
      }
    }

    area[0] = location.latitude + 0.003;
    area[1] = location.latitude - 0.003;
    area[2] = location.longitude + 0.003;
    area[3] = location.longitude - 0.003;

    return {location, area, errMsg};
  } catch (err) {
    console.log(err);
  }
}

async function getRestaurantsInArea(area, restaurants) {
  try { 
    let list = [];
    restaurants.forEach(res => {
      const isInArea = res.location.latitude <= area[0] 
                        && res.location.latitude >= area[1] 
                        && res.location.longitude <= area[2] 
                        && res.location.longitude >= area[3];
      if (isInArea) {
        list = list.concat(res);
      }
    });
    return list;
  } catch (err)  {
    console.log(err);
  }
}

async function getRestaurants() {
  try {    
    return firebase.firestore().collection('restaurants').get()
      .then(res => {
        let list = [];
        list = res.docs.map(doc => doc.data());
        return list;
      });
  } catch (err) {
    console.log(err);
  }
}


export default function App(){
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState();
  
  const mapTypes = ['standard', 'satellite', 'hybrid'];
  const [mapType, setMapType] = useState(mapTypes[0]);

  const [markers, setMarkers] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [isCalloutOpen, setCalloutOpen] = useState(false);
  const [calloutData, setCalloutData] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(()=>{
    getRestaurants().then(restaurants => {
         setRestaurants(restaurants);
         getLocation().then( location => {
           setLocation(location.location);
           getRestaurantsInArea(location.area, restaurants).then(res => {
             if (markers.length !== res.length ) {
               setMarkers(res);
             }
           });
         });
       });
  },[]);

  const toggleMapType = () => {
    const index = mapTypes.indexOf(mapType);
    setMapType(mapTypes[index + 1 % 2]);
  }

  const showCallout = (data) => {
    setCalloutOpen(true);
    setCalloutData(data);
    setRegion(data.location);
  };

  const filterRestaurants = (restaurant) => {
    const userSearch = search.toLowerCase();
      const name = restaurant.name.toLowerCase().replace(/[,.';]/g, '');
      const description = restaurant.description.toLowerCase().replace(/[,.';]/g, '');
      let category = restaurant.category; 
      category = category ? category.toLowerCase() : '';
      const isInMarkers = markers.filter(marker => marker.name.toLowerCase() === name).length < 1;
      const canShow = (name.includes(userSearch) 
                    || description.includes(userSearch) 
                    || category.includes(userSearch))
                    && isInMarkers;
      return canShow
  }

    return (
      <View style={{flex: 1}}>

        <View style={styles.searchBox}>
          <Icon name="place" size={28} color="#333" style={{flex: 1, padding: 10}}/>
          <TextInput placeholder="Buscar restaurante..." onChangeText={text=>setSearch(text)} style={{flex: 9, padding: 10}}/>
        </View>

        <TouchableOpacity style={styles.toggleMapBtn} onPress={()=>toggleMapType()}>
          <Icon name="layers" size={28} color="white" />
        </TouchableOpacity>

        {
          location ? (
            <MapView 
              onTouchEnd={()=>setCalloutOpen(false)}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: location.latitude, 
                longitude: location.longitude,
                latitudeDelta: 0.009,
                longitudeDelta: 0.006,
              }}
              moveOnMarkerPress
              Region={region ? region : location}
              onUserLocationChange={(e)=>{
                const eLocation = e.nativeEvent.coordinate;
                getLocation().then( location => {
                  setLocation(location.location);
                  getRestaurantsInArea(location.area, restaurants).then(res => {
                    if (markers.length !== res.length ) {
                      setMarkers(res);
                    }
                  });
                });
              }}
              style={styles.mapView} 
              showsUserLocation 
              userLocationAnnotationTitle="Mi ubicación"
              mapType={mapType}
              > 
              {
                location ? <Circle
                center={location}
                radius={425}
                fillColor={'rgba(100,100,200,0.25)'}
                strokeColor={'rgba(50,50,100,0.30)'}
                strokeWidth={3}
              /> : null
              }
              {
                markers.map(marker => (
                  <Marker key={Math.random()} 
                    coordinate={marker.location} 
                    onPress={()=>showCallout(marker)}
                    onLayout={e=>console.log(e)}
                    >
                      <Icon name="restaurant" style={styles.ourRestaurants} size={24} color="white" />
                  </Marker>))
              }
              {
                search.trim() !== ''
                  ? restaurants.filter(restaurant => {
                    
                    return filterRestaurants(restaurant);
                  }).map(restaurant => (
                    <Marker 
                      key={Math.random()}
                      onPress={()=>showCallout(restaurant)}
                      coordinate={restaurant.location} 
                      title={restaurant.name} 
                    />))
                  : null
              }
            </MapView>
          ) : null
        } 
        {
          isCalloutOpen 
            ? <Callout data={calloutData} />
            :  null
        }
      </View>
    )
};




const Callout = (props) => {
  const {name, address, rating, description, category, images} = props.data;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(()=>{
    Animated.spring(fadeAnim, {
      toValue: 1,
      useNativeDriver: true
    }).start();
  });
  return (
    <Animated.View style={{...styles.callout, opacity: fadeAnim}}>
      <Image source={
        images ? {uri: images[0]} : require('../../assets/img/no-image.png')
      }
      style={styles.calloutImage} />
      <View style={styles.calloutBody}>
      <Rating 
          style={styles.rating}
          imageSize={20}
          readonly
          startingValue={parseFloat(rating)}
          />
        <Text>Nombre: {name}</Text>
        <Text>Descripción: {description}</Text>
        {
          category
            ? <Text>Categoria: {category}</Text>
            : null
        }
        <Text>Dirección: {address}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  rating: {
    position: "absolute",
    right: 0,
    top: -10,
  },
  mapView: {
    ...StyleSheet.absoluteFillObject,
  },
  searchBox: {
    position: 'absolute',
    top: 10,
    width: '70%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 50,
    shadowColor: '#000',
    elevation: 60,
    shadowOffset: {
      width: 0,
      height: 30,
    },
    shadowOpacity: 0.2,
    shadowRadius: 60,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calloutImage: {
    borderWidth: 1,
    borderColor: 'transparent',
    width: '100%',
    height: 275,
    resizeMode: 'contain',
    backgroundColor: 'black',
  },
  callout: {
    overflow: 'hidden',
    width: '90%',
    borderRadius: 40,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: 'white',
    elevation: 4,
    shadowColor: '#8b8d8d',
    shadowOffset: {
      width: 0,
      height: 60,
    },
    shadowOpacity: 0.2,
    shadowRadius: 30,
  },
  calloutBody: {
    margin: 15,
  },
  toggleMapBtn: {
    position: 'absolute',
    right: 10,
    top: 60,
    elevation: 60,
    height: 50,
    width: 50,
    backgroundColor: '#0278ae',
    borderRadius: 100,
    zIndex: 10,
    shadowColor: '#19d3da',
    shadowOffset: {
      width: 0,
      height: 30,
    },
    shadowOpacity: 0.2,
    shadowRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ourRestaurants: {
    backgroundColor: '#0f3057',
    borderWidth: 6,
    borderColor: 'rgba(0, 88, 122, 0.5)',
    height: 50,
    width: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 50,
    elevation: 4,
    shadowColor: '#ffd57e',
    shadowOffset: {
      width: 0,
      height: 30,
    },
    shadowOpacity: 0.2,
    shadowRadius: 60,
  },
});