
import React ,{useContext} from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, TextInput, StyleSheet, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomButton from '../components/CustomButton';
import { colors } from '../Constants/index';
import Octicons from 'react-native-vector-icons/Octicons';
import { UserContext } from '../Screens/UserContext';
const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(20, 'No longer than 20 characters')
    .required('First name is required'),
  lastName: Yup.string()
    .max(20, 'No longer than 20 characters')
    .required('Last name is required'),
});

const FirstLastName = ({ navigation }) => {

  const { setUsername } = useContext(UserContext);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <Formik
          initialValues={{ firstName: '', lastName: '' }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const username = `${values.firstName} ${values.lastName}`;
            setUsername(username)
            console.log('username', username)
            navigation.navigate('EmailPass');
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <View>
                <View style={styles.header}>
                  <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="gray" />
                  </TouchableOpacity>
                  {/* <Image source={require('../Images/hoponcarlogo.png')} style={styles.logoStyle} /> */}
                </View>
                <Text style={styles.title}>What's your information?</Text>
                <Text style={styles.label}>First Name:</Text>
                <View style={styles.inputView}>
                  <TextInput
                    placeholder="Enter first name"
                    style={styles.input}
                    placeholderTextColor="white"
                    value={values.firstName}
                    onChangeText={handleChange('firstName')}
                    onBlur={handleBlur('firstName')}
                    maxLength={20}
                  />
                </View>
                {touched.firstName && errors.firstName && (
                  <Text style={styles.errorText}>{errors.firstName}</Text>
                )}
                <Text style={[styles.label,{marginTop:20}]}>Last Name:</Text>
                <View style={styles.inputView}>
                  <TextInput
                    placeholder="Enter last name"
                    style={styles.input}
                    placeholderTextColor="white"
                    value={values.lastName}
                    onChangeText={handleChange('lastName')}
                    onBlur={handleBlur('lastName')}
                    maxLength={20}
                  />
                </View>
                {touched.lastName && errors.lastName && (
                  <Text style={styles.errorText}>{errors.lastName}</Text>
                )}
              </View>
              <View style={styles.btnView}>
                <TouchableOpacity onPress={handleSubmit} style={[styles.inputView, { backgroundColor: colors.yellow }]}>
                  <Text style={styles.buttonText}>Next</Text>
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
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 40,
    marginTop: 30,
    textAlign: 'left',
    fontWeight: '500',
  },
  inputView: {
    flexDirection: 'row',
    height: 60,
    width: '100%',
    borderColor: colors.yellow,
    borderWidth: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    alignItems: 'center',
    paddingLeft: 10,
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '400',
    color: '#fff',
    marginBottom: 4,
  },
  input: {
    color: 'white',
    padding: 8,
    fontSize: 16,
    width: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 15,
    left: 12,
  },
  btnView: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: hp(3),
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    textAlign: 'left',
    marginTop: 4,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FirstLastName;
