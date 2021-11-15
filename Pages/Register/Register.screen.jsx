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

import { auth, database } from "../../firebase";
import logo from "../../media/images/utags.png";
const RegisterPage = () => {

  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
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
    auth
      .createUserWithEmailAndPassword(email, pwd)
      .then((userCredentials) => {
       
        const user = userCredentials.user;


        const ref = database.ref('Profile/');
        const data = {
            id:user.uid,
            username:userName,
            email:user.email,
            avatar:""
        }

       ref.push(data).then(()=>{
        console.log(".................");
        console.log("usuario registrado: ");
        console.log(user.email);
        console.log(user.uid);
        console.log();
        console.log(".................");
       });
        

      })
      .catch((error) => {
        
        alert(error.message);
      });
  };

  const handleReturnLogin = () => {
    navigation.replace("Login");
  };
  

  return (
   
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <Image source={logo} style={styles.logo} />

        <TextInput
          placeholder="Username"
          value={userName}
          onChangeText={(text) => setUserName(text)}
          style={styles.input}
        />
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
        <TouchableOpacity
          onPress={handleSignup}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Sign Up</Text>
        </TouchableOpacity>
        <Text onClick={()=>handleReturnLogin()} style={styles.buttonTextBack}> Back to login </Text>
      </View>
    </KeyboardAvoidingView>
  );
};
export default RegisterPage;

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
  buttonTextBack: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    marginTop:5
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
