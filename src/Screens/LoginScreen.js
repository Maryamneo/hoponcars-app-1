import React, { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CountryPickerInput } from '../components/CountryPickerInput';
import { colors, fontFamily } from '../Constants/index';
import CustomButton from '../components/CustomButton';

const LoginScreen = ({ navigation }) => {
    const [countryNameCode, setCountryNameCode] = useState('GB');
    const [callingCode, setCallingCode] = useState('+44');

    const onCountrySelect = value => {
        setCountryNameCode(value.cca2);
        setCallingCode('+' + value.callingCode);
    };

    const validationSchema = Yup.object().shape({
        phoneNumber: Yup.string()
        .required('Phone number is required')
        .matches(/^\d{11}$/, 'Phone number must be exactly 11 digits'),

    });

    const formik = useFormik({
        initialValues: { phoneNumber: '' },
        validationSchema: validationSchema,
        onSubmit: values => {
            navigation.navigate('NumberVerify');
        },
    });

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#1A1A1A' }}>
            <KeyboardAwareScrollView contentContainerStyle={styles.container}>
                <View>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="gray" style={styles.arrowStyle} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Enter your mobile number</Text>
                    <View style={styles.inputContainer}>
                        <CountryPickerInput
                            countryNameCode={countryNameCode}
                            callingCode={callingCode}
                            onSelect={onCountrySelect}
                            value={formik.values.phoneNumber}
                            onChangeText={formik.handleChange('phoneNumber')}
                            onBlur={formik.handleBlur('phoneNumber')}
                        />
                    </View>
                    {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                        <Text style={styles.errorText}>{formik.errors.phoneNumber}</Text>
                    ) : null}
                </View>
                <Text style={styles.textStyle}>
                    By continuing you may receive an SMS for verification. Message and data rates may apply.
                </Text>
                <View style={styles.btnView}>
                    <CustomButton
                        onPress={formik.handleSubmit}
                        title="Next"
                    />
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
        fontSize: 28,
        color: 'white',
        marginBottom: 40,
        marginTop: 20,
        textAlign: 'left',
        fontWeight: '500',
    },
    inputContainer: {
        flexDirection: 'row',
        width: wp('100%'),
        alignSelf: 'center',
        marginVertical: 10,
    },
    arrowStyle: {
        marginRight: 'auto',
    },
    btnView: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: hp(3),
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
    textStyle: {
        marginTop: hp(40),
        fontSize: 16,
        color: colors.White,
        fontWeight: '500',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        // marginTop: hp(1),
        marginLeft: wp(15),
    },
});

export default LoginScreen;

// import React, { useState, useRef } from 'react';
// import { View, Text, TouchableOpacity, KeyboardAvoidingView, TextInput, StyleSheet } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { Formik } from 'formik';
// import * as Yup from 'yup';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from "react-native-responsive-screen";
// import CustomButton from '../components/CustomButton';
// import { colors } from '../Constants/index';

// const validationSchema = Yup.object().shape({
//   otp1: Yup.string().required('OTP is Required'),
 
// });

// const NumberVerify = ({ navigation }) => {
//   const otpTextInputRefs = useRef([]);

//   const handleOTPChange = (index, value, handleChange) => {
//     handleChange(`otp${index + 1}`)(value);
//     if (value && index < 3) {
//       otpTextInputRefs.current[index + 1].focus();
//     }
//   };

//   const handleBackspace = (index, value, setFieldValue) => {
//     if (value === '' && index > 0) {
//       setFieldValue(`otp${index + 1}`, '');
//       otpTextInputRefs.current[index - 1].focus();
//     }
//   };

//   return (
//     <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#1A1A1A' }}>
//       <KeyboardAwareScrollView contentContainerStyle={styles.container}>
//         <Formik
//           initialValues={{ otp1: '', otp2: '', otp3: '', otp4: '' }}
//           validationSchema={validationSchema}
//           onSubmit={(values) => {
//             console.log(values);
//             navigation.navigate('firstlastname');
//           }}
//         >
//           {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
//             <>
//               <View>
//                 <TouchableOpacity onPress={() => navigation.goBack()}>
//                   <Ionicons name="arrow-back" size={24} color="gray" style={styles.arrowStyle} />
//                 </TouchableOpacity>
//                 <Text style={styles.title}>Enter the 4-digit code sent to {'\n'}you at </Text>
//                 <Text style={styles.phonestyle}>+44 7397047724</Text>
//                 <View style={styles.inputContainer}>
//                   {['otp1', 'otp2', 'otp3', 'otp4'].map((field, index) => (
//                     <TextInput
//                       key={index}
//                       ref={ref => (otpTextInputRefs.current[index] = ref)}
//                       style={styles.textInputStyle}
//                       value={values[field]}
//                       onChangeText={text => handleOTPChange(index, text, handleChange)}
//                       onKeyPress={({ nativeEvent }) => {
//                         if (nativeEvent.key === 'Backspace') {
//                           handleBackspace(index, values[field], setFieldValue);
//                         }
//                       }}
//                       onBlur={handleBlur(field)}
//                       keyboardType="numeric"
//                       maxLength={1}
//                     />
//                   ))}
//                 </View>
//                 {['otp1', 'otp2', 'otp3', 'otp4'].map((field, index) =>
//                   errors[field] && touched[field] ? (
//                     <Text key={index} style={styles.errorText}>{errors[field]}</Text>
//                   ) : null
//                 )}
//                 <Text style={styles.receiveStyle}>
//                   Don't receive a code? <Text style={styles.resendStyle}>Resend Code</Text>
//                 </Text>
//               </View>
//               <View style={styles.btnView}>
//                 <CustomButton
//                   title="Next"
//                   onPress={handleSubmit}
//                   disabled={!values.otp1 || !values.otp2 || !values.otp3 || !values.otp4}
//                 />
//               </View>
//             </>
//           )}
//         </Formik>
//       </KeyboardAwareScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#1A1A1A',
//     padding: 16,
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
//     paddingVertical: hp(3),
//     width: wp(90),
//   },
//   arrowStyle: {
//     marginRight: 'auto',
//   },
//   btnView: {
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     marginBottom: hp(3),
//     paddingHorizontal: wp(15),
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
//   errorText: {
//     color: 'red',
//     fontSize: 14,
//     paddingHorizontal: wp(4),
//     alignSelf: 'start'
//   },
// });

// export default NumberVerify;
