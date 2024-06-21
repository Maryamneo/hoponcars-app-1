
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { colors } from '../../Constants/index';
import MapView, { Marker, Polyline } from 'react-native-maps';
import CustomButton from '../../components/CustomButton';

const MoreDetails = ({ navigation }) => {
  
  const [pickerPoint1, setPickerPoint1] = useState('');
  const [pickerPoint2, setPickerPoint2] = useState('');
  const [pickerPoint3, setPickerPoint3] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [passengers, setPassengers] = useState('');
  const [luggages, setLuggages] = useState('');
  const [handLuggages, setHandLuggages] = useState('');
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="gray" style={styles.arrowStyle} />
      </TouchableOpacity>

      <View style={styles.viewOne}>
        <View style={styles.inputView}>
          <View style={{ flexDirection: 'column', width: wp(5), marginRight: wp(2) }}>
            <View style={[styles.circle, { marginTop: hp(3) }]} />
            <View style={[styles.line, { height: hp(7) }]} />
            <View style={styles.circle} />
            <View style={[styles.line, { height: hp(7) }]} />
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
<View>
    
</View>
    <View style={styles.moremainView}>
    <View style={styles.mapView}>
        <View style={styles.moreView}>
        <Text style={styles.moreDetailStyle}>
        More Details
        </Text>
        </View>
       
      <View style={styles.inputlogoView}>

      <View style={styles.rowView}>
                <Fontisto name="date" size={15} color="black" style={styles.iconWhite} />
                <TextInput
                  placeholder="Date"
                  onChangeText={(newText) => setDate(newText)}
                  value={date}
                  style={styles.inputStyle2}
                  placeholderTextColor={'gray'}
                />
              </View>
              <View style={styles.rowView}>
                <Ionicons name="time-outline" size={17} color="black" style={styles.iconWhite} />
                <TextInput
                  placeholder="Time"
                  onChangeText={(newText) => setTime(newText)}
                  value={time}
                  style={styles.inputStyle2}
                  placeholderTextColor={'gray'}
                />
              </View>
<View style={styles.rowView}>
<Ionicons name="people-outline" size={17} color="black" style={styles.iconWhite} />
    <TextInput
              placeholder="Passangers"
              onChangeText={newText => setPassengers(newText)}
              value={pickerPoint2}
              style={styles.inputStyle2}
              placeholderTextColor={'gray'}
              // onFocus={() => navigation.navigate('PickSaveLocation')}
            />
</View>
<View style={styles.rowView}>
<SimpleLineIcons name="bag" size={15} color="black" style={styles.iconWhite} />
    <TextInput
              placeholder="Luggages"
              onChangeText={newText => setLuggages(newText)}
              value={pickerPoint2}
              style={styles.inputStyle2}
              placeholderTextColor={'gray'}
              // onFocus={() => navigation.navigate('PickSaveLocation')}
            />
</View>
<View style={styles.rowView}>
<SimpleLineIcons name="handbag" size={15} color="black" style={styles.iconWhite} />
    <TextInput
              placeholder="Hand Luggages"
              onChangeText={newText => setHandLuggages(newText)}
              value={pickerPoint2}
              style={styles.inputStyle2}
              placeholderTextColor={'gray'}
              // onFocus={() => navigation.navigate('PickSaveLocation')}
            />
</View>

      </View>
      </View>
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
  inputStyle2:{
    backgroundColor: 'black',
    width: '92%',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: wp(2),
    margin: hp(1),
    marginRight: wp(-2),
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
  iconWhite:{
    marginTop:hp(2),
    marginRight: 'auto',
     paddingHorizontal: wp(2),
     height:hp(4),
      padding:wp(2),
     paddingVertical: hp(0.7),
    borderRadius:20,
    backgroundColor:colors.White,
    marginLeft:wp(-2)
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
    backgroundColor: colors.lightblack,
   
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
  inputlogoView:{
    paddingHorizontal:wp(3),
    height:hp(40),
    backgroundColor: colors.lightblack,
    flexDirection:'colmn'
  },
  rowView:{
    flexDirection:'row'
  },
  moreView:{
    // paddingHorizontal:wp(3),
    // height:hp(10),

    flexDirection:'colmn'
  },
  moreDetailStyle:{
    color: colors.White,
    fontWeight:'700',
    textAlign:'center',
    fontSize:22,
    paddingVertical:hp(1)
  },
  moremainView:{
    borderWidth:1,
    borderColor:'white',
    width:wp(90),
    height:hp(53),
    justifyContent:'center',
    alignSelf:'center',
    shadowOpacity:10,
    elevation:10,
    borderRadius:2

  }
});
export default MoreDetails;
