import React from "react";
import { StyleSheet, View, Text, Image,Linking, ImageBackground} from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { Content, Header, Container } from 'native-base'
export default function UserGuest() {
  const navigation = useNavigation();

  return (
    <View style={styles.viewBody}>
      <ImageBackground
        source={require("../../../assets/img/user-guest.png")}
        style={styles.image}>
        <View style={styles.first}>
          <Button
            title="Iniciar Sesión"
            buttonStyle={styles.btnStyle}
            containerStyle={styles.btnContainer}
            onPress={() => navigation.navigate("login")}
          />
          <Button
            title="Crear Cuenta"
            buttonStyle={styles.btnStyle}
            containerStyle={styles.btnContainerr}
            onPress={() => navigation.navigate("register")}
          />
            
        </View>
        <View style={styles.second}>
          <Text style={styles.textointro}
          onPress={() => Linking.openURL('http://google.com')}
          >Consulte nuestro aviso de privacidad, {"\n"}terminos y condiciones</Text>
        </View>
      </ImageBackground>   
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
<<<<<<< HEAD
    
    flex: 1, 
    marginTop:30,
    
    
=======
    flex: 1
>>>>>>> 0276dc72d589e21c8cc9706ad37101d3ad8931b6
  },
  image: {
    paddingTop: 70,
    flex: 1,

  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    marginBottom: 20,
  },
  viewBtn: {
    flex: 1,
    alignItems: "center",

  },
  btnStyle: {
    backgroundColor: "#541204",
    elevation: 8,    
    borderRadius:20,
    paddingVertical: 15,
    paddingHorizontal: 17,
    
  },
  btnContainer: {
    marginEnd: 15,
       
    
  },
  btnContainerr: {
    marginStart: 15

    
  },
  textointro:{
    textAlign: 'center',
    paddingBottom:20,
    fontWeight: 'bold',
    color:"#541204",

  },
  first: {
    flex : 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  second: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
});
