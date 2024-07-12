// NumberVerify.js
import React, { useRef, useContext } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, TextInput, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useResendOtpMutation, useForgetPasswordMutation } from '../RTKApis/services/userApi';
import { UserContext } from '../Screens/UserContext';
import { colors } from '../Constants/index';

const validationSchema = Yup.object().shape({
    otp1: Yup.string().required('OTP is Required'),
    otp2: Yup.string().required('OTP is Required'),
    otp3: Yup.string().required('OTP is Required'),
    otp4: Yup.string().required('OTP is Required'),
});

const ForgetPassOTP = ({ navigation, route }) => {
    const { phoneNumber } = useContext(UserContext);
    const { OTP } = route.params;
    const otpTextInputRefs = useRef([]);
    const [resendOtp, { isLoading: verifyLoading, error: verifyError }] = useResendOtpMutation();
    const [forgetPassword, { isLoading: resendLoading, error: resendError }] = useForgetPasswordMutation();

    const handleOTPChange = (index, value, handleChange) => {
        handleChange(`otp${index + 1}`)(value);
        if (value && index < 3) {
            otpTextInputRefs.current[index + 1].focus();
        }
    };

    const handleBackspace = (index, value, setFieldValue) => {
        if (value === '' && index > 0) {
            setFieldValue(`otp${index + 1}`, '');
            otpTextInputRefs.current[index - 1].focus();
        }
    };

    const handleResendOtp = async () => {
        try {
            const response = await forgetPassword({ phone: phoneNumber }).unwrap();
            console.log('OTP resend successful:', response);
        } catch (err) {
            console.error('OTP resend failed:', err);
        }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#1A1A1A' }}>
            <KeyboardAwareScrollView contentContainerStyle={styles.container}>
                <Formik
                    initialValues={{ otp1: '', otp2: '', otp3: '', otp4: '' }}
                    validationSchema={validationSchema}
                    onSubmit={async (values) => {
                        const enteredOtp = values.otp1 + values.otp2 + values.otp3 + values.otp4;
                        try {
                            const response = await resendOtp({ otp: enteredOtp, phone: phoneNumber }).unwrap();
                            console.log('OTP verification successful:', response);
                            navigation.navigate('ResetPass',{OTP});
                        } catch (err) {
                            console.error('OTP verification failed:', err);
                        }
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
                        <>
                            <View>
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <Ionicons name="arrow-back" size={24} color="gray" style={styles.arrowStyle} />
                                </TouchableOpacity>
                                <Text style={styles.title}>Enter the 4-digit code sent to {'\n'}you at </Text>
                                <View style={styles.inputContainer}>
                                    {['otp1', 'otp2', 'otp3', 'otp4'].map((field, index) => (
                                        <TextInput
                                            key={index}
                                            ref={ref => (otpTextInputRefs.current[index] = ref)}
                                            style={styles.textInputStyle}
                                            value={values[field]}
                                            onChangeText={text => handleOTPChange(index, text, handleChange)}
                                            onKeyPress={({ nativeEvent }) => {
                                                if (nativeEvent.key === 'Backspace') {
                                                    handleBackspace(index, values[field], setFieldValue);
                                                }
                                            }}
                                            onBlur={handleBlur(field)}
                                            keyboardType="numeric"
                                            maxLength={1}
                                        />
                                    ))}
                                </View>
                                {['otp1', 'otp2', 'otp3', 'otp4'].map((field, index) =>
                                    errors[field] && touched[field] ? (
                                        <Text key={index} style={styles.errorText}>{errors[field]}</Text>
                                    ) : null
                                )}
                                <Text style={styles.receiveStyle}>
                                    Don't receive a code?{' '}
                                    <Text style={styles.resendStyle} onPress={handleResendOtp}>
                                        {resendLoading ? 'Resending...' : 'Resend Code'}
                                    </Text>
                                </Text>
                                {resendError && <Text style={styles.errorText}>Failed to resend OTP. Please try again.</Text>}
                            </View>
                            <View style={styles.btnView}>
                                <TouchableOpacity  
                                    onPress={handleSubmit}  
                                    style={styles.btnStyle}
                                    disabled={!values.otp1 || !values.otp2 || !values.otp3 || !values.otp4 || verifyLoading}>
                                    <Text style={styles.textStyle}>
                                        Next
                                    </Text>
                                </TouchableOpacity>
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
        paddingVertical: hp(3),
        width: wp(90),
    },
    arrowStyle: {
        marginRight: 'auto',
    },
    btnView: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: hp(3),
        paddingVertical: wp(5),
        borderRadius: 10,
        backgroundColor: colors.yellow
    },
    textInputStyle: {
        width: 60,
        height: 60,
        borderBottomWidth: 2,
        borderBottomColor: colors.yellow,
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
        color: colors.White,
        fontSize: 15,
        paddingHorizontal: wp(2)
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        paddingHorizontal: wp(4),
        alignSelf: 'flex-start'
    },
    btnStyle: {
        backgroundColor: colors.yellow,
    },
    textStyle: {
        color: 'black',
        fontSize: 16,
        fontWeight: '600'
    }
});

export default ForgetPassOTP;
