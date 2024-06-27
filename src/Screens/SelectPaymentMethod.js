import React from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, fontSize, fontFamily } from '../Constants/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const SelectPaymentMethod = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrowContainer}>
        <Ionicons name="arrow-back" size={24} color="gray" style={styles.arrowStyle} />
      </TouchableOpacity>
      <Text style={styles.title}>Pay By Credit Or Debit Card</Text>
      <TouchableOpacity style={styles.box} onPress={()=>navigation.navigate('SuccessfullPayment')}>
        <Image source={require('../Images/Cash.png')} style={styles.imgStyle} />
        <Text style={styles.text}>Pay by Cash</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightblack,
    padding: wp(4),
  },
  arrowContainer: {
    alignSelf: 'flex-start',
    marginBottom: hp(2),
  },
  title: {
    fontSize: fontSize.medium,
    fontFamily: fontFamily.semiBold,
    color: colors.White,
    textAlign: 'center',
    marginVertical: hp(6),
  },
  box: {
    flexDirection: 'row',
    backgroundColor: colors.black,
    height: hp(8),
    width: wp(80),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    borderRadius: 10,

  },
  imgStyle: {
    height: hp(5),
    width: wp(10),
  },
  text: {
    fontSize: fontSize.small,
    fontFamily: fontFamily.large,
    color: colors.White,
    marginRight:'auto',
    paddingHorizontal:wp(10)

  },
  arrowStyle: {
    marginRight: 'auto',
  },
});

export default SelectPaymentMethod;
