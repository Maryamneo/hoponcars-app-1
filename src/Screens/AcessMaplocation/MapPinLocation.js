

// import React, { useEffect, useRef, useState } from 'react';
// import { View, Text, TouchableOpacity,Alert,Image, KeyboardAvoidingView, TextInput, StyleSheet, SafeAreaView, Dimensions, Platform } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import MapViewDirections from 'react-native-maps-directions';
// import Geolocation from '@react-native-community/geolocation';
// import axios from 'axios';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
// import { colors } from '../../Constants/index';
// import CustomButton from '../../components/CustomButton';
// import Snackbar from 'react-native-snackbar';
// import { useDispatch, useSelector } from 'react-redux';
// import { setPickerPoint1, setPickerPoint2 } from '../../ReduxStore/actions'; // Adjust the path as necessary

// const screen = Dimensions.get('window');
// const ASPECT_RATIO = screen.width / screen.height;
// const LATITUDE_DELTA = 0.04;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
// const GOOGLE_PLACES_API_KEY = 'AIzaSyBEpezNDENEaLW4Hog5yW5D-YIa5mbBCMA';

// const MapPinLocation = ({ navigation }) => {
//   const dispatch = useDispatch();
//   const mapRef = useRef();
//   const autoCompleteRef1 = useRef();
//   const autoCompleteRef2 = useRef();
//   const [coord, setCoord] = useState(null);
//   const [destination, setDestination] = useState(null);
//   const [location, setLocation] = useState(null);
//   const [otp, setOTP] = useState(['', '', '', '']);
//   const otpTextInputRefs = useRef([]);
//   // const [pickerPoint1, setPickerPoint1] = useState('');
//   // const [pickerPoint2, setPickerPoint2] = useState('');
//   const pickerPoint1 = useSelector((state) => state.pickerPoints.pickerPoint1);
//   const pickerPoint2 = useSelector((state) => state.pickerPoints.pickerPoint2);

//   // const handleNextPress = () => {
//   //   if (!pickerPoint1 || !pickerPoint2) {
//   //     Alert.alert("Validation Error", "Both Picker Points must be filled");
//   //   } else {
//   //     navigation.navigate('Cars');
//   //   }
//   // };
//   const handleNextPress = () => {
  
//     if (!pickerPoint1 || !pickerPoint2)
//      {
    
//       Snackbar.show({
//         text: 'Fill the Filled first ',
//         duration: Snackbar.LENGTH_SHORT,
//         // Styling for Snackbar
//         backgroundColor: 'red', // Example background color
//         textColor: 'white', // Example text color
//         action: {
//           text: 'OK',
//           textColor: 'white',
//           onPress: () => {
//             // Do something when action button is pressed
//           },
//         },
//       });
    
//     } else {
//       navigation.navigate('MoreDetails')
//       // Perform app exit
//       // BackHandler.exitApp();
//       return true;
//     }
//   };


//   const onPressAddress = (data, details = null, isPicker1 = true) => {
//     const location = {
//       latitude: details.geometry.location.lat,
//       longitude: details.geometry.location.lng,
//     };

//     if (isPicker1) {
//       setCoord(location);
//       dispatch(setPickerPoint1(data.description));
//     } else {
//       setDestination(location);
//       dispatch(setPickerPoint2(data.description));
//     }

//     adjustMapToShowBothMarkers(coord, location);
//   };

//   const adjustMapToShowBothMarkers = (origin, destination) => {
//     const midLat = (origin.latitude + destination.latitude) / 2;
//     const midLng = (origin.longitude + destination.longitude) / 2;
//     const latitudeDelta = Math.abs(origin.latitude - destination.latitude) * 1.5;
//     const longitudeDelta = Math.abs(origin.longitude - destination.longitude) * 1.5;
//     mapRef.current.animateToRegion(
//       {
//         latitude: midLat,
//         longitude: midLng,
//         latitudeDelta: latitudeDelta > LATITUDE_DELTA ? latitudeDelta : LATITUDE_DELTA,
//         longitudeDelta: longitudeDelta > LONGITUDE_DELTA ? longitudeDelta : LONGITUDE_DELTA,
//       },
//       2000,
//     );
//   };

//   const getLiveLocation = async () => {
//     Geolocation.getCurrentPosition(
//       position => {
//         const { latitude, longitude } = position.coords;
//         setCoord({
//           latitude: latitude,
//           longitude: longitude,
//           latitudeDelta: LATITUDE_DELTA,
//           longitudeDelta: LONGITUDE_DELTA,
//         });
//         setLocation(position.coords);
//         fetchAddressFromCoordinates(latitude, longitude);
//       },
//       error => console.log(error),
//       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//     );
//   };

//   const fetchAddressFromCoordinates = async (latitude, longitude) => {
//     try {
//       const response = await axios.get(
//         `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_PLACES_API_KEY}`
//       );
//       if (response.data.results.length > 0) {
//         const address = response.data.results[0].formatted_address;
//         if (autoCompleteRef1.current) {
//           autoCompleteRef1.current.setAddressText(address);
//         }
//         dispatch(setPickerPoint1(address));
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     getLiveLocation();
//   }, []);

//   useEffect(() => {
//     if (coord && destination) {
//       adjustMapToShowBothMarkers(coord, destination);
//     }
//   }, [coord, destination]);
//   // const handlePickerPoint1 = (data, details) => {
//   //   const location = {
//   //     latitude: details.geometry.location.lat,
//   //     longitude: details.geometry.location.lng,
//   //   };
//   //   dispatch(setPickerPoint1(data.description));
//   // };

//   // const handlePickerPoint2 = (data, details) => {
//   //   const location = {
//   //     latitude: details.geometry.location.lat,
//   //     longitude: details.geometry.location.lng,
//   //   };
//   //   dispatch(setPickerPoint2(data.description));
//   // };
//   return (
//     <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#1A1A1A' }} behavior="padding">
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Ionicons name="arrow-back" size={24} color="gray" style={styles.arrowStyle} />
//           </TouchableOpacity>
//       <SafeAreaView style={styles.container}>
//         <View style={styles.searchContainer}>
//         <View style={[styles.inputView, { zIndex: 2 , flexDirection:'row'}]}>
//            <View style={styles.circle}/>
//           <GooglePlacesAutocomplete
//             ref={autoCompleteRef1}
//             placeholder="Enter Picker Point 1"
//             fetchDetails={true}
//             onPress={(data, details = null) => onPressAddress(data, details, true)}
//             query={{
//               key: GOOGLE_PLACES_API_KEY,
//               language: 'en',
//               location: location ? `${location.latitude},${location.longitude}` : '',
//               radius: 2000,
//             }}
//             styles={{
//               container: styles.autocompleteContainer,
//               textInputContainer: styles.textInputContainer,
//               textInput: styles.textInput,
//               listView: styles.listView,
//               description: styles.description,
//               predefinedPlacesDescription: styles.predefinedPlacesDescription,
//             }}
//             currentLocation={true}
//             currentLocationLabel="Current Location"
//             predefinedPlacesAlwaysVisible={true}
//             textInputProps={{
//               placeholderTextColor: colors.gray,
//               value: pickerPoint1,
//               onChangeText: (text) => dispatch(setPickerPoint1(text)),
//             }}
//           />
//           </View>
//           <View style={styles.line} />
//          <View style={[styles.inputView, { zIndex: 1, flexDirection: 'row', marginTop: hp(8) }]}>
//            <View style={styles.rectangle} />
//           <GooglePlacesAutocomplete
//             ref={autoCompleteRef2}
//             placeholder="Enter Picker Point 2"
//             fetchDetails={true}
//             onPress={(data, details = null) => onPressAddress(data, details, false)}
//             query={{
//               key: GOOGLE_PLACES_API_KEY,
//               language: 'en',
//               location: location ? `${location.latitude},${location.longitude}` : '',
//               radius: 2000,
//             }}
//             styles={{
//               container: styles.autocompleteContainer,
//               textInputContainer: styles.textInputContainer,
//               textInput: styles.textInput,
//               listView: styles.listView,
//               description: styles.description,
//               predefinedPlacesDescription: styles.predefinedPlacesDescription,
//             }}
//             enablePoweredByContainer={false}
//             textInputProps={{
//               placeholderTextColor: colors.gray,
//               value: pickerPoint2,
//               onChangeText: (text) => dispatch(setPickerPoint2(text)),
//             }}
//           /> 
//           </View>
//         </View>
//         {/* <MapView
//           ref={mapRef}
//           provider={Platform.OS == 'android' ? PROVIDER_GOOGLE : MapView.PROVIDER_GOOGLE}
//           style={styles.map}
//           initialRegion={coord || {
//             latitude: 37.78825,
//             longitude: -122.4324,
//             latitudeDelta: LATITUDE_DELTA,
//             longitudeDelta: LONGITUDE_DELTA,
//           }}>
//           {coord && <Marker coordinate={coord} />}
//           {destination && <Marker coordinate={destination} />}
//           {coord && destination && (
//             <MapViewDirections
//               origin={coord}
//               destination={destination}
//               apikey={GOOGLE_PLACES_API_KEY}
//               strokeColor="black"
//               strokeWidth={2}
//             />
//           )}
//         </MapView> */}
//            <MapView
//         ref={mapRef}
//         provider={PROVIDER_GOOGLE}
//         style={styles.map}
//         initialRegion={coord}
//       >
//         {coord && (
//            <Marker coordinate={coord}>
          
//              <View style={styles.calloutView}>
//                 <Image source={require('../../Images/pin1.jpeg')} style={styles.icon} /> 
//                <Text>A</Text>
//              </View>
       
//          </Marker>
          
//         )}
//         {destination && (
//           <Marker coordinate={destination} 
//           pinColor={"red"}  ><Text>B</Text></Marker>
//         )}
//         {coord && destination && (
//           <MapViewDirections
//             origin={coord}
//             destination={destination}
//             apikey={GOOGLE_PLACES_API_KEY}
//             strokeColor="black"
//             strokeWidth={2}
//             provider={"google"}
//           />
//         )}
//       </MapView>
//         <View style={styles.btnView}>
//             <CustomButton
//             onPress={() => handleNextPress()}
//             title="Next"
//             />
//         </View>
//       </SafeAreaView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#1A1A1A',
//     // padding: 16,
//     justifyContent: 'space-between',
//   },
//   title: {
//     fontSize: 24,
//     color: 'white',
//     marginBottom: 20,
//     marginTop: 20,
//     textAlign: 'left',
//     fontWeight: '500'
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: hp(5),
//     width: wp(90),
//   },
//   input: {
//     color: 'white',
//     borderBottomWidth: 1,
//     borderBottomColor: '#DADADA',
//     width: 140,
//     padding: 8,
//     fontSize: 16,
//   },
//   arrowStyle: {
//     marginRight: 'auto',
//     paddingHorizontal:wp(2),
//     paddingVertical:hp(2),
//     position:'relative'
//   },
//   btnView: {
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     // marginBottom: hp(13),
//     // paddingHorizontal: wp(5),
//   },
//   button: {
//     backgroundColor: '#000000',
//     // paddingVertical: 15,
//     borderRadius: 5,
//     marginTop: 40,
//     alignItems: 'center',
//     width: '100%',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//   },
//   phonestyle: {
//     fontSize: 18,
//     color: 'white'
//   },
//   textInputStyle: {
//     width: 60,
//     height: 60,
//     borderBottomWidth: 1,
//     borderBottomColor: 'white',
//     borderRadius: 5,
//     textAlign: 'center',
//     fontSize: 18,
//     color: 'white',
//     marginHorizontal: wp(4),
//   },
//   resendStyle: {
//     color: colors.purpleblue,
//     justifyContent: 'flex-start',
//     fontSize: 16,
//     fontWeight: '500',
//     textDecorationLine: 'underline',
//   },
//   receiveStyle: {
//     flexDirection: 'row',
//     color: colors.White,
//     fontSize: 15,
//     paddingHorizontal: wp(2)
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//     zIndex: 0,
//   },
//   searchContainer: {
//     zIndex: 1,
//     flex: 0.3,
// height:hp(20),
// width:wp(100),
// position:'absolute',
//     // marginHorizontal: 10,
//     // marginVertical: 5,
//     backgroundColor:colors.lightblack
//   },
//   autocompleteContainer: {
//     flex: 1,
//     zIndex: 1,
//     width:'80%',
   
//   },
//   textInputContainer: {
//     width: '100%',
//     // backgroundColor:'red',
  

//   },
//   textInput: {
//     backgroundColor: 'black',
//     width: '90%',
//     justifyContent: 'center',
//     alignSelf: 'center',
//     margin: hp(1),
//     marginHorizontal: wp(2),
//     elevation: 10,
//     shadowOpacity: 10,
//     shadowColor: 'black',
//     color: 'white',

//   },
//   listView: {
//     backgroundColor: 'white',
//   },
//   description: {
//     color: 'black',
//     // height:hp(2),
//     // backgroundColor:'green'
//   },
//   predefinedPlacesDescription: {
//     color: 'black',
//   },
//     inputView: {
//     position: 'absolute',
//     top: hp(0),
//     left: wp(2),
//     right: wp(2),
//   },
//     circle: {
//     width: hp(1.3),
//     height: hp(1.3),
//     borderRadius: 10,
//     backgroundColor: colors.greish,
//     marginLeft: wp(6.2),
//     marginTop: hp(3),
//   },
//   line: {
//     height: hp(9),
//     width: wp(0.4),
//     backgroundColor: colors.greish,
//     marginLeft: wp(9.5),
//     marginTop: hp(3),
//   },
//   rectangle: {
//     width: hp(1.3),
//     height: hp(1.3),
//     backgroundColor: colors.greish,
//     marginLeft: wp(6.3),
//     marginTop: hp(3),
//   },
//   icon:{
//     height:hp(4),
//     width:wp(5),
//     borderRadius:40,
//     shadowOpacity:10,
//     elevation:20
//   }
// });

// export default MapPinLocation;

// // import React, { useEffect, useRef, useState } from 'react';
// // import { View, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
// // import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
// // import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// // import MapViewDirections from 'react-native-maps-directions';
// // import Geolocation from '@react-native-community/geolocation';
// // import Ionicons from 'react-native-vector-icons/Ionicons';
// // import CustomButton from '../../components/CustomButton';
// // import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
// // import { colors } from '../../Constants/index';
// // const screen = Dimensions.get('window');
// // const ASPECT_RATIO = screen.width / screen.height;
// // const LATITUDE_DELTA = 0.04;
// // const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
// // const GOOGLE_PLACES_API_KEY = 'AIzaSyBEpezNDENEaLW4Hog5yW5D-YIa5mbBCMA';

// // const MapPinLocation = ({ navigation }) => {
// //   const mapRef = useRef();
// //   const autoCompleteRef1 = useRef();
// //   const autoCompleteRef2 = useRef();
// //   const [coord, setCoord] = useState(null);
// //   const [destination, setDestination] = useState(null);
// //   const [location, setLocation] = useState(null);
// //   const [otp, setOTP] = useState(['', '', '', '']);
// //   const otpTextInputRefs = useRef([]);
// //   const [pickerPoint1, setPickerPoint1] = useState('');
// //   const [pickerPoint2, setPickerPoint2] = useState('');

// //   const handleOTPChange = (index, value) => {
// //     const newOTP = [...otp];
// //     newOTP[index] = value;
// //     setOTP(newOTP);
// //     if (index < otp.length - 1 && value) {
// //       otpTextInputRefs.current[index + 1].focus();
// //     }
// //   };

// //   const isOTPComplete = () => {
// //     return otp.every(digit => digit !== '');
// //   };

// //   const onPressAddress = (data, details = null, isPicker1 = true) => {
// //     const location = {
// //       latitude: details.geometry.location.lat,
// //       longitude: details.geometry.location.lng,
// //     };

// //     if (isPicker1) {
// //       setCoord(location);
// //       setPickerPoint1(data.description);
// //     } else {
// //       setDestination(location);
// //       setPickerPoint2(data.description);
// //     }

// //     adjustMapToShowBothMarkers(coord, location);
// //   };

// //   const adjustMapToShowBothMarkers = (origin, destination) => {
// //     const midLat = (origin.latitude + destination.latitude) / 2;
// //     const midLng = (origin.longitude + destination.longitude) / 2;
// //     const latitudeDelta = Math.abs(origin.latitude - destination.latitude) * 1.5;
// //     const longitudeDelta = Math.abs(origin.longitude - destination.longitude) * 1.5;
// //     mapRef.current.animateToRegion(
// //       {
// //         latitude: midLat,
// //         longitude: midLng,
// //         latitudeDelta: latitudeDelta > LATITUDE_DELTA ? latitudeDelta : LATITUDE_DELTA,
// //         longitudeDelta: longitudeDelta > LONGITUDE_DELTA ? longitudeDelta : LONGITUDE_DELTA,
// //       },
// //       2000,
// //     );
// //   };

// //   const getLiveLocation = async () => {
// //     Geolocation.getCurrentPosition(
// //       position => {
// //         const { latitude, longitude } = position.coords;
// //         setCoord({
// //           latitude: latitude,
// //           longitude: longitude,
// //           latitudeDelta: LATITUDE_DELTA,
// //           longitudeDelta: LONGITUDE_DELTA,
// //         });
// //         setLocation(position.coords);
// //         fetchAddressFromCoordinates(latitude, longitude);
// //       },
// //       error => console.log(error),
// //       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
// //     );
// //   };

// //   const fetchAddressFromCoordinates = async (latitude, longitude) => {
// //     try {
// //       const response = await axios.get(
// //         `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_PLACES_API_KEY}`
// //       );
// //       if (response.data.results.length > 0) {
// //         const address = response.data.results[0].formatted_address;
// //         if (autoCompleteRef1.current) {
// //           autoCompleteRef1.current.setAddressText(address);
// //         }
// //         setPickerPoint1(address);
// //       }
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   };

// //   useEffect(() => {
// //     getLiveLocation();
// //   }, []);

// //   useEffect(() => {
// //     if (coord && destination) {
// //       adjustMapToShowBothMarkers(coord, destination);
// //     }
// //   }, [coord, destination]);
// //   return (
// //     <SafeAreaView style={styles.container}>
// //       <MapView
// //         ref={mapRef}
// //         provider={PROVIDER_GOOGLE}
// //         style={styles.map}
// //         initialRegion={coord}
// //       >
// //         {coord && (
// //           <Marker coordinate={coord} pinColor={"green"} />
          
// //         )}
// //         {destination && (
// //           <Marker coordinate={destination} pinColor={"red"} />
// //         )}
// //         {coord && destination && (
// //           <MapViewDirections
// //             origin={coord}
// //             destination={destination}
// //             apikey={GOOGLE_PLACES_API_KEY}
// //             strokeColor="black"
// //             strokeWidth={2}
// //             provider={"google"}
// //           />
// //         )}
// //       </MapView>
// //       <View style={{ height: 220, backgroundColor: colors.lightblack }}>
// //         <TouchableOpacity onPress={() => navigation.goBack()}>
// //           <Ionicons name="arrow-back" size={25} color="gray" style={styles.arrowStyle} />
// //         </TouchableOpacity>
// //         <View style={[styles.inputView, { zIndex: 2, flexDirection: 'row', marginTop: hp(5) }]}>
// //           <View style={styles.circle} />
// //           <GooglePlacesAutocomplete
// //             ref={autoCompleteRef1}
// //             placeholder="Enter Picker Point 1"
// //             fetchDetails={true}
// //             onPress={(data, details = null) => onPressAddress(data, details, true)}
// //             query={{
// //               key: GOOGLE_PLACES_API_KEY,
// //               language: 'en',
// //               location: location ? `${location.latitude},${location.longitude}` : '',
// //               radius: 2000,
// //             }}
// //             styles={{
// //               container: styles.autocompleteContainer,
// //               textInputContainer: styles.textInputContainer,
// //               textInput: styles.textInput,
// //               listView: styles.listView,
// //               description: styles.description,
// //               predefinedPlacesDescription: styles.predefinedPlacesDescription,
// //             }}
// //             currentLocation={true}
// //             currentLocationLabel="Current Location"
// //             predefinedPlacesAlwaysVisible={true}
// //             textInputProps={{
// //               placeholderTextColor: colors.gray,
// //               value: pickerPoint1,
// //               onChangeText: text => setPickerPoint1(text),
// //             }}
// //           />

// //         </View>
// //         <View style={styles.line} />
// //         <View style={[styles.inputView, { zIndex: 1, flexDirection: 'row', marginTop: hp(15) }]}>
// //           <View style={styles.rectangle} />
// //                    <GooglePlacesAutocomplete
// //             ref={autoCompleteRef2}
// //             placeholder="Enter Picker Point 2"
// //             fetchDetails={true}
// //             onPress={(data, details = null) => onPressAddress(data, details, false)}
// //             query={{
// //               key: GOOGLE_PLACES_API_KEY,
// //               language: 'en',
// //               location: location ? `${location.latitude},${location.longitude}` : '',
// //               radius: 2000,
// //             }}
// //             styles={{
// //               container: styles.autocompleteContainer,
// //               textInputContainer: styles.textInputContainer,
// //               textInput: styles.textInput,
// //               listView: styles.listView,
// //               description: styles.description,
// //               predefinedPlacesDescription: styles.predefinedPlacesDescription,
// //             }}
// //             enablePoweredByContainer={false}
// //             textInputProps={{
// //               placeholderTextColor: colors.gray,
// //               value: pickerPoint2,
// //               onChangeText: text => setPickerPoint2(text),
// //             }}
// //           />
// //         </View>
// //       </View>
// //       <View style={styles.btnView}>
// //         <CustomButton
// //           onPress={() => navigation.navigate('Cars')}
// //           title="Next"
// //         />
// //       </View>
// //     </SafeAreaView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: colors.lightblack,
// //   },
// //   inputView: {
// //     position: 'absolute',
// //     top: hp(2),
// //     left: wp(2),
// //     right: wp(2),
// //   },
// //   autocompleteContainer: {
// //     flex: 1,
// //     zIndex: 1,
// //   },
// //   textInputContainer: {
// //     width: '90%',
// //   },
// //   textInput: {
// //     backgroundColor: 'black',
// //     width: '90%',
// //     justifyContent: 'center',
// //     alignSelf: 'center',
// //     margin: hp(1),
// //     marginHorizontal: wp(2),
// //     elevation: 10,
// //     shadowOpacity: 10,
// //     shadowColor: 'black',
// //     color: 'white',
// //   },
// //   listView: {
// //     backgroundColor: 'white',
// //   },
// //   description: {
// //     color: 'black',
// //   },
// //   predefinedPlacesDescription: {
// //     color: 'black',
// //   },
// //   arrowStyle: {
// //     marginRight: 'auto',
// //     paddingHorizontal: wp(3),
// //     paddingVertical: hp(2),
// //     backgroundColor: colors.lightblack,
// //   },
// //   btnView: {
// //     position: 'absolute',
// //     bottom: hp(5),
// //     width: '100%',
// //     alignItems: 'center',
// //     backgroundColor: 'transparent',
// //   },
// //   mapView: {
// //     flex: 1,
// //   },
// //   map: {
// //     ...StyleSheet.absoluteFillObject,
// //     zIndex: 0,
// //   },
// //   circle: {
// //     width: hp(1.3),
// //     height: hp(1.3),
// //     borderRadius: 10,
// //     backgroundColor: colors.greish,
// //     marginLeft: wp(6.2),
// //     marginTop: hp(3),
// //   },
// //   line: {
// //     height: hp(10),
// //     width: wp(0.4),
// //     backgroundColor: colors.greish,
// //     marginLeft: wp(9.5),
// //     marginTop: hp(3),
// //   },
// //   rectangle: {
// //     width: hp(1.3),
// //     height: hp(1.3),
// //     backgroundColor: colors.greish,
// //     marginLeft: wp(6.3),
// //     marginTop: hp(3),
// //   },
// // });

// // export default MapPinLocation;
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Image, KeyboardAvoidingView, TextInput, StyleSheet, SafeAreaView, Dimensions, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { colors } from '../../Constants/index';
import CustomButton from '../../components/CustomButton';
import Snackbar from 'react-native-snackbar';
import { useDispatch, useSelector } from 'react-redux';
import { setPickerPoint1, setPickerPoint2 } from '../../ReduxStore/actions';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const GOOGLE_PLACES_API_KEY = 'AIzaSyBEpezNDENEaLW4Hog5yW5D-YIa5mbBCMA';

const MapPinLocation = ({ navigation }) => {
  const dispatch = useDispatch();
  const mapRef = useRef();
  const autoCompleteRef1 = useRef();
  const autoCompleteRef2 = useRef();
  const [coord, setCoord] = useState(null);
  const [destination, setDestination] = useState(null);
  const [location, setLocation] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const pickerPoint1 = useSelector((state) => state.pickerPoints.pickerPoint1);
  const pickerPoint2 = useSelector((state) => state.pickerPoints.pickerPoint2);

  const onPressAddress = (data, details = null, isPicker1 = true) => {
    const location = {
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    };

    if (isPicker1) {
      setCoord(location);
      dispatch(setPickerPoint1(data.description));
    } else {
      setDestination(location);
      dispatch(setPickerPoint2(data.description));
    }

    adjustMapToShowBothMarkers(coord, location);
  };

  const adjustMapToShowBothMarkers = (origin, destination) => {
    const midLat = (origin.latitude + destination.latitude) / 2;
    const midLng = (origin.longitude + destination.longitude) / 2;
    const latitudeDelta = Math.abs(origin.latitude - destination.latitude) * 1.5;
    const longitudeDelta = Math.abs(origin.longitude - destination.longitude) * 1.5;
    mapRef.current.animateToRegion(
      {
        latitude: midLat,
        longitude: midLng,
        latitudeDelta: latitudeDelta > LATITUDE_DELTA ? latitudeDelta : LATITUDE_DELTA,
        longitudeDelta: longitudeDelta > LONGITUDE_DELTA ? longitudeDelta : LONGITUDE_DELTA,
      },
      2000,
    );
  };

  const getLiveLocation = async () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setCoord({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        });
        setLocation(position.coords);
        fetchAddressFromCoordinates(latitude, longitude);
      },
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  const fetchAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_PLACES_API_KEY}`
      );
      if (response.data.results.length > 0) {
        const address = response.data.results[0].formatted_address;
        if (autoCompleteRef1.current) {
          autoCompleteRef1.current.setAddressText(address);
        }
        dispatch(setPickerPoint1(address));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLiveLocation();
  }, []);

  useEffect(() => {
    if (coord && destination) {
      adjustMapToShowBothMarkers(coord, destination);
    }
  }, [coord, destination]);

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    setDatePickerVisible(false);
  };

  const handleTimeChange = (selectedTime) => {
    setDate(selectedTime);
    setTimePickerVisible(false);
  };

  const handleNextPress = () => {
    if (!pickerPoint1 || !pickerPoint2) {
      Snackbar.show({
        text: 'Fill the Filled first ',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red',
        textColor: 'white',
        action: {
          text: 'OK',
          textColor: 'white',
          onPress: () => {
            // Do something when action button is pressed
          },
        },
      });
    } else {
      navigation.navigate('MoreDetails');
      return true;
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#1A1A1A' }} behavior="padding">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="gray" style={styles.arrowStyle} />
      </TouchableOpacity>
      <SafeAreaView style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={[styles.inputView, { zIndex: 2, flexDirection: 'row' }]}>
            <View style={styles.circle} />
            <GooglePlacesAutocomplete
              ref={autoCompleteRef1}
              placeholder="Enter Picker Point 1"
              fetchDetails={true}
              onPress={(data, details = null) => onPressAddress(data, details, true)}
              query={{
                key: GOOGLE_PLACES_API_KEY,
                language: 'en',
                location: location ? `${location.latitude},${location.longitude}` : '',
                radius: 2000,
              }}
              styles={{
                container: styles.autocompleteContainer,
                textInputContainer: styles.textInputContainer,
                textInput: styles.textInput,
                listView: styles.listView,
                description: styles.description,
                predefinedPlacesDescription: styles.predefinedPlacesDescription,
              }}
              currentLocation={true}
              currentLocationLabel="Current Location"
              predefinedPlacesAlwaysVisible={true}
              textInputProps={{
                placeholderTextColor: colors.gray,
                value: pickerPoint1,
                onChangeText: (text) => dispatch(setPickerPoint1(text)),
              }}
            />
          </View>
          <View style={styles.line} />
          <View style={[styles.inputView, { zIndex: 1, flexDirection: 'row', marginTop: hp(8) }]}>
            <View style={styles.rectangle} />
            <GooglePlacesAutocomplete
              ref={autoCompleteRef2}
              placeholder="Enter Picker Point 2"
              fetchDetails={true}
              onPress={(data, details = null) => onPressAddress(data, details, false)}
              query={{
                key: GOOGLE_PLACES_API_KEY,
                language: 'en',
                location: location ? `${location.latitude},${location.longitude}` : '',
                radius: 2000,
              }}
              styles={{
                container: styles.autocompleteContainer,
                textInputContainer: styles.textInputContainer,
                textInput: styles.textInput,
                listView: styles.listView,
                description: styles.description,
                predefinedPlacesDescription: styles.predefinedPlacesDescription,
              }}
              enablePoweredByContainer={false}
              textInputProps={{
                placeholderTextColor: colors.gray,
                value: pickerPoint2,
                onChangeText: (text) => dispatch(setPickerPoint2(text)),
              }}
            />
          </View>
        </View>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={coord}
        >
          {coord && (
            <Marker coordinate={coord}>
              <View style={styles.calloutView}>
                <Image source={require('../../Images/pin1.jpeg')} style={styles.icon} />
                <Text>A</Text>
              </View>
            </Marker>
          )}
          {destination && (
            <Marker coordinate={destination} pinColor={"red"}><Text>B</Text></Marker>
          )}
          {coord && destination && (
            <MapViewDirections
              origin={coord}
              destination={destination}
              apikey={GOOGLE_PLACES_API_KEY}
              strokeColor="black"
              strokeWidth={2}
              provider={"google"}
            />
          )}
        </MapView>
        <View style={styles.btnView}>
          <CustomButton
            onPress={handleNextPress}
            title="Next"
          />
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          minimumDate={new Date()} // Disable previous dates
          onConfirm={handleDateChange}
          onCancel={() => setDatePickerVisible(false)}
        />
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleTimeChange}
          onCancel={() => setTimePickerVisible(false)}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'left',
    fontWeight: '500'
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp(5),
    width: wp(90),
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
    paddingHorizontal: wp(2),
    paddingVertical: hp(2),
    position: 'relative'
  },
  btnView: {
    position: 'absolute',
    bottom: hp(5),
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#000000',
    borderRadius: 5,
    marginTop: 40,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  phonestyle: {
    fontSize: 18,
    color: 'white'
  },
  textInputStyle: {
    width: 60,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    marginHorizontal: wp(4),
  },
  resendStyle: {
    color: colors.purpleblue,
    justifyContent: 'flex-start',
    fontSize: 16,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  receiveStyle: {
    flexDirection: 'row',
    color: colors.White,
    fontSize: 15,
    paddingHorizontal: wp(2)
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  searchContainer: {
    zIndex: 1,
    flex: 0.3,
    height: hp(20),
    width: wp(100),
    position: 'absolute',
    backgroundColor: colors.lightblack
  },
  autocompleteContainer: {
    flex: 1,
    zIndex: 1,
    width: '80%',
  },
  textInputContainer: {
    width: '100%',
  },
  textInput: {
    backgroundColor: 'black',
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
    margin: hp(1),
    marginHorizontal: wp(2),
    elevation: 10,
    shadowOpacity: 10,
    shadowColor: 'black',
    color: 'white',
  },
  listView: {
    backgroundColor: 'white',
  },
  description: {
    color: 'black',
  },
  predefinedPlacesDescription: {
    color: 'black',
  },
  inputView: {
    position: 'absolute',
    top: hp(0),
    left: wp(2),
    right: wp(2),
  },
  circle: {
    width: hp(1.3),
    height: hp(1.3),
    borderRadius: 10,
    backgroundColor: colors.greish,
    marginLeft: wp(6.2),
    marginTop: hp(3),
  },
  line: {
    height: hp(9),
    width: wp(0.4),
    backgroundColor: colors.greish,
    marginLeft: wp(9.5),
    marginTop: hp(3),
  },
  rectangle: {
    width: hp(1.3),
    height: hp(1.3),
    backgroundColor: colors.greish,
    marginLeft: wp(6.3),
    marginTop: hp(3),
  },
  icon: {
    height: hp(4),
    width: wp(5),
    borderRadius: 40,
    shadowOpacity: 10,
    elevation: 20
  }
});

export default MapPinLocation;
