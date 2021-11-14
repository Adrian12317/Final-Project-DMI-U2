import React from 'react'
import { useNavigation } from "@react-navigation/core";
import { auth } from '../../firebase';
import { TouchableOpacity,Text } from 'react-native';

export default function Logout() {
    const navigation = useNavigation();
    const handleSignOut = () => {
        auth
          .signOut()
          .then(() => {
            navigation.replace("Login");
          })
          .catch((error) => {
            alert(error.message);
          });
      };
    return(
 
     <TouchableOpacity onPress={handleSignOut}>
        <Text >Sign Out</Text>
     </TouchableOpacity>

    );
}