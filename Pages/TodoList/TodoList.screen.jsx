import React, { useLayoutEffect, useState } from 'react'
import { TextInput, View,Text,StyleSheet,ScrollView,TouchableOpacity } from 'react-native';
import { database,auth } from '../../firebase';
import { useEffect } from 'react';
import { Button } from 'react-native-elements';
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
     <View style={styles.container}>
      <Text>Add an item to your list</Text>
      
   

   
            <TextInput
                onChangeText={setNewItem}
                value={newItem}
                placeholder="Add new item"
                keyboardType="text"
                style={styles.input}
             />

             
            <TouchableOpacity
             onPress={() => handleSaveItem()}
             variant="outline-secondary"
             id="button-addon2"
             style={styles.button}
             >
            <Text style={styles.buttonText}> Add </Text>
            </TouchableOpacity>   
            <ScrollView style={styles.scrollView}>
            {
            list?.map((x,i)=>(
             
            <View style={styles.row} key={i}>

              
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
                 
            </View>
            ))
                
            }

            </ScrollView>  

        
    
       
    
      
     </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "black",
    },
    scrollView: {
        backgroundColor: 'black',
        marginBottom:20,
        marginHorizontal:40
        
      },
     
    input: {
      backgroundColor: "white",
      color:"black",
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
      borderColor:"white",
      width:"70%"
    },
    button: {
      backgroundColor: "#0782F9",
      width: "50%",
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
      marginTop:4,
      marginBottom:10
    },
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
    buttonText: {
      color: "white",
      fontWeight: "700",
      fontSize: 16,
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
    },

    row:{
        flexWrap: 'wrap', 
        alignItems: 'flex-start',
        flexDirection:'row',
    }
   
  });