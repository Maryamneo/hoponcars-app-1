import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  Alert,
  Keyboard,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useResendOtpMutation} from '../RTKApis/services/userApi'; // Ensure correct import path
import {colors} from '../Constants/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {UserContext} from '../Screens/UserContext';

const ResetPass = ({navigation, route}) => {
  const {OTP} = route.params; // Verify OTP value here
  console.log(OTP);
  const {setPhoneNumber} = useContext(UserContext);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [forgetPassword, {isLoading, error}] = useResendOtpMutation();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  const formik = useFormik({
    initialValues: {password: '', confirmPassword: ''},
    validationSchema: validationSchema,
    onSubmit: async values => {
      try {
        const requestData = {
          otp: OTP,
          password: values.password,
          confirmPassword: values.confirmPassword,
        };

        console.log('Request Data:', requestData);
        const response = await forgetPassword(requestData).unwrap();
        console.log('Forget password request successful:', response);

        // Navigate to the next screen after successful request
        navigation.navigate('LoginUser');
      } catch (err) {
        console.error('Forget password request failed:', err);
        Alert.alert(
          'Request Failed',
          'Please check your credentials and try again.',
        );
      }
    },
  });

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="gray" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Reset Password</Text>

      <Text style={styles.linetitle}>Enter your registered password below</Text>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputView}>
          <Octicons
            name="lock"
            size={20}
            color="gray"
            style={styles.iconStyle}
          />
          <TextInput
            placeholder="Enter password"
            style={styles.input}
            placeholderTextColor="white"
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            secureTextEntry
          />
        </View>
        {formik.touched.password && formik.errors.password ? (
          <Text style={styles.errorText}>{formik.errors.password}</Text>
        ) : null}

        <Text style={[styles.label, {marginTop: hp(2)}]}>Confirm Password</Text>
        <View style={styles.inputView}>
          <Octicons
            name="lock"
            size={20}
            color="gray"
            style={styles.iconStyle}
          />
          <TextInput
            placeholder="Confirm password"
            style={styles.input}
            placeholderTextColor="white"
            value={formik.values.confirmPassword}
            onChangeText={formik.handleChange('confirmPassword')}
            onBlur={formik.handleBlur('confirmPassword')}
            secureTextEntry
          />
        </View>
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <Text style={styles.errorText}>{formik.errors.confirmPassword}</Text>
        ) : null}
      </View>
      <View>
        <TouchableOpacity
          onPress={formik.handleSubmit}
          style={[styles.inputView, {backgroundColor: colors.yellow}]}>
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
  inputView: {
    flexDirection: 'row',
    height: 60,
    width: '90%',
    borderColor: colors.gray,
    borderWidth: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    alignItems: 'center',
    paddingLeft: 10,
    marginTop: 8,
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
    position: 'relative',
    paddingHorizontal: 16,
    paddingBottom: 20,
    backgroundColor: '#1A1A1A',
    marginBottom: hp(30),
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
    marginBottom: 30,
  },
});

export default ResetPass;
