import React,{useState} from 'react';
import { View, Text, TouchableOpacity,ScrollView,TextInput, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import { colors } from '../../Constants/index';
import MapView, { Marker } from 'react-native-maps';
import Octicons  from 'react-native-vector-icons/Octicons';
import CustomButton from '../../components/CustomButton';
const AddMoreInputField = ({ navigation }) => {
    const [text, setText] = useState('');
  return (
    <View style={styles.container}>
         <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="gray" style={styles.arrowStyle} />
         </TouchableOpacity>

         <View style={styles.viewOne}>
           <View style={styles.inputView}>
           <View style={{flexDirection:'column',width:wp(5),marginRight:wp(2)}}>
           <View style={[styles.circle,{marginTop:hp(2)}]} />
           <View style={[styles.line,{height:hp(7)}]} />
            <View style={styles.circle} />
            <View style={[styles.line,{height:hp(10)}]} />
           <View style={styles.rectangle} />
         </View>
         <View style={{flexDirection:'column',width:wp(90),backgroundColor:'transparent'}}>
   <TextInput placeholder="Enter Source Point 1" 
       onChangeText={newText => setText(newText)}
       defaultValue={text}
       style={styles.inputStyle}
       placeholderTextColor={'gray'}
       onFocus={() => navigation.navigate('PickSaveLocation')}
       />
        <TextInput placeholder="Enter Source Point 2" 
       onChangeText={newText => setText(newText)}
       defaultValue={text}
       style={styles.inputStyle}
       placeholderTextColor={'gray'}
       onFocus={() => navigation.navigate('PickSaveLocation')}
       />
   <Text style={styles.textStyle}>+Via Point</Text>
        <TextInput placeholder="Where to?" 
       onChangeText={newText => setText(newText)}
       defaultValue={text}
       style={[styles.inputStyle,{marginTop:hp(2)}]}
       placeholderTextColor={'gray'}
       />
         </View>
      
      </View>
</View>
       
<View style={styles.mapView}>
   
    <View style={{flexDirection:'row',paddingHorizontal:wp(0),marginTop:hp(2),flexDirection:'start',backgroundColor:'transparent',height:hp(6),marginRight:wp(10)}}>
    <TouchableOpacity style={styles.save}>
    <FontAwesome name="search-plus" size={18} color="black"  style={styles.locationbtn} />
    <Text style={styles.textStylebtn}>Saved Places</Text>
    </TouchableOpacity>
  
   
    </View>
    <View style={{flexDirection:'row',paddingHorizontal:wp(0),marginTop:hp(2),flexDirection:'start',backgroundColor:'transparent',height:hp(6),marginRight:wp(10)}}>
    <TouchableOpacity style={styles.save}>
    <Octicons name="location" size={20} color="black" style={styles.locationbtn} />
    <Text style={styles.textStylebtn}>Set location on map</Text>
    </TouchableOpacity>
   
   
    </View>

</View>
     <View style={styles.btnView}>
        <CustomButton
          onPress={() => navigation.navigate('MapPinLocation')}
          title="Confirm Destination"
         
        />
      </View>
    </View>
     
 
  );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:colors.lightblack,
        padding:2
    },
    viewOne:{
     backgroundColor:'red',
      backgroundColor:colors.lightblack,
      marginTop:hp(0)
    },
    inputView:{
flexDirection:'row',
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
      paddingVertical:hp(2)
    },
    btnView: {
      justifyContent: 'flex-end',
      alignItems: 'center',
      margin:hp(3)
    },
    button: {
        backgroundColor: '#000000',
        paddingVertical: 15,
        borderRadius: 5,
        marginTop: 40,
        alignItems: 'center',
        width: '95%',
      },
    buttonText: {
      color: 'white',
      fontSize: 18,
    },
    mapView:{
      flex:1,
  
      padding:wp(3),
  
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
    textStylebtn:{
        color:colors.White,
        fontSize:13,
        fontWeight:'500',
          paddingVertical:hp(1),
          padding:wp(4)
    },
    save:{
        flexDirection:'row',
paddingHorizontal:hp(1),
    },
    savebtn:{
        backgroundColor:colors.greish,
        borderRadius:50,
        paddingHorizontal:wp(2.7),
        paddingVertical:hp(1.3)
    },
    locationbtn:{
         backgroundColor:colors.greish,
         borderRadius:50,
         width:wp(10),
         paddingHorizontal:wp(2.7),
         paddingVertical:wp(1.9),
         height:hp(5),
         alignItems:'center'
    },
    textStyle:{
        color:colors.White,
        fontSize:12,
        paddingHorizontal:wp(5)
            },
  });

export default AddMoreInputField;
