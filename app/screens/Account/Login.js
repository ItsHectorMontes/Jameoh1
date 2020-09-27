import React, { useRef } from "react";
import { StyleSheet, View, ScrollView, Text, Image,Linking } from "react-native";
import { Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-easy-toast";
import LoginForm from "../../components/Account/LoginForm";
import LoginFacebook from "../../components/Account/LoginFacebook";
import { Container, Content} from 'native-base'

export default function Login() {
  const toastRef = useRef();

  return (
    <Container>
      <Content>
      <View style={styles.container}>
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
        <View style={styles.footercontainer}>
          <View style={styles.footer}/> 
        </View>
        <Toast ref={toastRef} position="center" opacity={0.9} />
      </View >
      </Content>
    </Container>
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
    marginTop: 50,
    marginBottom:20,
  },
  viewContainer: {
    marginRight: 30,
    marginLeft: 30,
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
    margin: 30,
  },
  textointro:{
    textAlign: 'center',
    paddingBottom:10,
    fontWeight: 'bold',
    color:"#541204",

  },
  footercontainer: {
    width: '100%',
    alignItems: 'center'
  },
  footer:{
    marginTop: 30,
    width:"140%",
    height: 200,
    borderTopStartRadius: 250,
    borderTopEndRadius : 250 ,
    backgroundColor: '#FDD367'  
  }
});