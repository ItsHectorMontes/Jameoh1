import React, { useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity,Image } from "react-native";

const DATA = [
  {
    id: "1",
    title: "pollos, carnes y parrillas",
    url: '../../../assets/categorias/1.png',    
  },
  




];

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Image
        style={styles.tinyLogo}
        source={require('../../../assets/categorias/1.png')}          
        
      />     
    
    
    
  </TouchableOpacity>
);

const App = () => {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        
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
    fontSize: 100,
    fontWeight: "bold",
  },
});
export default App;


