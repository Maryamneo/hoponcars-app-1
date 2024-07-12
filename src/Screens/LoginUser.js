import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, StyleSheet, TextInput, Alert, Image, Keyboard } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLoginUserMutation } from '../RTKApis/services/userApi'; // Ensure correct import path
import { colors } from '../Constants/index';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const LoginUser = ({ navigation }) => {
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
            .matches(/^\d{11}$/, 'Phone number must be exactly 11 digits'),
        password: Yup.string()
            .required('Password is required')
            // .matches(/^\d{8}$/, 'Password must be exactly 8 digits'),
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
                console.log('Registration successful================:', response);

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
                {/* <Image source={require('../Images/hoponcarlogo.png')} style={styles.logoStyle} /> */}
            </View>
            <Text style={styles.title}>Login</Text>
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

                <Text style={[styles.label, { marginTop: 25 }]}>Password</Text>
                <View style={styles.inputView}>
                    <Ionicons name="lock-closed" size={20} color="gray" style={styles.iconStyle} />
                    <TextInput
                        placeholder="Password"
                        style={styles.input}
                        placeholderTextColor="white"
                        secureTextEntry={!passwordVisible} // Toggle secureTextEntry based on passwordVisible state
                        value={formik.values.password}
                        onChangeText={formik.handleChange('password')}
                        onBlur={formik.handleBlur('password')}
                      
                    />
                    <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                        <Ionicons name={passwordVisible ? 'eye-off' : 'eye'} size={24} color="grey" />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    {formik.touched.password && formik.errors.password ? (
                        <Text style={styles.errorText}>{formik.errors.password}</Text>
                    ) : null}
                    <TouchableOpacity style={styles.forgotView} onPress={()=>navigation.navigate('ForgotPass')}>
                    <Text style={styles.forgotStyle}>Forgot Password?</Text>
                    </TouchableOpacity>
                  
                </View>
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
        position: 'relative'
    },
    logoStyle: {
        height: 55,
        width: '29%',
        marginLeft: 'auto',
        padding: 10
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
        alignItems: 'center', // Center align items within the view
        paddingLeft: 10, // Add padding left for better spacing
        marginTop: 10, // Add margin top for spacing between inputs
    },
    callingCode: {
        color: 'white',
        fontSize: 16,
        marginRight: 10,
    },
    forgotView:{
        marginLeft: 'auto',
    },
    forgotStyle: {
        // marginLeft: 'auto',
        color: colors.purpleblue,
        fontSize: 14,
        paddingHorizontal: 18,
        marginBottom: 5,
        marginTop: 10,
        fontWeight:'500'
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
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center', // Center align the text inside TouchableOpacity
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
        paddingHorizontal: 20, // Add horizontal padding for better alignment
    },
    disclaimerText: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
        marginBottom: 20, // Space below the disclaimer text
    },
});

export default LoginUser;
