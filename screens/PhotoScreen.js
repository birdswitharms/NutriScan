import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function PhotoScreen({ navigation }) {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState(null);
  const cameraRef = useRef(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const options = {
          quality: 0.8,
          base64: true,
          exif: false
        };

        const photo = await cameraRef.current.takePictureAsync(options);
        setPhoto(photo);
        console.log('Photo taken');

        // Save to device gallery
        await MediaLibrary.saveToLibraryAsync(photo.uri);

        // Navigate to Service screen with the photo data instead of Details
        navigation.navigate('Service', {
          photoUri: photo.uri
        });
      } catch (error) {
        console.error("Error taking picture:", error);
        alert('Failed to take picture: ' + error.message);
      }
    } else {
      alert('Camera not ready');
    }
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <Text style={styles.text}>Take Photo</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent',
    margin: 64,
    justifyContent: 'flex-end',
  },
  flipButton: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  captureButton: {
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default PhotoScreen;
