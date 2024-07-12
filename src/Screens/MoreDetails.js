import React, {useEffect, useRef, useState, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors, fontSize, fontFamily, radius} from '../Constants';
import CustomButton from '../components/CustomButton';
import {UserContext} from '../Screens/UserContext';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const GOOGLE_PLACES_API_KEY = 'AIzaSyBEpezNDENEaLW4Hog5yW5D-YIa5mbBCMA';

const MoreDetails = ({navigation}) => {
  const mapRef = useRef();
  const autoCompleteRef1 = useRef();
  const autoCompleteRef2 = useRef();
  const [destination, setDestination] = useState(null);
  const [location, setLocation] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  const {
    pickerPoint1,
    setPickerPoint1,
    pickerPoint2,
    setPickerPoint2,
    coord1,
    setCoord1,
    coord2,
    setCoord2,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
  } = useContext(UserContext);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const onPressAddress = (data, details = null, isPicker1 = true) => {
    const location = {
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    };

    if (isPicker1) {
      setCoord1(location);
      setPickerPoint1(data.description);
    } else {
      setCoord2(location);
      setPickerPoint2(data.description);
    }

    adjustMapToShowBothMarkers(coord1, location);
  };

  const adjustMapToShowBothMarkers = (origin, destination) => {
    const midLat = (origin.latitude + destination.latitude) / 2;
    const midLng = (origin.longitude + destination.longitude) / 2;
    const latitudeDelta =
      Math.abs(origin.latitude - destination.latitude) * 1.5;
    const longitudeDelta =
      Math.abs(origin.longitude - destination.longitude) * 1.5;
    mapRef.current.animateToRegion(
      {
        latitude: midLat,
        longitude: midLng,
        latitudeDelta:
          latitudeDelta > LATITUDE_DELTA ? latitudeDelta : LATITUDE_DELTA,
        longitudeDelta:
          longitudeDelta > LONGITUDE_DELTA ? longitudeDelta : LONGITUDE_DELTA,
      },
      2000,
    );
  };

  const getLiveLocation = async () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCoord1({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        });
        setLocation(position.coords);
        fetchAddressFromCoordinates(latitude, longitude);
      },
      error => console.log(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  const fetchAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_PLACES_API_KEY}`,
      );
      if (response.data.results.length > 0) {
        const address = response.data.results[0].formatted_address;
        if (autoCompleteRef1.current) {
          autoCompleteRef1.current.setAddressText(address);
        }
        setPickerPoint1(address);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLiveLocation();
  }, []);

  useEffect(() => {
    if (coord1 && destination) {
      adjustMapToShowBothMarkers(coord1, destination);
    }
  }, [coord1, destination]);

  const handleDateChange = selectedDate => {
    setDate(selectedDate);
    setSelectedDate(selectedDate);
    setDatePickerVisible(false);
  };

  const handleTimeChange = selectedTime => {
    setDate(selectedTime);
    setSelectedTime(selectedTime);
    setTimePickerVisible(false);
  };

  const handleSubmit = () => {
    if (!isEnabled) {
      setSelectedDate(new Date());
      setSelectedTime(new Date());
    }
    navigation.navigate('Cars');
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: '#1A1A1A'}}
      behavior="padding">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="gray"
          style={styles.arrowStyle}
        />
      </TouchableOpacity>
      <SafeAreaView style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={[styles.inputView, {zIndex: 2, flexDirection: 'row'}]}>
            <View style={styles.circle} />
            <GooglePlacesAutocomplete
              ref={autoCompleteRef1}
              placeholder="Enter Picker Point 1"
              fetchDetails={true}
              onPress={(data, details = null) =>
                onPressAddress(data, details, true)
              }
              query={{
                key: GOOGLE_PLACES_API_KEY,
                language: 'en',
                location: location
                  ? `${location.latitude},${location.longitude}`
                  : '',
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
                editable: false,
              }}
            />
          </View>
          <View style={styles.line} />
          <View
            style={[
              styles.inputView,
              {zIndex: 1, flexDirection: 'row', marginTop: hp(8)},
            ]}>
            <View style={styles.rectangle} />
            <GooglePlacesAutocomplete
              ref={autoCompleteRef2}
              placeholder="Enter Picker Point 2"
              fetchDetails={true}
              onPress={(data, details = null) =>
                onPressAddress(data, details, false)
              }
              query={{
                key: GOOGLE_PLACES_API_KEY,
                language: 'en',
                location: location
                  ? `${location.latitude},${location.longitude}`
                  : '',
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
                editable: false,
              }}
            />
          </View>
        </View>
        <View style={styles.ViewBox}>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Asap</Text>
            <Switch
              trackColor={{false: '#767577', true: 'yellow'}}
              thumbColor={isEnabled ? '#ffff' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            <Text style={styles.switchLabel}>Future</Text>
          </View>
          <Text style={styles.dateTimeLabel}>Date & Time</Text>
          {isEnabled ? (
            <View style={styles.dateTimeContainer}>
              <View style={styles.inputWithIcon}>
                <TextInput
                  style={styles.input}
                  value={selectedDate.toLocaleDateString()}
                  editable={false}
                  placeholderTextColor={colors.lightGray}
                />
                <TouchableOpacity
                  onPress={() => setDatePickerVisible(true)}
                  style={styles.iconContainer}>
                  <Ionicons name="create-outline" size={24} color="gray" />
                </TouchableOpacity>
              </View>
              <View style={styles.inputWithIcon}>
                <TextInput
                  style={styles.input}
                  value={selectedTime.toLocaleTimeString()}
                  editable={false}
                  placeholderTextColor={colors.lightGray}
                />
                <TouchableOpacity
                  onPress={() => setTimePickerVisible(true)}
                  style={styles.iconContainer}>
                  <Ionicons name="create-outline" size={24} color="gray" />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.dateTimeContainer}>
              <TextInput
                style={styles.input}
                value={selectedDate.toLocaleDateString()}
                editable={false}
                placeholderTextColor={colors.lightGray}
              />
              <TextInput
                style={styles.input}
                value={selectedTime.toLocaleTimeString()}
                editable={false}
                placeholderTextColor={colors.lightGray}
              />
            </View>
          )}
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDateChange}
            onCancel={() => setDatePickerVisible(false)}
          />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleTimeChange}
            onCancel={() => setTimePickerVisible(false)}
          />
        </View>
        <View style={styles.mapContainer}></View>
        <View style={styles.btnView}>
          <CustomButton title="Submit" onPress={handleSubmit} />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>

    // import React, {useEffect, useRef, useState, useContext} from 'react';
    // import {
    //   View,
    //   Text,
    //   TouchableOpacity,
    //   Switch,
    //   TextInput,
    //   StyleSheet,
    //   SafeAreaView,
    //   Dimensions,
    //   KeyboardAvoidingView,
    // } from 'react-native';
    // import Ionicons from 'react-native-vector-icons/Ionicons';
    // import DateTimePickerModal from 'react-native-modal-datetime-picker';
    // import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
    // import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
    // import Geolocation from '@react-native-community/geolocation';
    // import axios from 'axios';
    // import {
    //   widthPercentageToDP as wp,
    //   heightPercentageToDP as hp,
    // } from 'react-native-responsive-screen';
    // import {colors, fontSize, fontFamily, radius} from '../Constants';
    // import CustomButton from '../components/CustomButton';
    // import {UserContext} from '../Screens/UserContext';

    // const screen = Dimensions.get('window');
    // const ASPECT_RATIO = screen.width / screen.height;
    // const LATITUDE_DELTA = 0.04;
    // const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    // const GOOGLE_PLACES_API_KEY = 'AIzaSyBEpezNDENEaLW4Hog5yW5D-YIa5mbBCMA';

    // const MoreDetails = ({navigation}) => {
    //   const mapRef = useRef();
    //   const autoCompleteRef1 = useRef();
    //   const autoCompleteRef2 = useRef();
    //   const [destination, setDestination] = useState(null);
    //   const [location, setLocation] = useState(null);
    //   const [isEnabled, setIsEnabled] = useState(false);
    //   const [date, setDate] = useState(new Date());
    //   const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    //   const [isTimePickerVisible, setTimePickerVisible] = useState(false);

    //   const {
    //     pickerPoint1,
    //     setPickerPoint1,
    //     pickerPoint2,
    //     setPickerPoint2,
    //     coord1,
    //     setCoord1,
    //     coord2,
    //     setCoord2,
    //   } = useContext(UserContext);

    //   const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    //   const onPressAddress = (data, details = null, isPicker1 = true) => {
    //     const location = {
    //       latitude: details.geometry.location.lat,
    //       longitude: details.geometry.location.lng,
    //     };

    //     if (isPicker1) {
    //       setCoord1(location);
    //       setPickerPoint1(data.description);
    //     } else {
    //       setCoord2(location);
    //       setPickerPoint2(data.description);
    //     }

    //     adjustMapToShowBothMarkers(coord1, location);
    //   };

    //   const adjustMapToShowBothMarkers = (origin, destination) => {
    //     const midLat = (origin.latitude + destination.latitude) / 2;
    //     const midLng = (origin.longitude + destination.longitude) / 2;
    //     const latitudeDelta =
    //       Math.abs(origin.latitude - destination.latitude) * 1.5;
    //     const longitudeDelta =
    //       Math.abs(origin.longitude - destination.longitude) * 1.5;
    //     mapRef.current.animateToRegion(
    //       {
    //         latitude: midLat,
    //         longitude: midLng,
    //         latitudeDelta:
    //           latitudeDelta > LATITUDE_DELTA ? latitudeDelta : LATITUDE_DELTA,
    //         longitudeDelta:
    //           longitudeDelta > LONGITUDE_DELTA ? longitudeDelta : LONGITUDE_DELTA,
    //       },
    //       2000,
    //     );
    //   };

    //   const getLiveLocation = async () => {
    //     Geolocation.getCurrentPosition(
    //       position => {
    //         const {latitude, longitude} = position.coords;
    //         setCoord1({
    //           latitude: latitude,
    //           longitude: longitude,
    //           latitudeDelta: LATITUDE_DELTA,
    //           longitudeDelta: LONGITUDE_DELTA,
    //         });
    //         setLocation(position.coords);
    //         fetchAddressFromCoordinates(latitude, longitude);
    //       },
    //       error => console.log(error),
    //       {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    //     );
    //   };

    //   const fetchAddressFromCoordinates = async (latitude, longitude) => {
    //     try {
    //       const response = await axios.get(
    //         `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_PLACES_API_KEY}`,
    //       );
    //       if (response.data.results.length > 0) {
    //         const address = response.data.results[0].formatted_address;
    //         if (autoCompleteRef1.current) {
    //           autoCompleteRef1.current.setAddressText(address);
    //         }
    //         setPickerPoint1(address);
    //       }
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };

    //   useEffect(() => {
    //     getLiveLocation();
    //   }, []);

    //   useEffect(() => {
    //     if (coord1 && destination) {
    //       adjustMapToShowBothMarkers(coord1, destination);
    //     }
    //   }, [coord1, destination]);

    //   const handleDateChange = selectedDate => {
    //     setDate(selectedDate);
    //     setDatePickerVisible(false);
    //   };

    //   const handleTimeChange = selectedTime => {
    //     setDate(selectedTime);
    //     setTimePickerVisible(false);
    //   };

    //   return (
    //     <KeyboardAvoidingView
    //       style={{flex: 1, backgroundColor: '#1A1A1A'}}
    //       behavior="padding">
    //       <TouchableOpacity onPress={() => navigation.goBack()}>
    //         <Ionicons
    //           name="arrow-back"
    //           size={24}
    //           color="gray"
    //           style={styles.arrowStyle}
    //         />
    //       </TouchableOpacity>
    //       <SafeAreaView style={styles.container}>
    //         <View style={styles.searchContainer}>
    //           <View style={[styles.inputView, {zIndex: 2, flexDirection: 'row'}]}>
    //             <View style={styles.circle} />
    //             <GooglePlacesAutocomplete
    //               ref={autoCompleteRef1}
    //               placeholder="Enter Picker Point 1"
    //               fetchDetails={true}
    //               onPress={(data, details = null) =>
    //                 onPressAddress(data, details, true)
    //               }
    //               query={{
    //                 key: GOOGLE_PLACES_API_KEY,
    //                 language: 'en',
    //                 location: location
    //                   ? `${location.latitude},${location.longitude}`
    //                   : '',
    //                 radius: 2000,
    //               }}
    //               styles={{
    //                 container: styles.autocompleteContainer,
    //                 textInputContainer: styles.textInputContainer,
    //                 textInput: styles.textInput,
    //                 listView: styles.listView,
    //                 description: styles.description,
    //                 predefinedPlacesDescription: styles.predefinedPlacesDescription,
    //               }}
    //               currentLocation={true}
    //               currentLocationLabel="Current Location"
    //               predefinedPlacesAlwaysVisible={true}
    //               textInputProps={{
    //                 placeholderTextColor: colors.gray,
    //                 value: pickerPoint1,
    //                 editable: false,
    //               }}
    //             />
    //           </View>
    //           <View style={styles.line} />
    //           <View
    //             style={[
    //               styles.inputView,
    //               {zIndex: 1, flexDirection: 'row', marginTop: hp(8)},
    //             ]}>
    //             <View style={styles.rectangle} />
    //             <GooglePlacesAutocomplete
    //               ref={autoCompleteRef2}
    //               placeholder="Enter Picker Point 2"
    //               fetchDetails={true}
    //               onPress={(data, details = null) =>
    //                 onPressAddress(data, details, false)
    //               }
    //               query={{
    //                 key: GOOGLE_PLACES_API_KEY,
    //                 language: 'en',
    //                 location: location
    //                   ? `${location.latitude},${location.longitude}`
    //                   : '',
    //                 radius: 2000,
    //               }}
    //               styles={{
    //                 container: styles.autocompleteContainer,
    //                 textInputContainer: styles.textInputContainer,
    //                 textInput: styles.textInput,
    //                 listView: styles.listView,
    //                 description: styles.description,
    //                 predefinedPlacesDescription: styles.predefinedPlacesDescription,
    //               }}
    //               enablePoweredByContainer={false}
    //               textInputProps={{
    //                 placeholderTextColor: colors.gray,
    //                 value: pickerPoint2,
    //                 editable: false,
    //               }}
    //             />
    //           </View>
    //         </View>
    //         <View style={styles.ViewBox}>
    //           <View style={styles.switchContainer}>
    //             <Text style={styles.switchLabel}>Asap</Text>
    //             <Switch
    //               trackColor={{false: '#767577', true: 'yellow'}}
    //               thumbColor={isEnabled ? '#ffff' : '#f4f3f4'}
    //               ios_backgroundColor="#3e3e3e"
    //               onValueChange={toggleSwitch}
    //               value={isEnabled}
    //             />
    //             <Text style={styles.switchLabel}>Future</Text>
    //           </View>
    //           <Text style={styles.dateTimeLabel}>Date & Time</Text>
    //           {isEnabled ? (
    //             <View style={styles.dateTimeContainer}>
    //               <View style={styles.inputWithIcon}>
    //                 <TextInput
    //                   style={styles.input}
    //                   value={date.toLocaleDateString()}
    //                   editable={false}
    //                   placeholderTextColor={colors.lightGray}
    //                 />
    //                 <TouchableOpacity
    //                   onPress={() => setDatePickerVisible(true)}
    //                   style={styles.iconContainer}>
    //                   <Ionicons name="create-outline" size={24} color="gray" />
    //                 </TouchableOpacity>
    //               </View>
    //               <View style={styles.inputWithIcon}>
    //                 <TextInput
    //                   style={styles.input}
    //                   value={date.toLocaleTimeString()}
    //                   editable={false}
    //                   placeholderTextColor={colors.lightGray}
    //                 />
    //                 <TouchableOpacity
    //                   onPress={() => setTimePickerVisible(true)}
    //                   style={styles.iconContainer}>
    //                   <Ionicons name="create-outline" size={24} color="gray" />
    //                 </TouchableOpacity>
    //               </View>
    //             </View>
    //           ) : (
    //             <View style={styles.dateTimeContainer}>
    //               <TextInput
    //                 style={styles.input}
    //                 value={date.toLocaleDateString()}
    //                 editable={false}
    //                 placeholderTextColor={colors.lightGray}
    //               />
    //               <TextInput
    //                 style={styles.input}
    //                 value={date.toLocaleTimeString()}
    //                 editable={false}
    //                 placeholderTextColor={colors.lightGray}
    //               />
    //             </View>
    //           )}
    //           <DateTimePickerModal
    //             isVisible={isDatePickerVisible}
    //             mode="date"
    //             onConfirm={handleDateChange}
    //             onCancel={() => setDatePickerVisible(false)}
    //           />
    //           <DateTimePickerModal
    //             isVisible={isTimePickerVisible}
    //             mode="time"
    //             onConfirm={handleTimeChange}
    //             onCancel={() => setTimePickerVisible(false)}
    //           />
    //         </View>
    //         <View style={styles.mapContainer}></View>
    //         <View style={styles.btnView}>
    //           <CustomButton
    //             title="Submit"
    //             onPress={() => navigation.navigate('NextScreen')}
    //           />
    //         </View>
    //       </SafeAreaView>
    //     </KeyboardAvoidingView>
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
    fontWeight: '500',
  },
  ViewBox: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: hp(30),
    width: wp(90),
    alignSelf: 'center',
    marginBottom: hp(15),
    paddingTop: hp(2),
    shadowColor: colors.MistyRose,
    elevation: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: hp(2),
    left: wp(2),
  },
  switchLabel: {
    color: 'white',
    marginHorizontal: wp(2),
  },
  dateTimeLabel: {
    color: 'white',
    marginTop: hp(5),
    marginRight: 'auto',
    paddingHorizontal: wp(4),
    fontWeight: '600',
  },
  dateTimeContainer: {
    marginTop: hp(2),
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
    width: wp(70),
    padding: 8,
    fontSize: 16,
    marginBottom: 10,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
  },
  arrowStyle: {
    marginRight: 'auto',
    paddingHorizontal: wp(2),
    paddingVertical: hp(2),
  },
  btnView: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: hp(3),
    paddingHorizontal: wp(5),
  },
  label: {
    fontSize: fontSize.regSmall,
    fontFamily: fontFamily.medium,
    color: colors.White,
    marginBottom: hp(1),
    justifyContent: 'flex-start',
  },
  button: {
    backgroundColor: '#000000',
    paddingVertical: 15,
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
    color: 'white',
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
    paddingHorizontal: wp(2),
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  searchContainer: {
    zIndex: 1,
    flex: 0.3,
    backgroundColor: colors.lightblack,
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
    elevation: 20,
  },

  //////////with redux /////////////
  // container: {
  //   flex: 1,
  //   padding: wp(5),
  //   backgroundColor: '#1A1A1A',
  // },
  // arrowStyle: {
  //   paddingLeft: wp(5),
  //   paddingTop: hp(2),
  // },
  // searchContainer: {
  //   marginTop: hp(5),
  // },
  // inputView: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginBottom: hp(1.5),
  // },
  // circle: {
  //   width: 12,
  //   height: 12,
  //   borderRadius: 6,
  //   backgroundColor: colors.yellow,
  //   marginRight: wp(3),
  // },
  // rectangle: {
  //   width: 12,
  //   height: 12,
  //   backgroundColor: colors.lightGray,
  //   marginRight: wp(3),
  // },
  // line: {
  //   width: 1,
  //   backgroundColor: colors.gray,
  //   height: hp(8),
  //   marginLeft: wp(2),
  // },
  // ViewBox: {
  //   backgroundColor: '#333',
  //   borderRadius: radius.default,
  //   padding: wp(4),
  //   marginVertical: hp(2),
  // },
  // switchContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   marginBottom: hp(2),
  // },
  // switchLabel: {
  //   fontSize: fontSize.medium,
  //   color: colors.white,
  // },
  // dateTimeLabel: {
  //   fontSize: fontSize.medium,
  //   color: colors.white,
  //   marginBottom: hp(1),
  // },
  // dateTimeContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   marginBottom: hp(2),
  // },
  // inputWithIcon: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   borderColor: colors.lightGray,
  //   borderWidth: 1,
  //   borderRadius: radius.default,
  //   marginBottom: hp(1),
  // },
  // input: {
  //   flex: 1,
  //   padding: wp(2),
  //   color: colors.white,
  //   backgroundColor: colors.black,
  //   borderRadius: radius.default,
  // },
  // iconContainer: {
  //   padding: wp(2),
  // },
  // title: {
  //   fontSize: fontSize.medium,
  //   color: colors.white,
  //   marginBottom: hp(1),
  // },
  // BookView: {
  //   borderColor: colors.lightGray,
  //   borderWidth: 1,
  //   borderRadius: radius.default,
  //   marginBottom: hp(2),
  // },
  // mapContainer: {
  //   flex: 1,
  //   borderRadius: radius.default,
  //   overflow: 'hidden',
  //   marginBottom: hp(2),
  // },
  // map: {
  //   ...StyleSheet.absoluteFillObject,
  // },
  // btnView: {
  //   marginBottom: hp(2),
  // },
  // autocompleteContainer: {
  //   flex: 1,
  // },
  // textInputContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   backgroundColor: colors.black,
  //   borderRadius: radius.default,
  // },
  // textInput: {
  //   flex: 1,
  //   height: 40,
  //   color: colors.white,
  // },
  // listView: {
  //   backgroundColor: colors.black,
  // },
  // description: {
  //   color: colors.white,
  // },
  // predefinedPlacesDescription: {
  //   color: colors.white,
  // },
});

export default MoreDetails;

// // working wiyh redux
// import React, { useEffect, useRef, useState } from 'react';
// import { View, Text, TouchableOpacity, Switch, TextInput, StyleSheet, SafeAreaView, Dimensions, KeyboardAvoidingView } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import Geolocation from '@react-native-community/geolocation';
// import axios from 'axios';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
// import { colors, fontSize, fontFamily, radius } from '../Constants';
// import CustomButton from '../components/CustomButton';
// import { useDispatch, useSelector } from 'react-redux';
// // import { setPickerPoint1, setPickerPoint2 } from '../ReduxStore/actions';

// const screen = Dimensions.get('window');
// const ASPECT_RATIO = screen.width / screen.height;
// const LATITUDE_DELTA = 0.04;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
// const GOOGLE_PLACES_API_KEY = 'YOUR_GOOGLE_PLACES_API_KEY';

// const MoreDetails = ({ navigation }) => {
//   const dispatch = useDispatch();
//   const mapRef = useRef();
//   const autoCompleteRef1 = useRef();
//   const autoCompleteRef2 = useRef();
//   const [coord, setCoord] = useState(null);
//   const [destination, setDestination] = useState(null);
//   const [location, setLocation] = useState(null);
//   const [isEnabled, setIsEnabled] = useState(false);
//   const [date, setDate] = useState(new Date());
//   const [isDatePickerVisible, setDatePickerVisible] = useState(false);
//   const [isTimePickerVisible, setTimePickerVisible] = useState(false);

//   const toggleSwitch = () => setIsEnabled(previousState => !previousState);

//   const pickerPoint1 = useSelector((state) => state.pickerPoints.pickerPoint1);
//   const pickerPoint2 = useSelector((state) => state.pickerPoints.pickerPoint2);

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

//   const handleDateChange = (selectedDate) => {
//     setDate(selectedDate);
//     setDatePickerVisible(false);
//   };

//   const handleTimeChange = (selectedTime) => {
//     setDate(selectedTime);
//     setTimePickerVisible(false);
//   };

//   return (
//     <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#1A1A1A' }} behavior="padding">
//       <TouchableOpacity onPress={() => navigation.goBack()}>
//         <Ionicons name="arrow-back" size={24} color="gray" style={styles.arrowStyle} />
//       </TouchableOpacity>
//       <SafeAreaView style={styles.container}>
//         <View style={styles.searchContainer}>
//           <View style={[styles.inputView, { zIndex: 2, flexDirection: 'row' }]}>
//             <View style={styles.circle} />
//             <GooglePlacesAutocomplete
//               ref={autoCompleteRef1}
//               placeholder="Enter Picker Point 1"
//               fetchDetails={true}
//               onPress={(data, details = null) => onPressAddress(data, details, true)}
//               query={{
//                 key: GOOGLE_PLACES_API_KEY,
//                 language: 'en',
//                 location: location ? `${location.latitude},${location.longitude}` : '',
//                 radius: 2000,
//               }}
//               styles={{
//                 container: styles.autocompleteContainer,
//                 textInputContainer: styles.textInputContainer,
//                 textInput: styles.textInput,
//                 listView: styles.listView,
//                 description: styles.description,
//                 predefinedPlacesDescription: styles.predefinedPlacesDescription,
//               }}
//               currentLocation={true}
//               currentLocationLabel="Current Location"
//               predefinedPlacesAlwaysVisible={true}
//               textInputProps={{
//                 placeholderTextColor: colors.gray,
//                 value: pickerPoint1,
//                 editable: false,
//               }}
//             />
//           </View>
//           <View style={styles.line} />
//           <View style={[styles.inputView, { zIndex: 1, flexDirection: 'row', marginTop: hp(8) }]}>
//             <View style={styles.rectangle} />
//             <GooglePlacesAutocomplete
//               ref={autoCompleteRef2}
//               placeholder="Enter Picker Point 2"
//               fetchDetails={true}
//               onPress={(data, details = null) => onPressAddress(data, details, false)}
//               query={{
//                 key: GOOGLE_PLACES_API_KEY,
//                 language: 'en',
//                 location: location ? `${location.latitude},${location.longitude}` : '',
//                 radius: 2000,
//               }}
//               styles={{
//                 container: styles.autocompleteContainer,
//                 textInputContainer: styles.textInputContainer,
//                 textInput: styles.textInput,
//                 listView: styles.listView,
//                 description: styles.description,
//                 predefinedPlacesDescription: styles.predefinedPlacesDescription,
//               }}
//               enablePoweredByContainer={false}
//               textInputProps={{
//                 placeholderTextColor: colors.gray,
//                 value: pickerPoint2,
//                 editable: false,
//               }}
//             />
//           </View>
//         </View>
//         <View style={styles.ViewBox}>
//           <View style={styles.switchContainer}>
//             <Text style={styles.switchLabel}>Asap</Text>
//             <Switch
//               trackColor={{ false: "#767577", true: "yellow" }}
//               thumbColor={isEnabled ? "#ffff" : "#f4f3f4"}
//               ios_backgroundColor="#3e3e3e"
//               onValueChange={toggleSwitch}
//               value={isEnabled}
//             />
//             <Text style={styles.switchLabel}>Future</Text>
//           </View>
//           <Text style={styles.dateTimeLabel}>Date & Time</Text>
//           {isEnabled ? (
//             <View style={styles.dateTimeContainer}>
//               <View style={styles.inputWithIcon}>
//                 <TextInput style={styles.input} value={date.toLocaleDateString()} editable={false} placeholderTextColor={colors.lightGray} />
//                 <TouchableOpacity onPress={() => setDatePickerVisible(true)} style={styles.iconContainer}>
//                   <Ionicons name="create-outline" size={24} color="gray" />
//                 </TouchableOpacity>
//               </View>
//               <View style={styles.inputWithIcon}>

//                 <TextInput style={styles.input} value={date.toLocaleTimeString()} editable={false} placeholderTextColor={colors.lightGray} />
//                 <TouchableOpacity onPress={() => setTimePickerVisible(true)} style={styles.iconContainer}>
//                   <Ionicons name="create-outline" size={24} color="gray" />
//                 </TouchableOpacity>
//               </View>
//             </View>
//           ) : (
//             <View style={styles.dateTimeContainer}>
//               <TextInput style={styles.input} value={date.toLocaleDateString()} editable={false} placeholderTextColor={colors.lightGray} />
//               <TextInput style={styles.input} value={date.toLocaleTimeString()} editable={false} placeholderTextColor={colors.lightGray} />
//             </View>
//           )}
//         </View>
//         <DateTimePickerModal
//           isVisible={isDatePickerVisible}
//           mode="date"
//           minimumDate={new Date()}
//           onConfirm={handleDateChange}
//           onCancel={() => setDatePickerVisible(false)}
//         />
//         <DateTimePickerModal
//           isVisible={isTimePickerVisible}
//           mode="time"
//           onConfirm={handleTimeChange}
//           onCancel={() => setTimePickerVisible(false)}
//         />
//         <View style={styles.btnView}>
//           <CustomButton
//             onPress={() => navigation.navigate('Cars')}
//             title="Next"
//           />
//         </View>
//       </SafeAreaView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#1A1A1A',
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
//   ViewBox: {
//     backgroundColor: 'black',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     height: hp(30),
//     width: wp(90),
//     alignSelf: 'center',
//     marginBottom: hp(15),
//     paddingTop: hp(2),
//     shadowColor: colors.MistyRose,
//     elevation: 20
//   },
//   switchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     position: 'absolute',
//     top: hp(2),
//     left: wp(2),
//   },
//   switchLabel: {
//     color: 'white',
//     marginHorizontal: wp(2),
//   },
//   dateTimeLabel: {
//     color: 'white',
//     marginTop: hp(5),
//     marginRight: 'auto',
//     paddingHorizontal: wp(4),
//     fontWeight: '600'
//   },
//   dateTimeContainer: {
//     marginTop: hp(2),
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
//     width: wp(70),
//     padding: 8,
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   inputWithIcon: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   iconContainer: {
//     position: 'absolute',
//     right: 10,
//   },
//   arrowStyle: {
//     marginRight: 'auto',
//     paddingHorizontal: wp(2),
//     paddingVertical: hp(2)
//   },
//   btnView: {
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     marginBottom: hp(3),
//     paddingHorizontal: wp(5),
//   },
//   label: {
//     fontSize: fontSize.regSmall,
//     fontFamily: fontFamily.medium,
//     color: colors.White,
//     marginBottom: hp(1),
//     justifyContent: 'flex-start'
//   },
//   button: {
//     backgroundColor: '#000000',
//     paddingVertical: 15,
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
//     backgroundColor: colors.lightblack
//   },
//   autocompleteContainer: {
//     flex: 1,
//     zIndex: 1,
//     width: '80%',
//   },
//   textInputContainer: {
//     width: '100%',
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
//   inputView: {
//     position: 'absolute',
//     top: hp(0),
//     left: wp(2),
//     right: wp(2),
//   },
//   circle: {
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
//   icon: {
//     height: hp(4),
//     width: wp(5),
//     borderRadius: 40,
//     shadowOpacity: 10,
//     elevation: 20
//   }
// });

// export default MoreDetails;
