import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { colors } from '../Constants/index';

export const CountryPickerInput = ({ onSelect, countryNameCode, callingCode, value, onChangeText }) => {
    const [showCountryPicker, setShowCountryPicker] = useState(false);
    
    return (
        <View style={styles.countryPickerInputContainer}>
            <TouchableOpacity
                style={styles.countryCodeContainer}
                onPress={() => setShowCountryPicker(true)}
            >
                <CountryPicker
                    onSelect={onSelect}
                    cca2={countryNameCode}
                    translation="eng"
                    visible={showCountryPicker}
                    countryCode={countryNameCode}
                    withCallingCode={true}
                    withFilter={true}
                    withFlag={true}
                    onClose={() => setShowCountryPicker(false)}
                />
                <Text style={styles.countryCodeText}>{callingCode}</Text>
            </TouchableOpacity>
            <TextInput
                placeholder="Phone Number"
                style={styles.phoneInputText}
                placeholderTextColor="grey"
                keyboardType="number-pad"
                value={value}
                onChangeText={onChangeText}
                returnKeyType="done"
                maxLength={12}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    countryPickerInputContainer: {
        justifyContent:'center',
        width: wp('90%'),
        alignSelf: 'center',
        height: hp('7%'),
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft:wp(3),
        paddingHorizontal: wp(3),
        marginTop: hp(1.5),

    },
    countryCodeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: hp('7%'),
        width: wp('20%'),
    },
    countryCodeText: {
        color: colors.White,
        fontSize: 16,
        fontWeight: '500',
        paddingHorizontal: 5,
    },
    phoneInputText: {
        flex: 1,
        color: colors.White,
        fontSize: 16,
        marginLeft: wp('2%'),
        borderBottomWidth:1,
        borderBottomColor:colors.gray
        
    },
});
