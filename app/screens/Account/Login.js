import React, { useRef } from "react";
import { StyleSheet, View, ScrollView, Text, Image,Linking } from "react-native";
import { Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-easy-toast";
import LoginForm from "../../components/Account/LoginForm";
import LoginFacebook from "../../components/Account/LoginFacebook";

export default function Login() {
  const toastRef = useRef();

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("../../../assets/img/register.png")}
        resizeMode="contain"
        style={styles.logo}
      />
       <View style={styles.viewContainer}>
        <LoginFacebook toastRef={toastRef} />
      </View>
      <View style={styles.viewContainer}>
        <LoginForm toastRef={toastRef} />
        <CreateAccount />
      </View>
      <Divider style={styles.divider} />
      <Text style={styles.textointro}
        onPress={() => Linking.openURL('http://google.com')}
        >Consulte nuestro aviso de privacidad, {"\n"}terminos y condiciones</Text>
      <Image
       style={styles.footer}
      source={require("../../../assets/img/footer.png")}
      
      >

      </Image>
     
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </ScrollView >
  );
}

function CreateAccount() {
  const navigation = useNavigation();

  return (
    <Text style={styles.textRegister}>
      ¿Aún no tienes una cuenta?{" "}
      <Text
        style={styles.btnRegister}
        onPress={() => navigation.navigate("register")}
      >
        Regístrate
      </Text>       
    </Text>
     
   
    
    
    
    
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 130,
    marginTop: 80,
    marginBottom:20,
  },
  viewContainer: {
    marginRight: 40,
    marginLeft: 40,
  },
  textRegister: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  btnRegister: {
    color: "#541204",
    fontWeight: "bold",
  },
  divider: {
    backgroundColor: "#541204",
    margin: 40,
  },
  textointro:{
    textAlign: 'center',
    paddingBottom:20,
    fontWeight: 'bold',
    color:"#541204",

  },
  footer:{
    width:"100%",
    height: 200,
    borderTopStartRadius: 40,
    borderTopEndRadius : 40    
  }
});