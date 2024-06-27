import React from 'react';
import { View, Text, TouchableOpacity,KeyboardAvoidingView,TextInput, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
  import CustomButton from '../components/CustomButton';
const NameScreen = ({ navigation }) => {
  return (

    <KeyboardAvoidingView style={{ flex: 1 }}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="gray" style={styles.arrowStyle} />
          </TouchableOpacity>
          <Text style={styles.title}>What's your name?</Text>
           <View style={styles.inputContainer}> 
            <TextInput placeholder="First" style={styles.input} placeholderTextColor="white" />
            <TextInput placeholder="Last" style={styles.input} placeholderTextColor="white" />
          </View>
        </View>
        <View style={styles.btnView}>
             <CustomButton
             onPress={() => navigation.navigate('TermAndPolicy')}
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
      fontSize: 24,
      color: 'white',
      marginBottom: 40,
      marginTop:20,
      textAlign: 'left',
      fontWeight:'500'
    
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
      marginBottom:hp(3)
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
  });

export default NameScreen;
