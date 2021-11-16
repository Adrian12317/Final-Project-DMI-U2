import React from 'react'
import { useNavigation } from "@react-navigation/core";
import { auth } from '../../firebase';
import { TouchableOpacity } from 'react-native';
import { StyledView, StyledIcon } from './StyleLogout'
import Ionicons from 'react-native-vector-icons/Ionicons'


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

      <StyledView>
        <TouchableOpacity onPress={handleSignOut}>
          <StyledIcon>
            <Ionicons name="log-out" size={35}/>
          </StyledIcon>
          
        </TouchableOpacity>
      </StyledView>
     

    );
}