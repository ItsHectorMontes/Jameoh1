import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

export default function AllCategories({setSelectedId}) {
  return (
    <TouchableOpacity style={styles.button} onPress={setSelectedId}>
      <Text style={styles.text}>Mostrar</Text>
      <Text style={styles.text}>Todos</Text>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2ec1ac',
    width: 100,
    height: 100,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginHorizontal: 10,
  },
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
    alignSelf: 'center',
    color: '#555',
  },
});