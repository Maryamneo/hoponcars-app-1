// import React,{useEffect, useState, useRef} from 'react';
// import { View, Text, TouchableOpacity,KeyboardAvoidingView,TextInput, StyleSheet } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import {
//     widthPercentageToDP as wp,
//     heightPercentageToDP as hp,
//   } from "react-native-responsive-screen";
// import { Colors } from 'react-native/Libraries/NewAppScreen';
// import { colors } from '../Constants/index';
// import CustomButton from '../components/CustomButton';
// const NameScreen = ({ navigation }) => {
//     const [otp, setOTP] = useState(['', '', '', '']);
//     const otpTextInputRefs = useRef([]);

//     const handleOTPChange = (index, value) => {
//       const newOTP = [...otp];
//       newOTP[index] = value;
//       setOTP(newOTP);
//       if (index < otp.length - 1 && value) {
//         otpTextInputRefs.current[index + 1].focus();
//       }
//     };
//     const isOTPComplete = () => {
//       return otp.every(digit => digit !== '');
//     };
//   return (
//     <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#1A1A1A' }}>
//     <KeyboardAwareScrollView contentContainerStyle={styles.container}>
   

    
//          <View>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Ionicons name="arrow-back" size={24} color="gray" style={styles.arrowStyle} />
//           </TouchableOpacity>
//           <Text style={styles.title}>Enter the 4-digit code sent to {'\n'}you at </Text>
//           <Text style={styles.phonestyle}>+44 7397047724</Text>
//           <View style={styles.inputContainer}>
//               {otp.map((digit, index) => (
//                    <TextInput
//                      placeholder="-"
//                     key={index}
//                     ref={ref => (otpTextInputRefs.current[index] = ref)}
//                     style={styles.textInputStyle}
//                     value={digit}
//                     color={'white'}
//                     fontSize={20}
//                     onChangeText={text => handleOTPChange(index, text)}
//                     keyboardType="numeric"
//                     maxLength={1}
//                     />
//                     ))}
//            </View>
//        <Text style={styles.receiveStyle}>
//        Dont't recieve a code? <Text style={styles.resendStyle}>Resend Code</Text>
//        </Text>
                   
//         </View>
//         <View style={styles.btnView}>
//                  <CustomButton
//                  onPress={() => navigation.navigate('firstlastname')}
//                  title="Next"
//                  />
//         </View>
         
//                 </KeyboardAwareScrollView>
//                 </KeyboardAvoidingView>
  
//   );
// };

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#1A1A1A',
//       padding: 16,
//       justifyContent: 'space-between',

//     },
//     title: {
//       fontSize: 24,
//       color: 'white',
//       marginBottom: 20,
//       marginTop:20,
//       textAlign: 'left',
//       fontWeight:'500'
    
//     },
//     inputContainer: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         paddingVertical: hp(5),
//         width:wp(90), 
//     },
 
//     input: {
//       color: 'white',
//       borderBottomWidth: 1,
//       borderBottomColor: '#DADADA',
//       width: 140,
//       padding: 8,
//       fontSize: 16,
//     },
//     arrowStyle: {
//       marginRight: 'auto',
//     },
//     btnView: {
     
//         justifyContent: 'flex-end',
//         alignItems: 'center',
//         marginBottom: hp(3),
//        paddingHorizontal: wp(15),
  
//     },
//     button: {
//       backgroundColor: '#000000',
//       paddingVertical: 15,
//       borderRadius: 5,
//       marginTop: 40,
//       alignItems: 'center',
//       width: '100%',
//     },
//     buttonText: {
//       color: 'white',
//       fontSize: 18,
//     },
//     phonestyle:{
//         fontSize:18,
//         color:'white'
//     },
//     textInputStyle: {
//         width: 60,
//         height: 60,
//         borderBottomWidth: 1,
//         borderBottomColor: 'white',
//         borderRadius: 5,
//         textAlign: 'center',
//         fontSize: 18,
//         color: 'white',
//         // backgroundColor: '#333',
//          marginHorizontal: wp(4),
//     },
//     resendStyle:{
//         color:colors.purpleblue,
//         justifyContent:'flex-start',
//         // paddingHorizontal:wp(2),
//         fontSize:16,
//         fontWeight:'500',
//         textDecorationLine:'underline',
//     },
//     receiveStyle:
//     {
//     flexDirection:'row',
//     color:colors.White,
//     fontSize:15,
//     paddingHorizontal:wp(2)
//   }
//   });

// export default NameScreen;
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, TextInput, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CustomButton from '../components/CustomButton';
import { colors } from '../Constants/index';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  otp: Yup.string()
    .matches(/^\d{4}$/, 'OTP must be 4 digits')
    .required('OTP is required'),
});

const NumberVerify = ({ navigation }) => {
  const [otp, setOTP] = useState(['', '', '', '']);
  const otpTextInputRefs = useRef([]);

  const handleOTPChange = (index, value) => {
    const newOTP = [...otp];
    newOTP[index] = value;

    if (value === '' && index > 0) {
      otpTextInputRefs.current[index - 1].focus();
      newOTP[index - 1] = '';
    } else if (index < otp.length - 1 && value) {
      otpTextInputRefs.current[index + 1].focus();
    }

    setOTP(newOTP);
  };

  const handleOTPDelete = (index) => {
    const newOTP = [...otp];
    if (index > 0) {
      otpTextInputRefs.current[index - 1].focus();
    }
    newOTP[index] = '';
    setOTP(newOTP);
  };

  const isOTPComplete = otp.every(digit => digit !== '');

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#1A1A1A' }}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <Formik
          initialValues={{ otp: '' }}
          validationSchema={validationSchema}
          validateOnChange={false}
          onSubmit={(values, { setSubmitting }) => {
            if (isOTPComplete) {
              navigation.navigate('Cars');
            }
            setSubmitting(false);
          }}
        >
          {({ handleSubmit, setFieldValue, isSubmitting }) => (
            <>
              <View>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name="arrow-back" size={24} color="gray" style={styles.arrowStyle} />
                </TouchableOpacity>
                <Text style={styles.title}>Enter the 4-digit code sent to {'\n'}you at </Text>
                <Text style={styles.phonestyle}>+44 7397047724</Text>
                <View style={styles.inputContainer}>
                  {otp.map((digit, index) => (
                    <TextInput
                      key={index}
                      ref={ref => (otpTextInputRefs.current[index] = ref)}
                      style={styles.textInputStyle}
                      value={digit}
                      onChangeText={text => {
                        handleOTPChange(index, text);
                        setFieldValue('otp', otp.join(''));
                      }}
                      keyboardType="numeric"
                      maxLength={1}
                      onKeyPress={({ nativeEvent }) => {
                        if (nativeEvent.key === 'Backspace' && otp[index] === '') {
                          handleOTPDelete(index);
                        }
                      }}
                    />
                  ))}
                </View>
                {!isOTPComplete && (
                  <Text style={styles.errorText}>OTP is required and must be 4 digits</Text>
                )}
                <Text style={styles.receiveStyle}>
                  Don't receive a code? <Text style={styles.resendStyle}>Resend Code</Text>
                </Text>
              </View>

              <View style={styles.btnView}>
                <CustomButton
                onPress={()=>navigation.navigate('TermAndPolicy')}
                  // onPress={handleSubmit}
                  title="Next"
                  disabled={isSubmitting || !isOTPComplete} // Disable button if OTP is not complete
                />
              </View>
            </>
          )}
        </Formik>
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
    marginTop: 20,
    textAlign: 'left',
    fontWeight: '500'
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp(2),
    width: wp(90),
  },
  arrowStyle: {
    marginRight: 'auto',
  },
  btnView: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: hp(3),
    paddingHorizontal: wp(15),
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
  errorText: {
    color: 'red',
    fontSize: 14,
    paddingHorizontal: wp(3),
    marginRight: 'auto',
  },
});

export default NumberVerify;
