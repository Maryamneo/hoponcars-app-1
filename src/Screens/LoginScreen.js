// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity,TextInput, KeyboardAvoidingView, StyleSheet } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { colors } from '../Constants/index';
// import { CountryPickerInput } from '../components/CountryPickerInput';
// import CustomButton from '../components/CustomButton';
// // import { useRegisterUserMutation } from '../RTKApis/services/userApi'; // Ensure correct import path

// const LoginScreen = ({ navigation,route }) => {
//     const { username, email, password } = route.params;
// console.log('username-------',username);
// console.log('email----------',email);
// console.log('password-------',password)
//     const [countryNameCode, setCountryNameCode] = useState('GB');
//     const [callingCode, setCallingCode] = useState('+44');
//     // const [registerUser, { isLoading, error }] = useRegisterUserMutation();

//     const onCountrySelect = (value) => {
//         setCountryNameCode(value.cca2);
//         setCallingCode('+' + value.callingCode);
//     };

//     const validationSchema = Yup.object().shape({
//         phoneNumber: Yup.string()
//             .required('Phone number is required')
//             .matches(/^\d{11}$/, 'Phone number must be exactly 11 digits'),
//         username: Yup.string()
//             .required('Username is required')
//     });

//     const formik = useFormik({
//         initialValues: { phoneNumber: ''},
//         validationSchema: validationSchema,
//         // onSubmit: async (values) => {
//         //     console.log('presssssssss')
//         //     try {
//         //         const userData = {
//         //             phoneNumber: callingCode + values.phoneNumber,
//         //             country: countryNameCode,
//         //             username: values.username
//         //         };
//         //         console.log('userData:', userData);
//         //         const response = await registerUser(userData).unwrap();
//         //         console.log('Registration successful:', response);

//         //         // Extract the OTP from the response (assume the response contains an `otp` field)
//         //         const otp = response.otp;

//         //         navigation.navigate('NumberVerify', { otp }); // Navigate to verification screen with OTP
//         //     } catch (err) {
//         //         console.error('Registration failed:', err);
//         //         // Handle error state or display error message to the user
//         //     }
//         // },
//     });

//     return (
//         <KeyboardAvoidingView style={styles.container} behavior="padding">
//             <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//                 <Ionicons name="arrow-back" size={24} color="gray" />
//             </TouchableOpacity>
//             <Text style={styles.title}>Enter your mobile number</Text>
//             <View style={styles.formContainer}>
//                 <CountryPickerInput
//                     countryNameCode={countryNameCode}
//                     callingCode={callingCode}
//                     onSelect={onCountrySelect}
//                     value={formik.values.phoneNumber}
//                     onChangeText={formik.handleChange('phoneNumber')}
//                     onBlur={formik.handleBlur('phoneNumber')}
//                 />
//                 {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
//                     <Text style={styles.errorText}>{formik.errors.phoneNumber}</Text>
//                 ) : null}

//             </View>
//             <View style={styles.buttonContainer}>
//                 <Text style={styles.disclaimerText}>
//                     By continuing you may receive an SMS for verification. Message and data rates may apply.
//                 </Text>
//                 <TouchableOpacity onPress={formik.handleSubmit} style={styles.button}>
//                     <Text style={styles.buttonText}>Next</Text>
//                 </TouchableOpacity>
//             </View>
//         </KeyboardAvoidingView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#1A1A1A',
//         padding: 16,
//     },
//     backButton: {
//         position: 'absolute',
//         top: 20,
//         left: 16,
//     },
//     title: {
//         fontSize: 28,
//         color: 'white',
//         marginTop: 60, // Ensuring the title is just below the back button
//         textAlign: 'left',
//         fontWeight: '500',
//     },
//     formContainer: {
//         flex: 1,
//         marginTop: 20,
//     },
//     input: {
//         borderBottomWidth: 1,
//         borderBottomColor: 'gray',
//         color: 'white',
//         marginTop: 20,
//         padding: 10,
//     },
//     buttonContainer: {
//         marginBottom: 20, // Ensure the button is at the bottom
//         paddingHorizontal: 16,
//     },
//     button: {
//         backgroundColor: colors.primary,
//         padding: 15,
//         borderRadius: 5,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     buttonText: {
//         color: 'white',
//         fontSize: 16,
//         fontWeight: '600',
//     },
//     errorText: {
//         color: 'red',
//         fontSize: 12,
//         marginTop: 5,
//     },
//     disclaimerText: {
//         fontSize: 14,
//         color: 'white',
//         textAlign: 'center',
//         marginBottom: 20, // Space below the disclaimer text
//     },
// });

// export default LoginScreen;

import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useRegisterUserMutation} from '../RTKApis/services/userApi'; // Adjust import path as needed
import {colors} from '../Constants/index';
import {UserContext} from '../Screens/UserContext';

const LoginScreen = ({navigation}) => {
  const {email, password, username, setPhoneNumber} = useContext(UserContext);
  console.log('username-=-=-=-=-=', username);

  const [countryNameCode, setCountryNameCode] = useState('GB');
  const [callingCode, setCallingCode] = useState('+44');
  const [registerUser, {isLoading, error}] = useRegisterUserMutation();

  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .required('Phone number is required')
      .matches(/^\d{11}$/, 'Phone number must be exactly 11 digits'),
  });

  const formik = useFormik({
    initialValues: {phoneNumber: ''},
    validationSchema: validationSchema,
    onSubmit: async values => {
      setPhoneNumber(callingCode + values.phoneNumber);
      try {
        const userData = {
          phone: callingCode + values.phoneNumber,
          username: username,
          email: email,
          password: password,
        };
        console.log('userData:::::::::::', userData);
        const response = await registerUser(userData).unwrap();
        console.log('Registration successful:--------+++++++', response.otp);
        const OTP = response.otp;
        navigation.navigate('NumberVerify', {OTP});
      } catch (err) {
        console.error('Registration failed:', err);
      }
    },
  });

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="gray" />
      </TouchableOpacity>

      <View style={{flex: 1, marginTop: 50, marginBottom: 100}}>
        <Text style={styles.title}>Enter your mobile number</Text>

        <Text style={styles.label}>Phone Number</Text>
        <View style={styles.inputView}>
          <Octicons
            name="person"
            size={20}
            color="gray"
            style={styles.iconStyle}
          />
          <Text style={styles.callingCode}>{callingCode}</Text>
          <TextInput
            placeholder="Enter phone number"
            style={styles.input}
            placeholderTextColor="white"
            value={formik.values.phoneNumber}
            onChangeText={text => formik.setFieldValue('phoneNumber', text)}
            onBlur={formik.handleBlur('phoneNumber')}
            keyboardType="phone-pad"
          />
        </View>
        {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
          <Text style={styles.errorText}>{formik.errors.phoneNumber}</Text>
        ) : null}
      </View>

      <TouchableOpacity onPress={formik.handleSubmit} style={styles.btnView}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
      {/* <View style={styles.btnView}> */}
      {/* <TouchableOpacity onPress={formik.handleSubmit} style={[styles.iinputView, { backgroundColor: colors.yellow }]}> */}
      {/* <Text style={styles.buttonText}>Next</Text> */}
      {/* </TouchableOpacity> */}
      {/* </View> */}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    padding: 16,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 16,
  },
  title: {
    fontSize: 22,
    color: 'white',
    marginTop: 60,
    textAlign: 'left',
    fontWeight: '500',
  },
  label: {
    fontSize: 14,
    fontWeight: '400',
    color: '#fff',
    marginBottom: 4,
  },
  inputView: {
    flexDirection: 'row',
    height: 60,
    width: '98%',
    borderColor: colors.yellow,
    borderWidth: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    alignItems: 'center',
    paddingLeft: 10,
    marginTop: 30,
  },

  input: {
    color: 'white',
    padding: 8,
    fontSize: 16,
    flex: 1,
  },
  iconStyle: {
    paddingRight: 10,
  },
  callingCode: {
    color: 'white',
    fontSize: 16,
    marginRight: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  btnView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: colors.yellow,
    paddingHorizontal: 10,
    paddingVertical: 15,

    borderRadius: 18,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LoginScreen;
