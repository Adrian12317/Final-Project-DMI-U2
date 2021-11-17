import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity,ImageBackground,ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import { useIsFocused } from "@react-navigation/native";
import { styles } from './styledCamera';
import { auth,storage} from '../../firebase';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "@react-navigation/core";
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function CameraScreen({setTakePhoto,setAvatar}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isLoading, setIsLoading] = useState(false);
  let camera = Camera;
  const isFocused = useIsFocused();
  const navigation = useNavigation();



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

  const __back = () => {
    navigation.replace("Home");
  }


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
    <ActivityIndicator size="large" color="#5cca0e" />
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
            <Ionicons name="chevron-back" size={50}/>
      </TouchableOpacity>
      </View>

    <View style={styles.changeCamera}>
    <TouchableOpacity
          onPress={__switchCamera}

        >
            <Ionicons name="camera-reverse" size={50}/>
      </TouchableOpacity>
      </View>

      <View style={styles.pickImage}>
    <TouchableOpacity
          onPress={__pickImage}

        >
            <Ionicons name="images" size={50}/>
      </TouchableOpacity>
      </View>

      <View style={styles.goBack}>
        <TouchableOpacity
          onPress={__back}>
              {/* <Ionicons name="chevron-back" size={50}/> */}
        </TouchableOpacity>
      </View>


     <View style={styles.cameraBottomContainer}>
          <View style={styles.cameraBottomInnerContainer}>
            <TouchableOpacity
              onPress={__takePicture}
              style={styles.cameraTakePictureButtonContainer}
            >
               <Ionicons name="aperture" size={65}/>
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
