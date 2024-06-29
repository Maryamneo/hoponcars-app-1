import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity,ScrollView } from 'react-native';
import { colors, radius, fontSize, fontFamily } from '../Constants/index';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../components/CustomButton';
const PayByCash = () => {
  return (
    <ScrollView style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="gray" style={styles.arrowStyle} />
          </TouchableOpacity>
      <Text style={styles.title}>Pay By Credit Or Debit Card</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput style={styles.input} placeholder="Enter full name" placeholderTextColor={colors.lightGray} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} placeholder="Enter email" placeholderTextColor={colors.lightGray} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address</Text>
        <TextInput style={styles.input} placeholder="Enter address" placeholderTextColor={colors.lightGray} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Postcode</Text>
        <TextInput style={styles.input} placeholder="Enter postcode" placeholderTextColor={colors.lightGray} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Card Number</Text>
        <TextInput style={styles.input} placeholder="Enter card number" placeholderTextColor={colors.lightGray} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Expiration</Text>
        <TextInput style={styles.input} placeholder="MM/YY" placeholderTextColor={colors.lightGray} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>CVC</Text>
        <TextInput style={styles.input} placeholder="Enter CVC" placeholderTextColor={colors.lightGray} />
      </View>
      <View style={styles.btnView}>
                 <CustomButton
                 onPress={() => navigation.navigate('TermAndPolicy')}
                 title="Next"
                 />
    
                </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(5),
    backgroundColor: colors.lightblack,
    // margin:hp(5)
  },
  title: {
    fontSize: fontSize.medium,
    fontFamily: fontFamily.semiBold,
    color: colors.White,
    textAlign: 'center',
    marginVertical: hp(2),
  },
  inputContainer: {
    marginBottom: hp(2),
    
  },
  label: {
    fontSize: fontSize.regSmall,
    fontFamily: fontFamily.medium,
    color: colors.White,
    marginBottom: hp(1),
  },
  input: {
    backgroundColor: colors.White,
    borderRadius: radius.radius2,
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
    fontSize: fontSize.regSmall,
    fontFamily: fontFamily.regular,
    color: colors.black,
  },
  button: {
    backgroundColor: colors.MediumBlue,
    borderRadius: radius.radius2,
    paddingVertical: hp(2),
    alignItems: 'center',
    marginTop: hp(3),
  },
  buttonText: {
    fontSize: fontSize.medium,
    fontFamily: fontFamily.bold,
    color: colors.White,
  },
  btnView:{
    marginBottom:hp(5)
  }
});

export default PayByCash;