import React,{useState} from 'react';
import { View, Text, TouchableOpacity,ScrollView,TextInput, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";

import { colors } from '../../Constants/index';
import MapView, { Marker } from 'react-native-maps';
import CustomButton from '../../components/CustomButton';
const EnterMorePickerlocation = ({ navigation }) => {
    const [text, setText] = useState('');
    const mapStyle = [
      { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
      { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
      { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{ color: '#263c3f' }],
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#6b9a76' }],
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#38414e' }],
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#212a37' }],
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9ca5b3' }],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#746855' }],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#1f2835' }],
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#f3d19c' }],
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{ color: '#2f3948' }],
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#17263c' }],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#515c6d' }],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#17263c' }],
      },
    ];
  return (
    <View style={styles.container}>
         <View style={styles.viewOne}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="gray" style={styles.arrowStyle} />
          </TouchableOpacity>
          <View style={styles.inputView}>
          <View style={{flexDirection:'column',width:wp(5),marginRight:wp(2)}}>
         <View style={styles.circle} />
      <View style={styles.line} />
      <View style={styles.rectangle} />
         </View> 
         <View style={{flexDirection:'column',width:wp(90)}}>
   <TextInput placeholder="Enter Picker Point" 
       onChangeText={newText => setText(newText)}
       defaultValue={text}
       style={styles.inputStyle}
       placeholderTextColor={'gray'}
       onFocus={() => navigation.navigate('PickSaveLocation')}
       />
       <TouchableOpacity onPress={()=>navigation.navigate('AddMoreInputField')}>
       <Text style={styles.textStyle}>+Via Point</Text>
       </TouchableOpacity>

      
        <TextInput placeholder="Where to?" 
       onChangeText={newText => setText(newText)}
       defaultValue={text}
       style={styles.inputStyle}
       placeholderTextColor={'gray'}
       />
         </View>
      
      </View>
</View>
       
<View style={styles.mapView}>
<MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            draggable
            coordinate={{
              latitude: 37.78825,
              longitude: -122.4324,
            }}
            onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
            title={'Test Marker'}
            description={'This is a description of the marker'}
          />
        </MapView>
</View>
<View style={styles.btnView}>
        <CustomButton
          onPress={() => navigation.navigate('AddMoreInputField')}
          title="Done"
         
        />
      </View>
    </View>
     
 
  );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:colors.White,
   
    },
    viewOne:{
    height:hp(25),
     backgroundColor:'red',
      backgroundColor:colors.lightblack
    },
    textStyle:{
color:colors.White,
fontSize:12,
paddingLeft:wp(5)
    },
    inputView:{
flexDirection:'row',
height:hp(20),

margin:2
    },
    inputStyle:{
        backgroundColor:'black',
      width:'88%',
      justifyContent:'center',
      alignSelf:'center',
      paddingHorizontal:wp(2),
      margin:hp(1),
      margin:wp(2),
      elevation:10,
      shadowOpacity:10,
      shadowColor:'black'
    },
   
    title: {
      fontSize: 24,
      color: 'white',
      marginBottom: 40,
      marginTop:20,
      textAlign: 'left',
      fontWeight:'500'
    
    },
    inputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: 300,
      alignSelf: 'center',
    },  mapStyle: {
      ...StyleSheet.absoluteFillObject,
    },
    input: {
      color: 'white',
      borderBottomWidth: 1,
      borderBottomColor: '#DADADA',
      width: 140,
      padding: 8,
      fontSize: 16,
    },
    arrowStyle: {
      marginRight: 'auto',
      paddingHorizontal:wp(2),
      paddingVertical:hp(1)
    },
    btnView: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: hp(3),
      width: '100%',
    },
    button: {
      backgroundColor: '#000',
      paddingVertical: hp(2),
      borderRadius: 5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: wp(90),
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
    },
    mapView:{
      flex:1,
      backgroundColor:'white'
    },
    circle: {
      width: hp(1.3),
      height: hp(1.3),
      borderRadius: 10,
      backgroundColor: colors.greish,
      marginLeft: wp(6.2),
      marginTop:hp(3)
    },
    line: {
      // flex: 1,
      height: hp(9),
      width:wp(0.4),
      backgroundColor: colors.greish,
      marginLeft: wp(7.5),
    },
    rectangle: {
      width: hp(1.3),
      height: hp(1.3),
      backgroundColor: colors.greish,
      marginLeft: wp(6.3),
    },
  });

export default EnterMorePickerlocation;
