import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { 
  StyledContainer,
  StyledinputContainer,
  Styledinput,
  StyledbuttonContainer,
  StyledbuttonOutline,  
  Styledlogo } from './styledLogin';

import { Styledbutton, 
  StyledbuttonText,
  StyledbuttonOutlineText,} from './styledBtnLogin';
  
import { auth } from "../../firebase";
import logo from "../../media/images/utags.png";
const LoginPage = () => {

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const navigation = useNavigation();
  
  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged((user) => {
     
      if (user) {
       
        navigation.replace("Home");
      }
    });
    
    return unsuscribe;
  }, []);
  
  const handleSignup = () => {
    navigation.replace("Register");
  };
  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, pwd)
      .then((userCredentials) => {
   
        const user = userCredentials.user;
      })
      .catch((error) => {
       
        alert(error.message);
      });
  };

  return (
    <StyledContainer>
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <StyledinputContainer >
        <Styledlogo source={logo} style={styles.logo} />
      
        <Styledinput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Styledinput
          placeholder="Password"
          value={pwd}
          onChangeText={(text) => setPwd(text)}
          secureTextEntry
        />
      </StyledinputContainer>
     
      <StyledbuttonContainer style={styles.buttonContainer}>
        <Styledbutton onPress={handleLogin} style={styles.button}>
          <StyledbuttonText style={styles.buttonText}>Login</StyledbuttonText>
        </Styledbutton>
        <Styledbutton
          onPress={handleSignup}
          style={[styles.button, styles.buttonOutline]}
        >
          <StyledbuttonText>Sign Up</StyledbuttonText>
        </Styledbutton>
      </StyledbuttonContainer>
    </KeyboardAvoidingView>
    </StyledContainer>
  );
};
export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#cf8538",
  },

});
