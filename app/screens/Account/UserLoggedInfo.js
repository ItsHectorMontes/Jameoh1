import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-elements";
import Toast from "react-native-easy-toast";
import * as firebase from "firebase";
import Loading from "../../components/Loading";
import InfoUserWelcome from "../../components/Account/InfoUserWelcome";
import AccountOptions from "../../components/Account/AccountOptions";
import { ScrollView } from "react-native-gesture-handler";

export default function UserLoggedInfo() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [realoadUserInfo, setRealoadUserInfo] = useState(false);
  const toastRef = useRef();

  useEffect(() => {
    (async () => {
      const user = await firebase.auth().currentUser;
      setUserInfo(user);
    })();
    setRealoadUserInfo(false);
  }, [realoadUserInfo]);

  return (
    <ScrollView >
      {userInfo && (
        <InfoUserWelcome
          userInfo={userInfo}          
        />
      )}
     
    </ScrollView>
  );
}



const styles = StyleSheet.create({


});
