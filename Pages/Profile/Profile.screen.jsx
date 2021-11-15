import React, { useState,useEffect } from 'react'
import { Avatar } from 'react-native-elements';
import CameraScreen from '../Camera/Camera';
import { database,auth,storage } from '../../firebase';
import {StyledContainer, StyledText} from './styledProfileComponent';

export default function Profile() {
    const [takePhoto,setTakePhoto] = useState(false)
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [avatar,setAvatar] = useState("")

    useEffect(()=>{
        const data = database.ref('Profile').orderByChild('id').equalTo(auth.currentUser.uid)
        data.on('value',(snapshot)=>{
            const values = snapshot.val()
            
             const myData = []
            for (let id in values){
                myData.push({id,...values[id]})
            }
             setName(myData[0].username);
             setEmail(myData[0].email);     
         })
         storage.ref(auth.currentUser.uid + '/profile.jpg').getDownloadURL ().then((imgUrl) => {
            setAvatar(imgUrl); 
        })
    
    },[])

    

    return(
        <>
        {!takePhoto?(
            
        <StyledContainer>
            <StyledText>Profile</StyledText>
            <Avatar
                rounded
                size="xlarge"
                source={{
                    uri:avatar?avatar:"https://thumbs.dreamstime.com/b/default-avatar-profile-flat-icon-vector-contact-symbol-illustration-184752213.jpg",
                }}
                onPress={()=>setTakePhoto(true)}
            />
            <StyledText>{name}</StyledText>
            <StyledText>{email}</StyledText>
        </StyledContainer>
        ):
        (
            <CameraScreen setTakePhoto={setTakePhoto} setAvatar={setAvatar}/>
        )

        }
        </>
        
    );
}