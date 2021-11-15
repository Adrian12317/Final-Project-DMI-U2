import React, { useState } from 'react'
import { View,Text,StyleSheet,ScrollView } from 'react-native';
import { database,auth } from '../../firebase';
import { useEffect } from 'react';
import { Button } from 'react-native-elements';
import {
  StyledContainer,
  StyledAddInput,
  StyledButton,
  StyledButtonText,
  StyledScrollView,
  ItemsView,
  StyledButtonDone
} from './styledToDoListComponent';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function TodoList() {
    
    const [list,setList] = useState([])
    const [newItem,setNewItem] = useState("");

    const getItems = () =>{
        const data = database.ref('TodoList').orderByChild('uid').equalTo(auth.currentUser.uid)
        data.on('value',(snapshot)=>{
           const values = snapshot.val()
           const allValues = []
           for (let id in values){
            allValues.push({id,...values[id]})
           }
           console.log(allValues);
           setList(allValues)      
            
        })
    }
    useEffect(()=>{
        getItems()
    },[])

 
    const handleSaveItem = () => {
       const ref = database.ref('TodoList');
       const data = {
           title:newItem,
           done:false,
           uid:auth.currentUser.uid
       }
       ref.push(data);
       getItems()
       setNewItem("");
    }

    const handleDone = (data) =>{
        const ref = database.ref('TodoList').child(data.id);
        
        ref.update({
            done:!data.done
        })
    }

    const handleDelete = (id) =>{
        const ref = database.ref('TodoList').child(id);
        ref.remove();
    }

    return(
     <StyledContainer>
        <StyledAddInput
            onChangeText={setNewItem}
            value={newItem}
            placeholder="Add new item"
            keyboardType="text"
        /> 
        <StyledButton
          onPress={() => handleSaveItem()}
          variant="outline-secondary"
          id="button-addon2"
        >
          <StyledButtonText>Add</StyledButtonText>
        </StyledButton>   
        <StyledScrollView>
        {
        list?.map((x,i)=>(
          
        <ItemsView key={i}> 
          <Text style={x.done?styles.textDecoration:styles.text}> {x.title} </Text>
          <Button
              icon={
                  <Icon
                  name="check"
                  size={15}
                  color="white"
                  />
              }
              onPress={()=>handleDone(x)}
              buttonStyle={styles.buttonItemDone}
          />

          <Button
              icon={
                  <Icon
                  name="remove"
                  size={15}
                  color="white"
                  />
              }
              onPress={()=>handleDelete(x.id)}
              buttonStyle={styles.buttonItemRemove}
          />  
        </ItemsView>
        ))
            
        }
        </StyledScrollView>  
     </StyledContainer>
        
    );
}

const styles = StyleSheet.create({
    buttonItemDone: {
      borderColor: "#1bf907",
      borderWidth: 3,
      borderRadius:100,
      marginRight:5
    },
    buttonItemRemove: {
        borderColor: "#f90707",
        borderWidth: 3,
        borderRadius:100
      },
    text: {
      color: "white",
      fontWeight: "700",
      fontSize: 18,
      marginTop:3
    },
    textDecoration: {
      color: "green",
      fontWeight: "700",
      fontSize: 18,
      marginTop:3,
      textDecorationLine:'line-through'
    }   
  });