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
  InputContainer,
  ImageLogo,
  StyledInput,
  StyledButtonContainer,
  StyledButtonText,
  StyledButtonTextOutline,
  StyledButton,
  StyledButtonOutline } from './styledLogin';

import { auth } from "../../firebase";
import logo from "../../media/images/login.png";
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
    <InputContainer>
      <ImageLogo source={logo}/>

      <StyledInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <StyledInput
          placeholder="Password"
          value={pwd}
          onChangeText={(text) => setPwd(text)}
          secureTextEntry
        />
    </InputContainer>

    <StyledButtonContainer>
      <StyledButton onPress={handleLogin}>
          <StyledButtonText>Login</StyledButtonText>
      </StyledButton>
      <StyledButton onPress={handleSignup}>
        <StyledButtonText>Sign Up</StyledButtonText>
      </StyledButton>
    </StyledButtonContainer>
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
