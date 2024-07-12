// import React from 'react';
// import { View, Text, TouchableOpacity, KeyboardAvoidingView, TextInput, StyleSheet } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { Formik } from 'formik';
// import * as Yup from 'yup';
// import CustomButton from '../components/CustomButton';

// const validationSchema = Yup.object().shape({
//   email: Yup.string()
//     .email('Invalid email address')
//     .required('Email is required'),
//   password: Yup.string()
//     .min(8, 'Password must be at least 8 characters')
//     .max(8, 'Password must be at least 8 characters')
//     .required('Password is required'),
// });

// const EmailPass = ({ navigation, route }) => {
//   const { username } = route.params;

//   const handleSubmit = (values) => {
//     const { email, password } = values;
//     console.log('Email:', email);
//     console.log('Password:', password);
//     console.log('Username:', username);
    
//     // Navigate to LoginScreen and pass username, email, and password as params
//     navigation.navigate('LoginScreen', { username, email, password });
//   };

//   return (
//     <KeyboardAvoidingView style={{ flex: 1 }}>
//       <KeyboardAwareScrollView contentContainerStyle={styles.container}>
//         <Formik
//           initialValues={{ email: '', password: '' }}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
//             <>
//               <View>
//                 <TouchableOpacity onPress={() => navigation.goBack()}>
//                   <Ionicons name="arrow-back" size={24} color="gray" style={styles.arrowStyle} />
//                 </TouchableOpacity>
//                 <Text style={styles.title}>Enter your credentials</Text>
//                 <View style={styles.inputContainer}>
//                   <View style={styles.inputField}>
//                     <Text style={styles.label}>Email:</Text>
//                     <TextInput
//                       placeholder="Email"
//                       style={styles.input}
//                       placeholderTextColor='#DADADA'
//                       onChangeText={handleChange('email')}
//                       onBlur={handleBlur('email')}
//                       value={values.email}
//                       keyboardType="email-address"
//                       autoCapitalize="none"
//                     />
//                     {errors.email && touched.email && (
//                       <Text style={styles.errorText}>{errors.email}</Text>
//                     )}
//                   </View>
//                   <View style={styles.inputField}>
//                     <Text style={styles.label}>Password:</Text>
//                     <TextInput
//                       placeholder="Password"
//                       style={styles.input}
//                       placeholderTextColor='#DADADA'
//                       onChangeText={handleChange('password')}
//                       onBlur={handleBlur('password')}
//                       value={values.password}
//                       secureTextEntry
//                       autoCapitalize="none"
//                       maxLength={8}
//                     />
//                     {errors.password && touched.password && (
//                       <Text style={styles.errorText}>{errors.password}</Text>
//                     )}
//                   </View>
//                 </View>
//               </View>
//               <View style={styles.btnView}>
//                 <CustomButton
//                   onPress={handleSubmit}
//                   title="Next"
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
//     marginBottom: 40,
//     marginTop: 20,
//     textAlign: 'left',
//     fontWeight: '500',
//   },
//   inputContainer: {
//     paddingVertical: 20,
//     width: '100%',
//     alignSelf: 'center',
//   },
//   inputField: {
//     marginBottom: 20,
//     width: '100%',
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginBottom: 8,
//   },
//   input: {
//     color: 'white',
//     borderBottomWidth: 1,
//     borderBottomColor: '#DADADA',
//     padding: 8,
//     fontSize: 16,
//     width: '100%',
//   },
//   arrowStyle: {
//     marginRight: 'auto',
//   },
//   btnView: {
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 12,
//     textAlign: 'left',
//     marginTop: 4,
//   },
// });

// export default EmailPass;
// import React,{useState,useContext} from 'react';
// import { View, Text, TouchableOpacity, KeyboardAvoidingView, TextInput, StyleSheet, Image } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { Formik } from 'formik';
// import * as Yup from 'yup';
// import CustomButton from '../components/CustomButton';
// import { colors } from '../Constants/index';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { UserContext } from '../Screens/UserContext';
// const validationSchema = Yup.object().shape({
//   email: Yup.string()
//     .email('Invalid email address')
//     .required('Email is required'),
//   password: Yup.string()
//     .min(6, 'Password must be at least 8 characters')
//     .max(8, 'Password must be at most 8 characters')
//     .required('Password is required'),
// });

// const EmailPass = ({ navigation, route }) => {
//     // const { username } = route.params;
//     const [passwordVisible, setPasswordVisible] = useState(false); 
//     const { setEmail, setPassword } = useContext(UserContext);

//   const handleSubmit = (values) => {
//     const { email, password } = values;
//     setEmail(email);
//     setPassword(password);
//     console.log('Email:;;;;', email);
//     console.log('Password:......', password);
//     // console.log('usernam------',username)
//     // Navigate to LoginScreen and pass username, email, and password as params
//     navigation.navigate('LoginScreen');
//   };
//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
// };
//   return (
//     <KeyboardAvoidingView style={{ flex: 1 }}>
//       <KeyboardAwareScrollView contentContainerStyle={styles.container}>
//         <Formik
//           initialValues={{ email: '', password: '' }}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
//             <>
//               <View>
//                 <View style={styles.header}>
//                   <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//                     <Ionicons name="arrow-back" size={24} color="gray" />
//                   </TouchableOpacity>
//                   {/* <Image source={require('../Images/hoponcarlogo.png')} style={styles.logoStyle} /> */}
//                 </View>
//                 <Text style={styles.title}>About Info</Text>
//                 <Text style={styles.label}>Email:</Text>
//                 <View style={styles.inputView}>
//                   <TextInput
//                     placeholder="Enter email"
//                     style={styles.input}
//                     placeholderTextColor="white"
//                     value={values.email}
//                     onChangeText={handleChange('email')}
//                     onBlur={handleBlur('email')}
//                     keyboardType="email-address"
//                   />
                  
//                 </View>
//                 {touched.email && errors.email && (
//                   <Text style={styles.errorText}>{errors.email}</Text>
//                 )}
//                 <Text style={[styles.label, { marginTop: 20 }]}>Password:</Text>
//                 <View style={styles.inputView}>
//                   <TextInput
//                     placeholder="Enter password"
//                     style={styles.input}
//                     placeholderTextColor="white"
//                     value={values.password}
//                     onChangeText={handleChange('password')}
//                     onBlur={handleBlur('password')}
//                     secureTextEntry={!passwordVisible}
              
//                   />
//                    <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
//                         <Ionicons name={passwordVisible ?  'eye': 'eye-off'} size={24} color="grey" />
//                     </TouchableOpacity>
//                 </View>
//                 {touched.password && errors.password && (
//                   <Text style={styles.errorText}>{errors.password}</Text>
//                 )}
//               </View>
//               <View style={styles.btnView}>
//                 <TouchableOpacity onPress={handleSubmit} style={[styles.inputView, { backgroundColor: colors.yellow }]}>
//                   <Text style={styles.buttonText}>Next</Text>
//                 </TouchableOpacity>
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
//   header: {
//     flexDirection: 'row',
//     height: 50,
//     position: 'relative'
//   },
//   logoStyle: {
//     height: 55,
//     width: '29%',
//     marginLeft: 'auto',
//     padding: 10
//   },
//   title: {
//     fontSize: 24,
//     color: 'white',
//     marginBottom: 40,
//     marginTop: 30,
//     textAlign: 'left',
//     fontWeight: '500',
//   },
//   inputView: {
//     flexDirection: 'row',
//     height: 60,
//     width: '100%',
//     borderColor: colors.yellow,
//     borderWidth: 1,
//     justifyContent: 'center',
//     alignSelf: 'center',
//     borderRadius: 20,
//     alignItems: 'center',
//     paddingLeft: 10,
//     marginTop: 10,
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: '400',
//     color: '#fff',
//     marginBottom: 4,
//   },
//   input: {
//     color: 'white',
//     padding: 8,
//     fontSize: 16,
//     width: '100%',
//   },
//   backButton: {
//     position: 'absolute',
//     top: 15,
//     left: 12,
//   },
//   btnView: {
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     marginBottom: hp(3),
//   },
//   eyeIcon: {
//     paddingRight:'auto' ,
//     paddingHorizontal:2
// },
//   errorText: {
//     color: 'red',
//     fontSize: 12,
//     textAlign: 'left',
//     marginTop: 4,
//   },
//   buttonText: {
//     color: 'black',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default EmailPass;

import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, TextInput, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { colors } from '../Constants/index';
import { UserContext } from './UserContext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 8 characters')
    .max(8, 'Password must be at most 8 characters')
    .required('Password is required'),
});

const EmailPass = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { setEmail, setPassword } = useContext(UserContext);

  const handleSubmit = (values) => {
    const { email, password } = values;
    setEmail(email);
    setPassword(password);
    console.log('Email:', email);
    console.log('Password:', password);
    navigation.navigate('LoginScreen');
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <View>
                <View style={styles.header}>
                  <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="gray" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.title}>About Info</Text>
                <Text style={styles.label}>Email:</Text>
                <View style={styles.inputView}>
                  <TextInput
                    placeholder="Enter email"
                    style={styles.input}
                    placeholderTextColor="white"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    keyboardType="email-address"
                  />
                </View>
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
                <Text style={[styles.label, { marginTop: 20 }]}>Password:</Text>
                <View style={styles.inputView}>
                  <TextInput
                    placeholder="Enter password"
                    style={styles.input}
                    placeholderTextColor="white"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    secureTextEntry={!passwordVisible}
                  />
                  <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                    <Ionicons name={passwordVisible ? 'eye' : 'eye-off'} size={24} color="grey" />
                  </TouchableOpacity>
                </View>
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>
              {/* <View style={styles.btnView}>
                <TouchableOpacity onPress={handleSubmit} style={[styles.inputView, { backgroundColor: colors.yellow }]}>
                  <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
              </View> */}
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
    position: 'relative',
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
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 15,
    left: 12,
  },
  // btnView: {
  //   justifyContent: 'flex-end',
  //   alignItems: 'center',
  //   marginBottom: hp(3),
  // },
  eyeIcon: {
    padding: 10,
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
    textAlign: 'right',
  },
});

export default EmailPass;













// EmailPass.js///////working fine with new screen design /////////
// import React, { useState, useContext } from 'react';
// import { View, Text, TouchableOpacity, KeyboardAvoidingView, TextInput, StyleSheet } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { Formik } from 'formik';
// import * as Yup from 'yup';
// import { colors } from '../Constants/index';
// import { UserContext } from './UserContext';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// const validationSchema = Yup.object().shape({
//   email: Yup.string()
//     .email('Invalid email address')
//     .required('Email is required'),
//   password: Yup.string()
//     .min(6, 'Password must be at least 8 characters')
//     .max(8, 'Password must be at most 8 characters')
//     .required('Password is required'),
// });

// const EmailPass = ({ navigation }) => {
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const { setEmail, setPassword } = useContext(UserContext);

//   const handleSubmit = (values) => {
//     const { email, password } = values;
//     setEmail(email);
//     setPassword(password);
//     console.log('Email:', email);
//     console.log('Password:', password);
//     navigation.navigate('LoginScreen');
//   };

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   return (
//     <KeyboardAvoidingView style={{ flex: 1 }}>
//       <KeyboardAwareScrollView contentContainerStyle={styles.container}>
//         <Formik
//           initialValues={{ email: '', password: '' }}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
//             <>
//               <View>
//                 <View style={styles.header}>
//                   <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//                     <Ionicons name="arrow-back" size={24} color="gray" />
//                   </TouchableOpacity>
//                 </View>
//                 <Text style={styles.title}>About Info</Text>
//                 <Text style={styles.label}>Email:</Text>
//                 <View style={styles.inputView}>
//                   <TextInput
//                     placeholder="Enter email"
//                     style={styles.input}
//                     placeholderTextColor="white"
//                     value={values.email}
//                     onChangeText={handleChange('email')}
//                     onBlur={handleBlur('email')}
//                     keyboardType="email-address"
//                   />
//                 </View>
//                 {touched.email && errors.email && (
//                   <Text style={styles.errorText}>{errors.email}</Text>
//                 )}
//                 <Text style={[styles.label, { marginTop: 20 }]}>Password:</Text>
//                 <View style={styles.inputView}>
//                   <TextInput
//                     placeholder="Enter password"
//                     style={styles.input}
//                     placeholderTextColor="white"
//                     value={values.password}
//                     onChangeText={handleChange('password')}
//                     onBlur={handleBlur('password')}
//                     secureTextEntry={!passwordVisible}
//                   />
//                   <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
//                     <Ionicons name={passwordVisible ? 'eye' : 'eye-off'} size={24} color="grey" />
//                   </TouchableOpacity>
//                 </View>
//                 {touched.password && errors.password && (
//                   <Text style={styles.errorText}>{errors.password}</Text>
//                 )}
//               </View>
//               <View style={styles.btnView}>
//                 <TouchableOpacity onPress={handleSubmit} style={[styles.inputView, { backgroundColor: colors.yellow }]}>
//                   <Text style={styles.buttonText}>Next</Text>
//                 </TouchableOpacity>
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
//   header: {
//     flexDirection: 'row',
//     height: 50,
//     position: 'relative',
//   },
//   title: {
//     fontSize: 24,
//     color: 'white',
//     marginBottom: 40,
//     marginTop: 30,
//     textAlign: 'left',
//     fontWeight: '500',
//   },
//   inputView: {
//     flexDirection: 'row',
//     height: 60,
//     width: '100%',
//     borderColor: colors.yellow,
//     borderWidth: 1,
//     justifyContent: 'center',
//     alignSelf: 'center',
//     borderRadius: 20,
//     alignItems: 'center',
//     paddingLeft: 10,
//     marginTop: 10,
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: '400',
//     color: '#fff',
//     marginBottom: 4,
//   },
//   input: {
//     color: 'white',
//     padding: 8,
//     fontSize: 16,
//     width: '100%',
//   },
//   backButton: {
//     position: 'absolute',
//     top: 15,
//     left: 12,
//   },
//   btnView: {
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     marginBottom: hp(3),
//   },
//   eyeIcon: {
//     paddingRight: 'auto',
//     paddingLeft: 10,

//   },
//   errorText: {
//     color: 'red',
//     fontSize: 12,
//     textAlign: 'left',
//     marginTop: 4,
//   },
//   buttonText: {
//     color: 'black',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default EmailPass;
