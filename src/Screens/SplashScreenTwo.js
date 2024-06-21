import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { colors } from '../Constants/index';
import Ionicons from 'react-native-vector-icons/Ionicons';
import  CustomButton from '../components/CustomButton'
const SplashScreenTwo = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imgView}>
        <Image source={require('../Images/logo.png')} style={styles.imgStyle} />
        <View style={styles.textView}>
          <Text style={styles.textStyle}>Move with safety</Text>
          <Ionicons name="shield-checkmark-outline" size={24} color="white" style={styles.arrowStyle} />
        </View>
      </View>
      <View style={styles.btnView}>
        <CustomButton
          onPress={() => navigation.navigate('LoginScreen')}
          title="Get Started"
          iconName="arrow-forward"
        />
      </View>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.yellow,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(5),
  },
  imgView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(5),
  },
  imgStyle: {
    height: hp(30),
    width: wp(80),
    resizeMode: 'contain',
  },
  textView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2),
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: hp(1),
    paddingHorizontal: wp(5),
    borderColor: colors.White,
    justifyContent: 'space-between',
    width: wp(60),
  },
  textStyle: {
    fontSize: wp(5),
    color: colors.White,
  },
  arrowStyle: {
  },
  btnView: {
    position: 'absolute',
    bottom: hp(5),
    width: '100%',
    alignItems: 'center',
  },
  
  arrow: {
    marginLeft: wp(2),
  }
});

export default SplashScreenTwo;
