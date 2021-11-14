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
        console.log("Logged in with:", user.email);
      })
      .catch((error) => {
       
        alert(error.message);
      });
  };

  return (
   
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <Image source={logo} style={styles.logo} />
      
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={pwd}
          onChangeText={(text) => setPwd(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
     
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignup}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    color:"black",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderColor:"white"
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
  logo: {
    width: 220,
    height: 220,
    marginLeft: 40,
    marginBottom: 20,
  },
});
