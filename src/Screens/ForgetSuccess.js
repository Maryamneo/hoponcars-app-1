import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, StyleSheet, TextInput, Alert, Image, Keyboard } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLoginUserMutation } from '../RTKApis/services/userApi'; // Ensure correct import path
import { colors } from '../Constants/index';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ForgetSuccess = ({ navigation }) => {
    const [countryNameCode, setCountryNameCode] = useState('GB');
    const [callingCode, setCallingCode] = useState('+44');
    const [passwordVisible, setPasswordVisible] = useState(false); // State to manage password visibility
    const [registerUser, { isLoading, error }] = useLoginUserMutation();
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        if (error) {
            console.error('Registration failed:', error);
            // Optionally, display error message to the user here
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
            .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'), // Adjust regex to match 10 digits
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
    });

    const formik = useFormik({
        initialValues: { phone: '', password: '' },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log('Submit button pressed');
            try {
                const userData = {
                    phone: callingCode + values.phone, // Merge calling code and phone number
                    password: values.password
                };
                console.log('userData:', userData);
                const response = await registerUser(userData).unwrap();
                console.log('Registration successful:', response);

                // Navigate to the next screen after successful registration
                navigation.navigate('MapPinLocation', { /* Pass any necessary data to next screen */ });
            } catch (err) {
                console.error('Registration failed:', err);
                Alert.alert('Registration Failed', 'Please check your credentials and try again.');
                // Handle error state or display error message to the user
            }
        },
    });

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="gray" />
                </TouchableOpacity>
                <Image source={require('../Images/hoponcarlogo.png')} style={styles.logoStyle} />
            </View>
            <View style={styles.imageView}>
                <Image source={require('../Images/successtick.png')} style={styles.imageStyle} />
                </View>
                <View style={styles.textContainer}>
                <Text style={[styles.text,{color:colors.yellow}]}>Success</Text>
                    <Text style={styles.lighttext}>Please check your number for create a new password</Text>
                    <TouchableOpacity onPress={() => console.log('Resubmit')}>
                        <Text style={styles.linkText}>Can't get number? <Text style={{color:colors.purpleblue,fontWeight:'500'}}>Resubmit</Text></Text>
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
        position: 'relative'
    },
    logoStyle: {
        height: 55,
        width: '29%',
        marginLeft: 'auto',
        padding: 10
    },
    imageView: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '40%',
        // backgroundColor: 'red', // Placeholder background color for illustration
    },
    imageStyle: {
        height: 140,
        width: 150,
        marginRight: 20, // Adjust spacing between image and text
    },
    lighttext:{
        color:colors.gray,
        fontSize:15,
      textAlign:'center',
        marginBottom: 10,
        textAlign: 'center',
        width:290,
        fontWeight:'400'
    },
    textContainer: {
   padding:30,
        justifyContent: 'center',
        textAlign:'center',
        alignItems:'center',
        marginTop:20
    },
    text: {
        fontSize: 18,
        color: 'white',
        marginBottom: 10,
        textAlign: 'center',
        width:300,
        fontWeight:'600'
    },
    linkText: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        marginTop:30
        // textDecorationLine: 'underline',
    },
    backButton: {
        position: 'absolute',
        top: 15,
        left: 12,
    },
    title: {
        fontSize: 28,
        color: 'white',
        marginTop: 60, // Ensuring the title is just below the back button
        textAlign: 'center',
        fontWeight: '500',
    },
    formContainer: {
        flex: 1,
        marginTop: 20,
    },
    input: {
        color: colors.White,
        fontSize: 16,
        flex: 1, // Ensure input takes the remaining space
    },
    label: {
        color: colors.White,
        fontSize: 14,
        marginLeft: '6%',
        marginBottom: 5,
        marginTop: 10,
    },
    eyeIcon: {
        padding: 10,
    },
    buttonContainer: {
        justifyContent: 'flex-end',
        paddingHorizontal: 16,
        paddingBottom: 20,
        backgroundColor: '#1A1A1A', // Match the background color
    },
    buttonContainerKeyboard: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 16,
        paddingBottom: 20,
        backgroundColor: '#1A1A1A', // Match the background color
    },
});

export default ForgetSuccess;
