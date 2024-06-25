
// import React, { useEffect, useRef, useState } from 'react';
// import { View, StyleSheet, Text, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
// import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import MapViewDirections from 'react-native-maps-directions';
// import Geolocation from '@react-native-community/geolocation';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import CustomButton from '../../components/CustomButton';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
// import { colors } from '../../Constants/index';

// const screen = Dimensions.get('window');
// const ASPECT_RATIO = screen.width / screen.height;
// const LATITUDE_DELTA = 0.04;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
// const GOOGLE_PLACES_API_KEY = 'AIzaSyBEpezNDENEaLW4Hog5yW5D-YIa5mbBCMA';

// const MapPinLocation = ({ navigation }) => {
//   const mapRef = useRef();
//   const [coord, setCoord] = useState(null);
//   const [destination, setDestination] = useState(null);
//   const [pickerPoint1, setPickerPoint1] = useState('');
//   const [pickerPoint2, setPickerPoint2] = useState('');

//   const onPressAddress = (data, details = null) => {
//     const location = {
//       latitude: details.geometry.location.lat,
//       longitude: details.geometry.location.lng,
//     };
//     setDestination(location);
//     setPickerPoint2(data.description);

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
//         const location = {
//           latitude: latitude,
//           longitude: longitude,
//           latitudeDelta: LATITUDE_DELTA,
//           longitudeDelta: LONGITUDE_DELTA,
//         };
//         setCoord(location);
//         setPickerPoint1(`${latitude}, ${longitude}`);
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
//       <MapView
//         ref={mapRef}
//         provider={PROVIDER_GOOGLE}
//         style={styles.map}
//         initialRegion={coord}>
//         {coord && (
//           <Marker coordinate={coord}   color={"green"}/>
//         )}
//         {destination && (
//           <Marker coordinate={destination} color={"red"} />
//         )}
//         {coord && destination && (
//           <MapViewDirections
//             origin={coord}
//             destination={destination}
//             apikey={GOOGLE_PLACES_API_KEY}
//             strokeColor="black"
//             strokeWidth={2}
//           />
//         )}
//       </MapView>
//       <View style={{ height: 220, backgroundColor: colors.lightblack }}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={25} color="gray" style={styles.arrowStyle} />
//         </TouchableOpacity>
//         <View style={[styles.inputView, { zIndex: 2 , flexDirection:'row',   marginTop:hp(5)}]}>
//           <View style={styles.circle}/>
        
//           <GooglePlacesAutocomplete
//             placeholder="Enter Picker Point 1"
//             fetchDetails={true}
//             onPress={onPressAddress}
//             query={{
//               key: GOOGLE_PLACES_API_KEY,
//               language: 'en',
//             }}
//             styles={{
//               container: styles.autocompleteContainer,
//               textInputContainer: styles.textInputContainer,
//               textInput: styles.textInput,
//               listView: styles.listView,
//               description: styles.description,
//               predefinedPlacesDescription: styles.predefinedPlacesDescription,
//             }}
//             textInputProps={{
//               placeholderTextColor: colors.gray
//             }}
//           />
//         </View>
//         <View style={styles.line}/>
//         <View style={[styles.inputView, { zIndex: 1, flexDirection:'row',marginTop: hp(15) }]}>
//         <View style={styles.rectangle}/>
//           <GooglePlacesAutocomplete
//             placeholder="Enter Picker Point 2"
//             fetchDetails={true}
//             onPress={onPressAddress}
//             query={{
//               key: GOOGLE_PLACES_API_KEY,
//               language: 'en',
//             }}
//             styles={{
//               container: styles.autocompleteContainer,
//               textInputContainer: styles.textInputContainer,
//               textInput: styles.textInput,
//               listView: styles.listView,
//               description: styles.description,
//               predefinedPlacesDescription: styles.predefinedPlacesDescription,
//             }}
//             textInputProps={{
//               placeholderTextColor: colors.gray
//             }}
//           />
//         </View>
//       </View>
//       <View style={styles.btnView}>
//         <CustomButton
//           onPress={() => navigation.navigate('AddMoreInputField')}
//           title="Next"
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.lightblack,
//   },
//   inputView: {
//     position: 'absolute',
//     top: hp(2),
//     left: wp(2),
//     right: wp(2),
//   },
//   autocompleteContainer: {
//     flex: 1,
//     zIndex: 1,
//   },
//   textInputContainer: {
//     width: '90%',
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
//   },
//   predefinedPlacesDescription: {
//     color: 'black',
//   },
//   arrowStyle: {
//     marginRight: 'auto',
//     paddingHorizontal: wp(3),
//     paddingVertical: hp(2),
//     backgroundColor: colors.lightblack,

//   },
//   btnView: {
//     position: 'absolute',
//     bottom: hp(5),
//     width: '100%',
//     alignItems: 'center',
//     backgroundColor: 'transparent',
//   },
//   mapView: {
//     flex: 1,
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//     zIndex: 0,
//   },
//     circle: {
//     width: hp(1.3),
//     height: hp(1.3),
//     borderRadius: 10,
//     backgroundColor: colors.greish,
//     marginLeft: wp(6.2),
//     marginTop:hp(3)
//   },
//     line: {
//     height: hp(10),
//     width: wp(0.4),
//     backgroundColor: colors.greish,
//     marginLeft: wp(9.5),
//     marginTop:hp(4)
//   },
//   rectangle: {
//     width: hp(1.3),
//     height: hp(1.3),
//     backgroundColor: colors.greish,
//     marginLeft: wp(6.3),
//     marginTop:hp(3)
//   },
// });

// export default MapPinLocation;
import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
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
const GOOGLE_PLACES_API_KEY = 'AIzaSyBEpezNDENEaLW4Hog5yW5D-YIa5mbBCMA'; // Replace with your Google Places API key



const MapPinLocation = ({ navigation }) => {
  const mapRef = useRef();
  const [coord, setCoord] = useState(null);
  const [destination, setDestination] = useState(null);
  const [pickerPoint1, setPickerPoint1] = useState('');
  const [pickerPoint2, setPickerPoint2] = useState('');
console.log("line :277 " , pickerPoint1);
  const onPressAddress = (data, details = null, isPicker1 = true) => {
    const location = {
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    };

    if (isPicker1) {
      setCoord(location);
      getAddressFromCoords(location.latitude, location.longitude)
        .then(address => setPickerPoint1(address))
        .catch(error => console.error('Error fetching address:', error));
    } else {
      setDestination(location);
      setPickerPoint2(data.description);
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

  const getAddressFromCoords = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_PLACES_API_KEY}`
      );
      const responseJson = await response.json();
      if (responseJson.results && responseJson.results.length > 0) {
        const address = responseJson.results[0].formatted_address;
        return address;
      } else {
        return '';
      }
    } catch (error) {
      console.error(error);
      return '';
    }
  };

  const getLiveLocation = async () => {
    Geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;
        const location = {
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };
        setCoord(location);
        getAddressFromCoords(latitude, longitude)
          .then(address => setPickerPoint1(address))
          .catch(error => console.error('Error fetching address:', error));
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
    console.log(coord , destination);
  }, [1]);

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={coord}
      >
        {coord && (
          <Marker coordinate={coord} image={require('../../Images/Designer.png')} />
        )}
        {destination && (
          <Marker coordinate={destination} pinColor={"red"} />
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
      <View style={{ height: 220, backgroundColor: colors.lightblack }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={25} color="gray" style={styles.arrowStyle} />
        </TouchableOpacity>
        <View style={[styles.inputView, { zIndex: 2, flexDirection: 'row', marginTop: hp(5) }]}>
          <View style={styles.circle} />
          <GooglePlacesAutocomplete
            placeholder="Enter Picker Point 1"
            fetchDetails={true}
            onPress={(data, details = null) => onPressAddress(data, details, true)}
            enablePoweredByContainer={false}
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
            
            onChangeText={text => setPickerPoint1(text)} // Handle text change
            textInputProps={{
              placeholderTextColor: colors.gray,
              onChangeText: text => setPickerPoint1(text),

              value : pickerPoint1,
            }}
          />
        </View>
        <View style={styles.line} />
        <View style={[styles.inputView, { zIndex: 1, flexDirection: 'row', marginTop: hp(15) }]}>
          <View style={styles.rectangle} />
          <GooglePlacesAutocomplete
            placeholder="Enter Picker Point 2"
            fetchDetails={true}
            onPress={(data, details = null) => onPressAddress(data, details, false)}
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
    paddingVertical: hp(2),
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
    marginTop: hp(3)
  },
  line: {
        height: hp(10),
        width: wp(0.4),
        backgroundColor: colors.greish,
        marginLeft: wp(9.5),
        marginTop:hp(3)
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