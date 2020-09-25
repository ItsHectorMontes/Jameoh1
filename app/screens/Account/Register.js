import React, { useRef } from "react";
import { StyleSheet, View, Image } from "react-native";
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
      {/* <LoginFacebook toastRef={toastRef} /> */}
        <RegisterForm toastRef={toastRef} />
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
});
