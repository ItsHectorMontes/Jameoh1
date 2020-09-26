import React, { useRef } from "react";
import { StyleSheet, View, Image,Linking,Text} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-easy-toast";
import RegisterForm from "../../components/Account/RegisterForm";
import LoginFacebook from "../../components/Account/LoginFacebook";

export default function Register() {
  const toastRef = useRef();

  return (
    <KeyboardAwareScrollView>
      <Image
        source={require("../../../assets/img/register23.png")}
        resizeMode="contain"
        style={styles.logo}
      />
      
      <View style={styles.viewForm}>
      
        <RegisterForm toastRef={toastRef} />
      </View>
      <View style={styles.footercontainer}>
        <View style={styles.footer}/> 
      </View>
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 200,
    marginTop: 80,
    marginBottom: 20,

  },
  viewForm: {
    marginRight: 40,
    marginLeft: 40,
  },
  footercontainer: {
    width: '100%',
    alignItems: 'center'
  },
  footer:{
    marginTop: 30,
    width:"140%",
    height: 600,
    borderTopStartRadius: 250,
    borderTopEndRadius : 250 ,
    backgroundColor: '#FDD367'  
  }
});
