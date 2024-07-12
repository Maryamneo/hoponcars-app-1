import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, Linking,Touchable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RNCamera } from 'react-native-camera';
import ImageCropPicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { colors } from '../Constants/index';
import CustomButton from '../components/CustomButton';

const TermAndPolicy = ({ navigation }) => {
  const [imagePath, setImagePath] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [cameraVisible, setCameraVisible] = useState(false);

  const openImagePicker = () => {
    setModalVisible(true);
  };

  const takePictureFromCamera = async (camera) => {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    const binary = await RNFS.readFile(data.uri, 'base64');
    const file = {
      mimeType: "image/jpeg",
      name: "photo.jpg",
      size: data.width * data.height,
      type: "jpg",
      uri: data.uri,
      binary: binary,
    };
    setImagePath(data.uri);
    setModalVisible(false);
    setCameraVisible(false);
  };

  const choosePictureFromGallery = () => {
    ImageCropPicker.openPicker({
      width: 140,
      height: 190,
      cropping: true,
    })
      .then((image) => {
        setImagePath(image.path);
        setModalVisible(false);
      })
      .catch((error) => {
        console.log("Error choosing from gallery:", error);
        setModalVisible(false);
      });
  };

  const openURL = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={25} color={"gray"} style={styles.arrowStyle} />
      </TouchableOpacity>
      <View style={styles.secView}>
        <View style={styles.imgContainer}>
          <View style={styles.imgView} onPress={openImagePicker}>
            <Image
              source={imagePath ? { uri: imagePath } : require('../Images/profille.png')}
              style={styles.imgStyle}
            />
          </View>
          <TouchableOpacity onPress={openImagePicker} style={{bottom:20,left:30,borderRadius:10}}>
            <Image
              source={require('../Images/camera.png')}
              style={styles.cameraImg}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.textView}>
          <Text style={[styles.textStyle, { marginTop: 40 }]}>
            By tapping the arrow below, you agree to Uber’s Terms of Use and acknowledge that you have read the Privacy Policy
          </Text>
        </View>
        <View style={styles.textView}>
          <Text style={styles.textStyle}>
            Check the box to indicate that you are at least 18 years of age, agree to the{' '}
            <TouchableOpacity onPress={() => openURL('https://hoponcars.com')}>
              <Text style={styles.termStyle}>Terms & Conditions</Text>
            </TouchableOpacity>{' '}
            and acknowledge the{' '}
            <TouchableOpacity onPress={() => openURL('https://hoponcars.com')}>
              <Text style={styles.termStyle}>Privacy Policy</Text>
            </TouchableOpacity>.
          </Text>
        </View>
      </View>
      <View style={styles.btnView}>
        <CustomButton
          onPress={() => navigation.navigate('LoginUser')}
          title="Next"
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setCameraVisible(true);
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalText}>Take Picture</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={choosePictureFromGallery}
            >
              <Text style={styles.modalText}>Choose from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.modalText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {cameraVisible && (
        <Modal
          animationType="slide"
          transparent={false}
          visible={cameraVisible}
          onRequestClose={() => {
            setCameraVisible(false);
          }}
        >
          <RNCamera
            style={styles.camera}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
          >
            {({ camera, status }) => {
              if (status !== 'READY') return <View><Text>Waiting</Text></View>;
              return (
                <View style={styles.cameraButtonContainer}>
                  <TouchableOpacity
                    onPress={() => takePictureFromCamera(camera)}
                    style={styles.cameraButton}
                  >
                    <Text style={styles.cameraButtonText}> SNAP </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setCameraVisible(false)}
                    style={styles.cameraButton}
                  >
                    <Text style={styles.cameraButtonText}> Cancel </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          </RNCamera>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    padding: 16,
    justifyContent: 'space-between',
  },
  secView: {
    flex: 1,
  },
  imgContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  imgView: {
    marginTop: hp(5),
    height: hp(20),
    width: wp(40),
    borderRadius: hp(15),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraButton: {
    position: 'absolute',
    bottom: hp(20),
    left: wp(2),
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 20,
    padding: 5,
    backgroundColor: 'black',
    overflow: 'hidden',
    elevation: 20,
  },
  cameraImg: {
    height: hp(5),
    width: hp(5),
    borderRadius:20
  },
  arrowStyle: {
    marginRight: 'auto',
  },
  btnView: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: hp(3),
  },
  textView: {
    flex: 1,
    width: wp(90),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  imgStyle: {
    height: '100%',
    width: '100%',
    borderRadius: hp(15),
  },
  termStyle: {
    color: colors.purpleblue,
    fontSize: 11,
    fontWeight: '600',
    
  },
  textStyle: {
    fontSize: 14,
    color: '#EDF6FF',
    fontWeight: '400',
    // textAlign: 'left',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 35,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    marginVertical: 10,
    width: '100%',
  },
  buttonClose: {
    backgroundColor: 'transparent',
  },
  modalText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'left',
    width: '100%',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cameraButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  cameraButton: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
    borderWidth: 2,
  },
  cameraButtonText: {
    fontSize: 14,
    color: 'black',
    fontWeight: '600',
  },
});

export default TermAndPolicy;


