// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
// import { colors } from '../../Constants/index';
// import MapView, { Marker, Polyline } from 'react-native-maps';
// import CustomButton from '../../components/CustomButton';

// const MapPinLocation = ({ navigation }) => {

//   const [source, setSource] = useState({ latitude: 31.522849291201936, longitude: 74.26557150000002 });
//   const [destination, setDestination] = useState({ latitude: 31.513261286196453, longitude: 74.30921023707093 });
//   const [pickerPoint1, setPickerPoint1] = useState('');
//   const [pickerPoint2, setPickerPoint2] = useState('');
//   const [pickerPoint3, setPickerPoint3] = useState('');

//   const handleDragEnd = (coord, setFunc) => {
//     setFunc(coord);
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={() => navigation.goBack()}>
//         <Ionicons name="arrow-back" size={24} color="gray" style={styles.arrowStyle} />
//       </TouchableOpacity>

//       <View style={styles.viewOne}>
//         <View style={styles.inputView}>
//           <View style={{ flexDirection: 'column', width: wp(5), marginRight: wp(2) }}>
//             <View style={[styles.circle, { marginTop: hp(2) }]} />
//             <View style={[styles.line, { height: hp(7) }]} />
//             <View style={styles.circle} />
//             <View style={[styles.line, { height: hp(10) }]} />
//             <View style={styles.rectangle} />
//           </View>
//           <View style={{ flexDirection: 'column', width: wp(90), backgroundColor: 'transparent' }}>
//             <TextInput
//               placeholder="Enter Picker Point 1"
//               onChangeText={newText => setPickerPoint1(newText)}
//               value={pickerPoint1}
//               style={styles.inputStyle}
//               placeholderTextColor={'gray'}
//             // onFocus={() => navigation.navigate('PickSaveLocation')}
//             />
//             <TextInput
//               placeholder="Enter Picker Point 2"
//               onChangeText={newText => setPickerPoint2(newText)}
//               value={pickerPoint2}
//               style={styles.inputStyle}
//               placeholderTextColor={'gray'}
//             // onFocus={() => navigation.navigate('PickSaveLocation')}
//             />
//             <TextInput
//               placeholder="Enter Picker Point 3"
//               onChangeText={newText => setPickerPoint3(newText)}
//               value={pickerPoint3}
//               style={[styles.inputStyle, { marginTop: hp(2) }]}
//               placeholderTextColor={'gray'}
//             />
//           </View>
//         </View>
//       </View>

//       <View style={styles.mapView}>
//         <MapView
//           style={styles.mapStyle}
//           initialRegion={{
//             latitude: 37.78825,
//             longitude: -122.4324,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           }}
//         >
//           <Marker
//             draggable
//             coordinate={source}
//             onDragEnd={(e) => handleDragEnd(e.nativeEvent.coordinate, setSource)}
//             title={'Source Marker'}
//           />
//           <Marker
//             draggable
//             coordinate={destination}
//             onDragEnd={(e) => handleDragEnd(e.nativeEvent.coordinate, setDestination)}
//             title={'Destination Marker'}
//           />
//           <Polyline
//             coordinates={[source, destination]}
//             strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
//             strokeColors={[
//               '#7F0000',
//               '#00000000', // no color, creates a "gradient" effect
//               '#B24112',
//               '#E5845C',
//               '#238C23',
//               '#7F0000'
//             ]}
//             strokeWidth={6}
//           />
//         </MapView>
//       </View>

//       <View style={styles.btnView}>
//         <CustomButton
//           onPress={() => navigation.navigate('AddMoreInputField')}
//           title="Next"
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.lightblack,
//     padding: 2
//   },
//   viewOne: {
//     backgroundColor: colors.lightblack,
//   },
//   inputView: {
//     flexDirection: 'row',
//   },
//   inputStyle: {
//     backgroundColor: 'black',
//     width: '88%',
//     justifyContent: 'center',
//     alignSelf: 'center',
//     paddingHorizontal: wp(2),
//     margin: hp(1),
//     margin: wp(2),
//     elevation: 10,
//     shadowOpacity: 10,
//     shadowColor: 'black',
//     color: 'white'
//   },
//   arrowStyle: {
//     marginRight: 'auto',
//     paddingHorizontal: wp(2),
//     paddingVertical: hp(2)
//   },
//   btnView: {
//     position: 'absolute',
//     bottom: hp(5),
//     width: '100%',
//     alignItems: 'center',
//     backgroundColor: 'transparent'
//   },
//   mapView: {
//     flex: 1,
//     padding: wp(3),
//   },
//   mapStyle: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   circle: {
//     width: hp(1.3),
//     height: hp(1.3),
//     borderRadius: 10,
//     backgroundColor: colors.greish,
//     marginLeft: wp(6.2),
//   },
//   line: {
//     height: hp(8),
//     width: wp(0.4),
//     backgroundColor: colors.greish,
//     marginLeft: wp(7.5),
//   },
//   rectangle: {
//     width: hp(1.3),
//     height: hp(1.3),
//     backgroundColor: colors.greish,
//     marginLeft: wp(6.3),
//   },
//   textStylebtn: {
//     color: colors.White,
//     fontSize: 13,
//     fontWeight: '500',
//     paddingVertical: hp(1),
//     padding: wp(4)
//   },
//   textStyle: {
//     color: colors.White,
//     fontSize: 12,
//     paddingHorizontal: wp(5)
//   },
// });

// export default MapPinLocation;
/////////map////////////////////////
// import React, { useEffect, useRef, useState } from 'react';
// import { View, StyleSheet, Text, SafeAreaView, Dimensions } from 'react-native';
// import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import MapViewDirections from 'react-native-maps-directions';
// import Geolocation from '@react-native-community/geolocation';

// const screen = Dimensions.get('window');
// const ASPECT_RATIO = screen.width / screen.height;
// const LATITUDE_DELTA = 0.04;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
// const GOOGLE_PLACES_API_KEY = 'AIzaSyBEpezNDENEaLW4Hog5yW5D-YIa5mbBCMA';

// const MapPinLocation = () => {
//   const mapRef = useRef();
//   const [coord, setCoord] = useState();
//   const [destination, setDestination] = useState();

//   const onPressAddress = details => {
//     setDestination({
//       latitude: details?.geometry?.location.lat,
//       longitude: details?.geometry?.location.lng,
//     });
//     adjustMapToShowBothMarkers(coord, {
//       latitude: details?.geometry?.location.lat,
//       longitude: details?.geometry?.location.lng,
//     });
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
//       },
//       error => console.log(error),
//       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//     );
//   };

//   useEffect(() => {
//     getLiveLocation();
//   }, []);

//   useEffect(() => {
//     if (coord && destination) {
//       adjustMapToShowBothMarkers(coord, destination);
//     }
//   }, [coord, destination]);

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.searchContainer}>
//         <GooglePlacesAutocomplete
//           placeholder="Search"
//           fetchDetails={true}
//           onPress={(data, details = null) => {
//             // 'details' is provided when fetchDetails = true
//             onPressAddress(details);
//           }}
//           query={{
//             key: GOOGLE_PLACES_API_KEY,
//             language: 'en',
//           }}
//         />
//       </View>
//       <MapView
//         ref={mapRef}
//         provider={PROVIDER_GOOGLE}
//         style={styles.map}
//         initialRegion={coord}>
//         {coord !== undefined && (
//           <Marker coordinate={coord} />
//         )}
//         {destination !== undefined && (
//           <Marker coordinate={destination} />
//         )}
//         {coord != undefined && destination != undefined ? (
//           <MapViewDirections
//             origin={coord}
//             destination={destination}
//             apikey={GOOGLE_PLACES_API_KEY}
//             strokeColor="black"
//             strokeWidth={2}
//           />
//         ) : null}
//       </MapView>
//     </SafeAreaView>
//   );
// };

// export default MapPinLocation;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//     zIndex: 0,
//   },
//   searchContainer: {
//     zIndex: 1,
//     flex: 0.5,
//     marginHorizontal: 10,
//     marginVertical: 5,
//   },
// });
////////mapend////


/////////done///////


//////////done//////////
import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../../components/CustomButton';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { colors } from '../../Constants/index';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const GOOGLE_PLACES_API_KEY = 'AIzaSyBEpezNDENEaLW4Hog5yW5D-YIa5mbBCMA';

const MapPinLocation = ({ navigation }) => {
  const mapRef = useRef();
  const [coord, setCoord] = useState(null);
  const [destination, setDestination] = useState(null);
  const [pickerPoint1, setPickerPoint1] = useState('');
  const [pickerPoint2, setPickerPoint2] = useState('');

  const onPressAddress = (data, details = null) => {
    const location = {
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    };
    setDestination(location);
    setPickerPoint2(data.description);

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
        const location = {
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };
        setCoord(location);
        setPickerPoint1(`${latitude}, ${longitude}`);
      },
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  useEffect(() => {
    getLiveLocation();
  }, []);

  useEffect(() => {
    if (coord && destination) {
      adjustMapToShowBothMarkers(coord, destination);
    }
  }, [coord, destination]);

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={coord}>
        {coord && (
          <Marker coordinate={coord} />
        )}
        {destination && (
          <Marker coordinate={destination} />
        )}
        {coord && destination && (
          <MapViewDirections
            origin={coord}
            destination={destination}
            apikey={GOOGLE_PLACES_API_KEY}
            strokeColor="black"
            strokeWidth={2}
          />
        )}
      </MapView>
      <View style={{ height: 220, backgroundColor: colors.lightblack }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="black" style={styles.arrowStyle} />
        </TouchableOpacity>
        <View style={[styles.inputView, { zIndex: 2 , flexDirection:'row',   marginTop:hp(5)}]}>
          <View style={styles.circle}/>
        
          <GooglePlacesAutocomplete
            placeholder="Enter Picker Point 1"
            fetchDetails={true}
            onPress={onPressAddress}
            query={{
              key: GOOGLE_PLACES_API_KEY,
              language: 'en',
            }}
            styles={{
              container: styles.autocompleteContainer,
              textInputContainer: styles.textInputContainer,
              textInput: styles.textInput,
              listView: styles.listView,
              description: styles.description,
              predefinedPlacesDescription: styles.predefinedPlacesDescription,
            }}
            textInputProps={{
              placeholderTextColor: colors.gray
            }}
          />
        </View>
        <View style={styles.line}/>
        <View style={[styles.inputView, { zIndex: 1, flexDirection:'row',marginTop: hp(15) }]}>
        <View style={styles.rectangle}/>
          <GooglePlacesAutocomplete
            placeholder="Enter Picker Point 2"
            fetchDetails={true}
            onPress={onPressAddress}
            query={{
              key: GOOGLE_PLACES_API_KEY,
              language: 'en',
            }}
            styles={{
              container: styles.autocompleteContainer,
              textInputContainer: styles.textInputContainer,
              textInput: styles.textInput,
              listView: styles.listView,
              description: styles.description,
              predefinedPlacesDescription: styles.predefinedPlacesDescription,
            }}
            textInputProps={{
              placeholderTextColor: colors.gray
            }}
          />
        </View>
      </View>
      <View style={styles.btnView}>
        <CustomButton
          onPress={() => navigation.navigate('AddMoreInputField')}
          title="Next"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightblack,
  },
  inputView: {
    position: 'absolute',
    top: hp(2),
    left: wp(2),
    right: wp(2),
  },
  autocompleteContainer: {
    flex: 1,
    zIndex: 1,
  },
  textInputContainer: {
    width: '90%',
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
  arrowStyle: {
    marginRight: 'auto',
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
    backgroundColor: colors.lightblack,

  },
  btnView: {
    position: 'absolute',
    bottom: hp(5),
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  mapView: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
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
    height: hp(9),
    width: wp(0.4),
    backgroundColor: colors.greish,
    marginLeft: wp(9.5),
    marginTop:hp(5)
  },
  rectangle: {
    width: hp(1.3),
    height: hp(1.3),
    backgroundColor: colors.greish,
    marginLeft: wp(6.3),
    marginTop:hp(3)
  },
});

export default MapPinLocation;
