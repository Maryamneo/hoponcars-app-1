import React,{useEffect, useState, useRef} from 'react';
import { View, Text, TouchableOpacity,KeyboardAvoidingView,TextInput, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { colors } from '../Constants/index';
const NameScreen = ({ navigation }) => {
    const [otp, setOTP] = useState(['', '', '', '']);
    const otpTextInputRefs = useRef([]);

    const handleOTPChange = (index, value) => {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);
      if (index < otp.length - 1 && value) {
        otpTextInputRefs.current[index + 1].focus();
      }
    };
    const isOTPComplete = () => {
      return otp.every(digit => digit !== '');
    };
  return (

    <KeyboardAvoidingView style={{ flex: 1,backgroundColor:'red' }}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" style={styles.arrowStyle} />
          </TouchableOpacity>
          <Text style={styles.title}>Enter the 4-digit code sent to {'\n'}you at </Text>
          <Text style={styles.phonestyle}>+44 7397047724</Text>
          <View style={styles.inputContainer}>
              {otp.map((digit, index) => (
                   <TextInput
                       placeholder="-"
                        key={index}
                        ref={ref => (otpTextInputRefs.current[index] = ref)}
                        style={styles.textInputStyle}
                        value={digit}
                        color={'white'}
                        fontSize={20}
                        onChangeText={text => handleOTPChange(index, text)}
                         keyboardType="numeric"
                         maxLength={1}
                            />
                        ))}
                    </View>

                    <Text style={styles.resendStyle}>Resend Code</Text>
        </View>
        <View style={styles.btnView}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TermAndPolicy')}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1A1A1A',
      padding: 16,
      justifyContent: 'space-between',

    },
    title: {
      fontSize: 24,
      color: 'white',
      marginBottom: 20,
      marginTop:20,
      textAlign: 'left',
      fontWeight:'500'
    
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
   width:'75%',
        alignSelf:'center',
        // marginHorizontal:10
    
        
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
    },
    btnView: {
      justifyContent: 'flex-end',
      alignItems: 'center',
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
    phonestyle:{
        fontSize:18,
        color:'white'
    },
    textInputStyle: {
        width: 45,
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        borderRadius: 5,
        textAlign: 'center',
        fontSize: 18,
        color: 'white',
        // backgroundColor: '#333',
         marginHorizontal: 26,
    },
    resendStyle:{
        color:colors.purpleblue,
        justifyContent:'flex-start',
        paddingHorizontal:wp(2),
        paddingVertical:hp(3),
        fontSize:17,
        fontWeight:'500'
    }
  });

export default NameScreen;
