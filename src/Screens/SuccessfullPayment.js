import React, {Component} from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import {colors, fontSize} from '../Constants';
import CustomButton from '../components/CustomButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const SuccessfullPayment = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image source={require('../Images/thnx.png')} />
      </View>
      <View style={styles.txtContainer}>
        <Text style={styles.txt1}>Our Team Contact Back You Soon</Text>
        <Text style={styles.txt2}>Thank you for using Hoponcars</Text>
      </View>
      <View style={styles.btnView}>
        <CustomButton
          onPress={() => navigation.navigate('LoginScreen')}
          title="Get Started"
         
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightblack,
  },
  imgContainer: {
    flex: 2,
    alignItems: 'center',
    flexDirection: 'column-reverse',
  },
  txtContainer: {
    flex: 1,
    alignItems: 'center',
  },
  txt1: {
    color: colors.White,
    fontWeight: 'bold',
    fontSize: fontSize.large,
    marginVertical: 20,
    fontSize:20
  },
  txt2: {
    color: colors.White,
    fontWeight: '500',
    fontSize: fontSize.statusSize,
    fontSize:18
  },
  btnView: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom:hp(6)
},

});

export default SuccessfullPayment;
