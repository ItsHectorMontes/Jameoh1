import React, { useState } from "react";
import { StyleSheet, View,Linking } from "react-native";
import { Input, Icon} from "react-native-elements";
import { isEmpty } from "lodash";
import * as firebase from "firebase";
import { validateEmail } from "../../utils/validations";
import Loading from "../Loading";
import { useSelector, useDispatch } from 'react-redux';
import { Button,Text} from 'native-base'
export default function LoginForm(props) {
  const { toastRef } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultFormValue());
  const [loading, setLoading] = useState(false);
  const sessiontype = useSelector(state => state.userdata.sessiontype)
  const dispatch = useDispatch()

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const onSubmit = () => {
    if (isEmpty(formData.email) || isEmpty(formData.password)) { 
      toastRef.current.show("Todos los campos son obligatorios");
    } else if (!validateEmail(formData.email)) {
      toastRef.current.show("El email no es correcto");
    } else {
      setLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          setLoading(false);
          dispatch({type : 'OnUserSession', payload: {sessiontype : 2, userdata : {
            username: 'invitado', email : 'Bienvenido'}}})
        })
        .catch(() => {
          setLoading(false);
          toastRef.current.show("Email o contraseña incorrecta");
        });
    }
  };

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Correo electronico"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "email")}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.inputForm}
        password={true}
        secureTextEntry={showPassword ? false : true}
        onChange={(e) => onChange(e, "password")}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <View style={styles.btncontainer}>
      <Button rounded style={styles.btnLogin}
      onPress={onSubmit}>
        <Text>
          Iniciar Sesión
        </Text>
      </Button>
      </View>
      <Loading isVisible={loading} text="Iniciando sesión" />  
    </View>
  );
}

function defaultFormValue() {
  return {
    email: "",
    password: "",
  };
}

const styles = StyleSheet.create({
  formContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  btncontainer: {
    marginVertical: 15
  },
  btnLogin: {
    backgroundColor: "#541204",
  },
  iconRight: {
    color: "#c1c1c1",
  },
});