// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, KeyboardAvoidingView, StyleSheet, TextInput, Alert, Image, Keyboard } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Octicons from 'react-native-vector-icons/Octicons';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useLoginUserMutation } from '../RTKApis/services/userApi'; // Ensure correct import path
// import { colors } from '../Constants/index';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { useForgetPasswordMutation } from '../RTKApis/services/userApi';
// const ForgotPass = ({ navigation }) => {
//     const [countryNameCode, setCountryNameCode] = useState('GB');
//     const [callingCode, setCallingCode] = useState('+44');
//     const [passwordVisible, setPasswordVisible] = useState(false); // State to manage password visibility
//     const [forgetPassword, { isLoading, error }] = useForgetPasswordMutation();
   
//     const [keyboardVisible, setKeyboardVisible] = useState(false);

//     useEffect(() => {
//         if (error) {
//             console.error('Registration failed:', error);
//             // Optionally, display error message to the user here
//         }

//         const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
//             setKeyboardVisible(true);
//         });
//         const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
//             setKeyboardVisible(false);
//         });

//         return () => {
//             keyboardDidShowListener.remove();
//             keyboardDidHideListener.remove();
//         };
//     }, [error]);

//     const onCountrySelect = (value) => {
//         setCountryNameCode(value.cca2);
//         setCallingCode('+' + value.callingCode);
//     };

//     const validationSchema = Yup.object().shape({
//         phone: Yup.string()
//             .required('Phone number is required')
//             .matches(/^\d{11}$/, 'Phone number must be exactly 11 digits'), // Adjust regex to match 10 digits
//         password: Yup.string()
//             .required('Password is required')
//             .min(6, 'Password must be at least 6 characters')
//     });

//     const formik = useFormik({
//         initialValues: { phone: '' },
//         validationSchema: validationSchema,
//         onSubmit: async (values) => {
//             console.log('Submit button pressed');
//             try {
//                 const phoneData = {
//                     phone: callingCode + values.phone,
//                 };
//                 console.log('phoneData:', phoneData);
//                 const response = await forgetPassword(phoneData).unwrap();
//                 console.log('Forget password request successful:', response);

//                 // Navigate to the next screen after successful request
//                 navigation.navigate('NumberVerify', { /* Pass any necessary data to next screen */ });
//             } catch (err) {
//                 console.error('Forget password request failed:', err);
//                 Alert.alert('Request Failed', 'Please check your credentials and try again.');
//                 // Handle error state or display error message to the user
//             }
//         },
//     });


//     const togglePasswordVisibility = () => {
//         setPasswordVisible(!passwordVisible);
//     };

//     return (
//         <KeyboardAvoidingView style={styles.container} behavior="padding">
//             <View style={styles.header}>
//                 <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//                     <Ionicons name="arrow-back" size={24} color="gray" />
//                 </TouchableOpacity>
//                 {/* <Image source={require('../Images/hoponcarlogo.png')} style={styles.logoStyle} /> */}
//             </View>
//             <Text style={styles.title}>Forgot Password</Text>

//             <Text style={styles.linetitle}>Enter your registered number below</Text>
//             <View style={styles.formContainer}>

//                 <Text style={styles.label}>Phone Number</Text>
//                 <View style={styles.inputView}>
//                     <Octicons name="person" size={20} color="gray" style={styles.iconStyle} />
//                     <Text style={styles.callingCode}>{callingCode}</Text>
//                     <TextInput
//                         placeholder="Enter phone number"
//                         style={styles.input}
//                         placeholderTextColor="white"
//                         value={formik.values.phone}
//                         onChangeText={formik.handleChange('phone')}
//                         onBlur={formik.handleBlur('phone')}
//                         keyboardType="phone-pad"
//                     />
//                 </View>
//                 {formik.touched.phone && formik.errors.phone ? (
//                     <Text style={styles.errorText}>{formik.errors.phone}</Text>
//                 ) : null}

               
              
//             </View>
//             {/* <View style={keyboardVisible ? styles.buttonContainerKeyboard : styles.buttonContainer}>
//                 <TouchableOpacity onPress={formik.handleSubmit} style={[styles.inputView, { backgroundColor: colors.yellow }]}>
//                     <Text style={styles.buttonText}>Next</Text>
//                 </TouchableOpacity>
//             </View> */}
//              <View style={keyboardVisible ? styles.buttonContainerKeyboard : styles.buttonContainer}>
//                 <TouchableOpacity onPress={formik.handleSubmit} style={[styles.inputView, { backgroundColor: colors.yellow }]}>
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
//         padding: 10,
//     },
//     header: {
//         flexDirection: 'row',
//         height: 50,
//         position: 'relative'
//     },
//     logoStyle: {
//         height: 55,
//         width: '29%',
//         marginLeft: 'auto',
//         padding: 10
//     },
//     inputView: {
//         flexDirection: 'row',
//         height: 60,
//         width: '90%',
//         borderColor: colors.yellow,
//         borderWidth: 1,
//         justifyContent: 'center',
//         alignSelf: 'center',
//         borderRadius: 20,
//         alignItems: 'center', // Center align items within the view
//         paddingLeft: 10, // Add padding left for better spacing
//         marginTop: 10, // Add margin top for spacing between inputs
//     },
//     callingCode: {
//         color: 'white',
//         fontSize: 16,
//         marginRight: 10,
//     },
//     forgot: {
//         marginLeft: 'auto',
//         color: colors.White,
//         fontSize: 14,
//         paddingHorizontal: 18,
//         marginBottom: 5,
//         marginTop: 10,
//     },
//     iconStyle: {
//         paddingHorizontal: 10,
//     },
//     backButton: {
//         position: 'absolute',
//         top: 15,
//         left: 12,
//     },
//     title: {
//         fontSize: 28,
//         color: 'white',
//         marginTop: 60, // Ensuring the title is just below the back button
//         textAlign: 'center',
//         fontWeight: '500',
//     },
//     linetitle:{
//         fontSize: 15,
//         color: 'white',
//         marginTop: 60, // Ensuring the title is just below the back button
//         textAlign: 'left',
//         paddingHorizontal:18,
//         fontWeight: '500',
//     },
//     formContainer: {
//         flex: 1,
//         marginTop: 20,
//     },
//     input: {
//         color: colors.White,
//         fontSize: 16,
//         flex: 1, // Ensure input takes the remaining space
//     },
//     label: {
//         color: colors.White,
//         fontSize: 14,
//         marginLeft: '6%',
//         marginBottom: 5,
//         marginTop: 10,
//     },
//     eyeIcon: {
//         padding: 10,
//     },
//     buttonContainer: {
//         justifyContent: 'flex-end',
//         paddingHorizontal: 16,
//         paddingBottom: 20,
//         backgroundColor: '#1A1A1A', // Match the background color
//     },
//     buttonContainerKeyboard: {
//         position: 'absolute',
//         bottom: 0,
//         left: 0,
//         right: 0,
//         paddingHorizontal: 16,
//         paddingBottom: 20,
//         backgroundColor: '#1A1A1A', // Match the background color
//     },
//     buttonText: {
//         color: 'white',
//         fontSize: 16,
//         fontWeight: '600',
//         textAlign: 'center', // Center align the text inside TouchableOpacity
//     },
//     errorText: {
//         color: 'red',
//         fontSize: 12,
//         marginTop: 5,
//         paddingHorizontal: 20, // Add horizontal padding for better alignment
//     },
//     disclaimerText: {
//         fontSize: 14,
//         color: 'white',
//         textAlign: 'center',
//         marginBottom: 20, // Space below the disclaimer text
//     },
// });

// export default ForgotPass;

// ForgotPass.js
// import React, { useState, useEffect,useContext } from 'react';
// import { View, Text, TouchableOpacity, KeyboardAvoidingView, StyleSheet, TextInput, Alert, Image, Keyboard } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Octicons from 'react-native-vector-icons/Octicons';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useForgetPasswordMutation } from '../RTKApis/services/userApi'; // Ensure correct import path
// import { colors } from '../Constants/index';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { PhoneContext } from '../Screens/UserContext';
// const ForgotPass = ({ navigation }) => {
//     const [countryNameCode, setCountryNameCode] = useState('GB');
//     const [callingCode, setCallingCode] = useState('+44');
//     const [forgetPassword, { isLoading, error }] = useForgetPasswordMutation();
//     const [keyboardVisible, setKeyboardVisible] = useState(false);

//     useEffect(() => {
//         if (error) {
//             console.error('Forget password request failed:', error);
//             // Optionally, display error message to the user here
//         }

//         const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
//             setKeyboardVisible(true);
//         });
//         const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
//             setKeyboardVisible(false);
//         });

//         return () => {
//             keyboardDidShowListener.remove();
//             keyboardDidHideListener.remove();
//         };
//     }, [error]);

//     const onCountrySelect = (value) => {
//         setCountryNameCode(value.cca2);
//         setCallingCode('+' + value.callingCode);
//     };

//     const validationSchema = Yup.object().shape({
//         phone: Yup.string()
//             .required('Phone number is required')
//             .matches(/^\d{11}$/, 'Phone number must be exactly 11 digits'),
//     });

//     const formik = useFormik({
//         initialValues: { phone: '' },
//         validationSchema: validationSchema,
//         onSubmit: async (values) => {
//             console.log('Submit button pressed');
//             try {
//                 const phoneData = {
//                     phone: callingCode + values.phone,
//                 };
//                 console.log('phoneData:', phoneData);
//                 const response = await forgetPassword(phoneData).unwrap();
//                 console.log('Forget password request successful:', response.otp);
//                 const OTP=response.otp;
//                 console.log('otp222',OTP)
//                 setPhoneNumber(values.phone);
//                 // Navigate to the next screen after successful request
//                 navigation.navigate('NumberVerify',{OTP} );
//             } catch (err) {
//                 console.error('Forget password request failed:', err);
//                 Alert.alert('Request Failed', 'Please check your credentials and try again.');
//                 // Handle error state or display error message to the user
//             }
//         },
//     });

//     return (
//         <KeyboardAvoidingView style={styles.container} behavior="padding">
//             <View style={styles.header}>
//                 <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//                     <Ionicons name="arrow-back" size={24} color="gray" />
//                 </TouchableOpacity>
//                 {/* <Image source={require('../Images/hoponcarlogo.png')} style={styles.logoStyle} /> */}
//             </View>
//             <Text style={styles.title}>Forgot Password</Text>

//             <Text style={styles.linetitle}>Enter your registered number below</Text>
//             <View style={styles.formContainer}>
//                 <Text style={styles.label}>Phone Number</Text>
//                 <View style={styles.inputView}>
//                     <Octicons name="person" size={20} color="gray" style={styles.iconStyle} />
//                     <Text style={styles.callingCode}>{callingCode}</Text>
//                     <TextInput
//                         placeholder="Enter phone number"
//                         style={styles.input}
//                         placeholderTextColor="white"
//                         value={formik.values.phone}
//                         onChangeText={formik.handleChange('phone')}
//                         onBlur={formik.handleBlur('phone')}
//                         keyboardType="phone-pad"
//                     />
//                 </View>
//                 {formik.touched.phone && formik.errors.phone ? (
//                     <Text style={styles.errorText}>{formik.errors.phone}</Text>
//                 ) : null}
//             </View>
//             <View style={keyboardVisible ? styles.buttonContainerKeyboard : styles.buttonContainer}>
//                 <TouchableOpacity onPress={formik.handleSubmit} style={[styles.inputView, { backgroundColor: colors.yellow }]}>
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
//         padding: 10,
//     },
//     header: {
//         flexDirection: 'row',
//         height: 50,
//         position: 'relative',
//     },
//     logoStyle: {
//         height: 55,
//         width: '29%',
//         marginLeft: 'auto',
//         padding: 10,
//     },
//     inputView: {
//         flexDirection: 'row',
//         height: 60,
//         width: '90%',
//         borderColor: colors.yellow,
//         borderWidth: 1,
//         justifyContent: 'center',
//         alignSelf: 'center',
//         borderRadius: 20,
//         alignItems: 'center',
//         paddingLeft: 10,
//         marginTop: 10,
//     },
//     callingCode: {
//         color: 'white',
//         fontSize: 16,
//         marginRight: 10,
//     },
//     iconStyle: {
//         paddingHorizontal: 10,
//     },
//     backButton: {
//         position: 'absolute',
//         top: 15,
//         left: 12,
//     },
//     title: {
//         fontSize: 28,
//         color: 'white',
//         marginTop: 60,
//         textAlign: 'center',
//         fontWeight: '500',
//     },
//     linetitle: {
//         fontSize: 15,
//         color: 'white',
//         marginTop: 60,
//         textAlign: 'left',
//         paddingHorizontal: 18,
//         fontWeight: '500',
//     },
//     formContainer: {
//         flex: 1,
//         marginTop: 20,
//     },
//     input: {
//         color: colors.White,
//         fontSize: 16,
//         flex: 1,
//     },
//     label: {
//         color: colors.White,
//         fontSize: 14,
//         marginLeft: '6%',
//         marginBottom: 5,
//         marginTop: 10,
//     },
//     buttonContainer: {
//         justifyContent: 'flex-end',
//         paddingHorizontal: 16,
//         paddingBottom: 20,
//         backgroundColor: '#1A1A1A',
//     },
//     buttonContainerKeyboard: {
//         position: 'absolute',
//         bottom: 0,
//         left: 0,
//         right: 0,
//         paddingHorizontal: 16,
//         paddingBottom: 20,
//         backgroundColor: '#1A1A1A',
//     },
//     buttonText: {
//         color: 'white',
//         fontSize: 16,
//         fontWeight: '600',
//         textAlign: 'center',
//     },
//     errorText: {
//         color: 'red',
//         fontSize: 12,
//         marginTop: 5,
//         paddingHorizontal: 20,
//     },
//     disclaimerText: {
//         fontSize: 14,
//         color: 'white',
//         textAlign: 'center',
//         marginBottom: 20,
//     },
// });

// export default ForgotPass;
// ForgotPass.js////working///////
// /
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, StyleSheet, TextInput, Alert, Keyboard } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useForgetPasswordMutation } from '../RTKApis/services/userApi'; // Ensure correct import path
import { colors } from '../Constants/index';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { UserContext } from '../Screens/UserContext';

const ForgotPass = ({ navigation }) => {
    const { setPhoneNumber } = useContext(UserContext);
    const [countryNameCode, setCountryNameCode] = useState('GB');
    const [callingCode, setCallingCode] = useState('+44');
    const [forgetPassword, { isLoading, error }] = useForgetPasswordMutation();
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        if (error) {
            console.error('Forget password request failed:', error);
        }

        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, [error]);

    const onCountrySelect = (value) => {
        setCountryNameCode(value.cca2);
        setCallingCode('+' + value.callingCode);
    };

    const validationSchema = Yup.object().shape({
        phone: Yup.string()
            .required('Phone number is required')
            .matches(/^\d{11}$/, 'Phone number must be exactly 11 digits'),
    });

    const formik = useFormik({
        initialValues: { phone: '' },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log('Submit button pressed');
            try {
                const fullPhoneNumber = callingCode + values.phone;
                const phoneData = {
                    phone: fullPhoneNumber,
                };
                console.log('phoneData:', phoneData);
                const response = await forgetPassword(phoneData).unwrap();
                console.log('Forget password request successful:', response.otp);
                const OTP = response.otp;
                console.log('otp:', OTP);

                // Store phone number in context
                setPhoneNumber(fullPhoneNumber);

                // Navigate to the next screen after successful request
                navigation.navigate('ForgetPassOTP', { OTP });
            } catch (err) {
                console.error('Forget password request failed:', err);
                Alert.alert('Request Failed', 'Please check your credentials and try again.');
            }
        },
    });

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="gray" />
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>Forgot Password</Text>

            <Text style={styles.linetitle}>Enter your registered number below</Text>
            <View style={styles.formContainer}>
                <Text style={styles.label}>Phone Number</Text>
                <View style={styles.inputView}>
                    <Octicons name="person" size={20} color="gray" style={styles.iconStyle} />
                    <Text style={styles.callingCode}>{callingCode}</Text>
                    <TextInput
                        placeholder="Enter phone number"
                        style={styles.input}
                        placeholderTextColor="white"
                        value={formik.values.phone}
                        onChangeText={formik.handleChange('phone')}
                        onBlur={formik.handleBlur('phone')}
                        keyboardType="phone-pad"
                    />
                </View>
                {formik.touched.phone && formik.errors.phone ? (
                    <Text style={styles.errorText}>{formik.errors.phone}</Text>
                ) : null}
            </View>
            <View style={keyboardVisible ? styles.buttonContainerKeyboard : styles.buttonContainer}>
                <TouchableOpacity onPress={formik.handleSubmit} style={[styles.inputView, { backgroundColor: colors.yellow }]}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1A1A',
        padding: 10,
    },
    header: {
        flexDirection: 'row',
        height: 50,
        position: 'relative',
    },
    logoStyle: {
        height: 55,
        width: '29%',
        marginLeft: 'auto',
        padding: 10,
    },
    inputView: {
        flexDirection: 'row',
        height: 60,
        width: '90%',
        borderColor: colors.yellow,
        borderWidth: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 20,
        alignItems: 'center',
        paddingLeft: 10,
        marginTop: 10,
    },
    callingCode: {
        color: 'white',
        fontSize: 16,
        marginRight: 10,
    },
    iconStyle: {
        paddingHorizontal: 10,
    },
    backButton: {
        position: 'absolute',
        top: 15,
        left: 12,
    },
    title: {
        fontSize: 28,
        color: 'white',
        marginTop: 60,
        textAlign: 'center',
        fontWeight: '500',
    },
    linetitle: {
        fontSize: 15,
        color: 'white',
        marginTop: 60,
        textAlign: 'left',
        paddingHorizontal: 18,
        fontWeight: '500',
    },
    formContainer: {
        flex: 1,
        marginTop: 20,
    },
    input: {
        color: colors.White,
        fontSize: 16,
        flex: 1,
    },
    label: {
        color: colors.White,
        fontSize: 14,
        marginLeft: '6%',
        marginBottom: 5,
        marginTop: 10,
    },
    buttonContainer: {
        justifyContent: 'flex-end',
        paddingHorizontal: 16,
        paddingBottom: 20,
        backgroundColor: '#1A1A1A',
    },
    buttonContainerKeyboard: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 16,
        paddingBottom: 20,
        backgroundColor: '#1A1A1A',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
        paddingHorizontal: 20,
    },
    disclaimerText: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
        marginBottom: 20,
    },
});

export default ForgotPass;
