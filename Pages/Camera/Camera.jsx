import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity,ImageBackground,ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import { useIsFocused } from "@react-navigation/native";
import { styles } from './styledCamera';
import { auth,storage} from '../../firebase';
import * as ImagePicker from 'expo-image-picker';

export default function CameraScreen({setTakePhoto,setAvatar}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isLoading, setIsLoading] = useState(false);
  let camera = Camera;
  const isFocused = useIsFocused();


 
   const __takePicture = async () => {
   
     const photo = await camera.takePictureAsync();
        
     const response = await fetch(photo.uri);
     const blob = await response.blob();
     setIsLoading(true)
     await storage.ref(auth.currentUser.uid + '/profile.jpg').put (blob).then (function (res) {
        setAvatar(photo.uri)
        setTakePhoto(false)
        setIsLoading(false)
      }).catch(error => {
        console.log(error.message);
      })
      
   };

   const __pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    const response = await fetch(result.uri);
     const blob = await response.blob();
     setIsLoading(true)
     await storage.ref(auth.currentUser.uid + '/profile.jpg').put (blob).then (function (res) {
        setAvatar(result.uri)
        setTakePhoto(false)
        setIsLoading(false)
      }).catch(error => {
        console.log(error.message);
      })
    

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  
   const __switchCamera = () => {
    if (type === Camera.Constants.Type.back) {
      setType(Camera.Constants.Type.front);
    } else {
      setType(Camera.Constants.Type.back);
    }
  };
  

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  
  return (
 
  <View style={styles.container}> 
    {isLoading?(
    <ActivityIndicator size="large" color="#0000ff" />
    ):
    (
        <Text></Text>
    )
}

  {isFocused ? (
    <View style={styles.container}>
    <Camera
    style={styles.camera}
    type={type}
    ref={(r) => {
      camera = r; //Passing always the current reference to the global camera
    }}
    >
          <View style={styles.returnProfile}>
      <TouchableOpacity
          onPress={()=>{setTakePhoto(false)}}
          
        >
            <ImageBackground
            source={{ uri: 'https://cdn-icons.flaticon.com/png/512/4495/premium/4495678.png?token=exp=1636851275~hmac=56691b5caf11a2bed9663443f96509a0' }}
            style={{
              height: 40,
              width: 40,
                           
            }}
          />
      </TouchableOpacity>
      </View>
      
    <View style={styles.changeCamera}>
    <TouchableOpacity
          onPress={__switchCamera}
          
        >
            <ImageBackground
            source={{ uri: 'https://cdn-icons.flaticon.com/png/512/1817/premium/1817493.png?token=exp=1636148419~hmac=6353f73ce8403e396144071568f33cfc' }}
            style={{
              height: 40,
              width: 40,
              float:'rigth'
                           
            }}
          />
      </TouchableOpacity>
      </View>

      <View style={styles.pickImage}>
    <TouchableOpacity
          onPress={__pickImage}
          
        >
            <ImageBackground
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/5510/5510468.png' }}
            style={{
              height: 40,
              width: 40,
              float:'rigth'
                           
            }}
          />
      </TouchableOpacity>
      </View>
      
    
      
     <View style={styles.cameraBottomContainer}>
          <View style={styles.cameraBottomInnerContainer}>
            <TouchableOpacity
              onPress={__takePicture}
              style={styles.cameraTakePictureButtonContainer}
            >
               <ImageBackground
                source={{ uri: 'https://cdn-icons.flaticon.com/png/512/1998/premium/1998337.png?token=exp=1636148360~hmac=ca624c3b49c35ed781bb0d384f409d26' }}
                style={{
                  height: 60,
                  width: 62,
                  
                  
                }}
              />
              </TouchableOpacity>
              
          </View>
        </View>
    
    </Camera>
  </View>

    ) : (
      <>
        <Text></Text>
      </>
    )}
    </View>

    
  );

  
}


  