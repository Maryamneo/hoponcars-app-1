// import React from 'react';
// import { View, Text, TouchableOpacity,KeyboardAvoidingView,TextInput, StyleSheet } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import {
//     widthPercentageToDP as wp,
//     heightPercentageToDP as hp,
//   } from "react-native-responsive-screen";
//   import CustomButton from '../components/CustomButton';
// const NameScreen = ({ navigation }) => {
//   return (

//     <KeyboardAvoidingView style={{ flex: 1 }}>
//       <KeyboardAwareScrollView contentContainerStyle={styles.container}>
//         <View>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Ionicons name="arrow-back" size={24} color="gray" style={styles.arrowStyle} />
//           </TouchableOpacity>
//           <Text style={styles.title}>What's your name?</Text>
//            <View style={styles.inputContainer}> 
//             <TextInput placeholder="First" style={styles.input} placeholderTextColor="white" />
//             <TextInput placeholder="Last" style={styles.input} placeholderTextColor="white" />
//           </View>
//         </View>
//         <View style={styles.btnView}>
//              <CustomButton
//              onPress={() => navigation.navigate('TermAndPolicy')}
//              title="Next"
//              />
//       </View>
//       </KeyboardAwareScrollView>
//     </KeyboardAvoidingView>
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
//       marginBottom: 40,
//       marginTop:20,
//       textAlign: 'left',
//       fontWeight:'500'
    
//     },
//     inputContainer: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       width: 300,
//       alignSelf: 'center',
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
//       // marginTop:hp(40),
//       justifyContent: 'flex-end',
//       alignItems: 'center',
//       marginBottom:hp(3)
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
//   });

// export default NameScreen;
import React from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, TextInput, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomButton from '../components/CustomButton';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
});

const firstlastname = ({ navigation }) => {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <Formik
          initialValues={{ firstName: '', lastName: '' }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
            navigation.navigate('LoginScreen');
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <View>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name="arrow-back" size={24} color="gray" style={styles.arrowStyle} />
                </TouchableOpacity>
                <Text style={styles.title}>What's your name?</Text>
                <View style={styles.inputContainer}>
                  <View>
                    <TextInput
                      placeholder="First"
                      style={styles.input}
                      placeholderTextColor="white"
                      onChangeText={handleChange('firstName')}
                      onBlur={handleBlur('firstName')}
                      value={values.firstName}
                    />
                    {errors.firstName && touched.firstName && (
                      <Text style={styles.errorText}>{errors.firstName}</Text>
                    )}
                  </View>
                  <View>
                    <TextInput
                      placeholder="Last"
                      style={styles.input}
                      placeholderTextColor="white"
                      onChangeText={handleChange('lastName')}
                      onBlur={handleBlur('lastName')}
                      value={values.lastName}
                    />
                    {errors.lastName && touched.lastName && (
                      <Text style={styles.errorText}>{errors.lastName}</Text>
                    )}
                  </View>
                </View>
              </View>
              <View style={styles.btnView}>
              <CustomButton
              onPress={handleSubmit}
            //  onPress={() => navigation.navigate('LoginScreen')}
             title="Next"
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
    marginBottom: 40,
    marginTop: 20,
    textAlign: 'left',
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
    alignSelf: 'center',
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
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'left',
  },
});

export default firstlastname;
