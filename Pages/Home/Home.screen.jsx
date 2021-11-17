import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import TodoList from '../TodoList';
import Profile from '../Profile';
import LogOut from '../Logout';



const Tab = createBottomTabNavigator();

export default function HomePage() {
  const [photos,setPhotos] = useState([])

  return (
    <>
      <Tab.Navigator screenOptions={({route})=>({
        tabBarIcon:({focused,color,size})=>{
          let iconName;
         if (route.name === "TodoList") {
            iconName = focused ?
            "ios-list-sharp"
            :
            "ios-list-outline";
          }else if (route.name === "Profile") {
            iconName = focused ?
            "ios-person-sharp"
            :
            "ios-person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color}/>;
        },
        tabBarActiveTintColor: "#cf8538",
        tabBarInactiveTintColor :"grey",
      })}
      >


        <Tab.Screen name="TodoList"
         options={{
          headerRight: () => (
            <LogOut  />
          ),
        }}
        >
        {(props) => <TodoList{...props} />}</Tab.Screen>


        <Tab.Screen name="Profile"
         options={{
          headerRight: () => (
            <LogOut  />
          ),
        }}
        >
        {(props) => <Profile{...props} />}</Tab.Screen>

      </Tab.Navigator>
    </>
  );
}
