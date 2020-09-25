import React from "react";
import { StyleSheet, View, ScrollView, Text, Image,Linking} from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

export default function UserGuest() {
  const navigation = useNavigation();

  return (
    <View centerContent={true} style={styles.viewBody}>
      <Image
        source={require("../../../assets/img/user-guest.png")}
        style={styles.image}
      ></Image>      
      
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
        <Text style={styles.textointro}
        onPress={() => Linking.openURL('http://google.com')}
        >Consulte nuestro aviso de privacidad, {"\n"}terminos y condiciones</Text>


  

        
      
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    
    flex: 1, 
    marginTop:60,
    
    
  },
  image: {
    
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    width: null,
    marginBottom:-90,

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
    
    margin: 30,
    position: "absolute",
    top: -10,
    alignSelf:"flex-start",
       
    
  },
  btnContainerr: {
    
    
    position: "absolute",
    top: 21,
    right:20,    
    
    alignSelf:"flex-end",   
    
  },
  textointro:{
    textAlign: 'center',
    paddingBottom:20,
    fontWeight: 'bold',
    color:"#541204",

  },
});
