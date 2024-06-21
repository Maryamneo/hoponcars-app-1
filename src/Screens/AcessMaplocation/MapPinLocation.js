
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { colors } from '../../Constants/index';
import MapView, { Marker, Polyline } from 'react-native-maps';
import CustomButton from '../../components/CustomButton';

const MapPinLocation = ({ navigation }) => {
  
  const [source, setSource] = useState({ latitude: 31.522849291201936, longitude:  74.26557150000002 });
  const [destination, setDestination] = useState({ latitude: 31.513261286196453, longitude: 74.30921023707093});
  const [pickerPoint1, setPickerPoint1] = useState('');
  const [pickerPoint2, setPickerPoint2] = useState('');
  const [pickerPoint3, setPickerPoint3] = useState('');

  const handleDragEnd = (coord, setFunc) => {
    setFunc(coord);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="gray" style={styles.arrowStyle} />
      </TouchableOpacity>

      <View style={styles.viewOne}>
        <View style={styles.inputView}>
          <View style={{ flexDirection: 'column', width: wp(5), marginRight: wp(2) }}>
            <View style={[styles.circle, { marginTop: hp(2) }]} />
            <View style={[styles.line, { height: hp(7) }]} />
            <View style={styles.circle} />
            <View style={[styles.line, { height: hp(10) }]} />
            <View style={styles.rectangle} />
          </View>
          <View style={{ flexDirection: 'column', width: wp(90), backgroundColor: 'transparent' }}>
            <TextInput
              placeholder="Enter Picker Point 1"
              onChangeText={newText => setPickerPoint1(newText)}
              value={pickerPoint1}
              style={styles.inputStyle}
              placeholderTextColor={'gray'}
              // onFocus={() => navigation.navigate('PickSaveLocation')}
            />
            <TextInput
              placeholder="Enter Picker Point 2"
              onChangeText={newText => setPickerPoint2(newText)}
              value={pickerPoint2}
              style={styles.inputStyle}
              placeholderTextColor={'gray'}
              // onFocus={() => navigation.navigate('PickSaveLocation')}
            />
            <TextInput
              placeholder="Enter Picker Point 3"
              onChangeText={newText => setPickerPoint3(newText)}
              value={pickerPoint3}
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
          }}>
          <Marker
            draggable
            coordinate={source}
            onDragEnd={(e) => handleDragEnd(e.nativeEvent.coordinate, setSource)}
            title={'Source Marker'}
          />
          <Marker
            draggable
            coordinate={destination}
            onDragEnd={(e) => handleDragEnd(e.nativeEvent.coordinate, setDestination)}
            title={'Destination Marker'}
          />
          <Polyline
            coordinates={[source, destination]}
            strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
            strokeColors={[
              '#7F0000',
              '#00000000', // no color, creates a "gradient" effect
              '#B24112',
              '#E5845C',
              '#238C23',
              '#7F0000'
            ]}
            strokeWidth={6}
          />
        </MapView>
      </View>

      <View style={styles.btnView}>
        <CustomButton
          // onPress={() => navigation.navigate('AddMoreInputField')}
          title="Next"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightblack,
    padding: 2
  },
  viewOne: {
    backgroundColor: colors.lightblack,
  },
  inputView: {
    flexDirection: 'row',
  },
  inputStyle: {
    backgroundColor: 'black',
    width: '88%',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: wp(2),
    margin: hp(1),
    margin: wp(2),
    elevation: 10,
    shadowOpacity: 10,
    shadowColor: 'black',
    color:'white'
  },
  arrowStyle: {
    marginRight: 'auto',
    paddingHorizontal: wp(2),
    paddingVertical: hp(2)
  },
  btnView: {
    position: 'absolute',
    bottom: hp(5),
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  mapView: {
    flex: 1,
    padding: wp(3),
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject,
  },
  circle: {
    width: hp(1.3),
    height: hp(1.3),
    borderRadius: 10,
    backgroundColor: colors.greish,
    marginLeft: wp(6.2),
  },
  line: {
    height: hp(8),
    width: wp(0.4),
    backgroundColor: colors.greish,
    marginLeft: wp(7.5),
  },
  rectangle: {
    width: hp(1.3),
    height: hp(1.3),
    backgroundColor: colors.greish,
    marginLeft: wp(6.3),
  },
  textStylebtn: {
    color: colors.White,
    fontSize: 13,
    fontWeight: '500',
    paddingVertical: hp(1),
    padding: wp(4)
  },
  textStyle: {
    color: colors.White,
    fontSize: 12,
    paddingHorizontal: wp(5)
  },
});
export default MapPinLocation;
