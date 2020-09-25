import React, { useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity,Image } from "react-native";

const DATA = [
  {
    id: "1",
    title: "pollos, carnes y parrillas",
    url: '../../../assets/categorias/1.png',    
  },
  {
    id: "2",
    title: "Pescado y Mariscos",
    url: '../../../assets/categorias/2.png',  
  },
  {
    id: "3",
    title: "Pizzas y pastas",
    url: '../../../assets/categorias/3.png',  
  },
  {
    id: "4",
    title: "Comida Oriental",
    url: '../../../assets/categorias/4.png',
  }, 
  {
    id: "5",
    title: "Platos Tipicos",
    url: '../../../assets/categorias/5.png',  
  },  
 
  {
    id: "6",
    title: "Comida Rapida",
    url: '../../../assets/categorias/6.png',  
  },
  {
    id: "57",
    title: "Comida Mexicana",
    url: '../../../assets/categorias/7.png',  
  },
  {
    id: "8",
    title: "Platos Tipicos",
    url: '../../../assets/categorias/8.png',
  },
  {
    id: "9",
    title: "Cafe-Pasteleria",
    url: '../../../assets/categorias/9.png',  
  },




];

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Image
        style={styles.tinyLogo}
        source={item.url}
      />
    
    
    
  </TouchableOpacity>
);

const App = () => {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#FDD367" : "#ffffff";

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        style={{ backgroundColor }}
      />
    );  
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        horizontal={true}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 5,
    marginTop: StatusBar.currentHeight || 0,
    
  },
  item: {
    padding: 10,
    paddingBottom:20,
    
    
    
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default App;


