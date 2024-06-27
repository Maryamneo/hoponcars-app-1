import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors, fontSize} from '../Constants';

export default function RecipientScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          <Text style={styles.backButton}>{'<-'}</Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Ionicons name="person" size={15} color="white" />
            <Text style={styles.contactsIcon}>Contacts</Text>
          </View>
        </View>
        <Text style={styles.title}>Who's receiving the {'\n'} package?</Text>
        <Text style={styles.subtitle}>
          The driver may contact the receiver to
          {'\n'} complete the delivery
        </Text>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter name"
          placeholderTextColor="#999"
        />
        <Text style={styles.label}>Phone number</Text>
        <View style={styles.phoneContainer}>
          <Image source={require('../Images/flag.png')} style={styles.flag} />
          <Text style={styles.phonePrefix}>+44</Text>
          <TextInput
            style={styles.phoneNumber}
            placeholder="7397047724"
            value={phoneNumber}
            onChangeText={text => setPhoneNumber(text)}
            placeholderTextColor={'#999'}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Confirm recipient</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dullBlack,
    padding: 16,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    fontSize: 18,
    color: '#fff',
  },
  contactsIcon: {
    fontSize: 16,
    color: '#fff',
  },
  title: {
    fontSize: fontSize.mediumLarge,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: colors.White,
    marginVertical: 15,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  input: {
    borderColor: 'white',
    borderWidth: 1,
    color: '#fff',
    paddingHorizontal: 10,
    marginBottom: 24,
    fontSize: 20,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  flag: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  phonePrefix: {
    fontSize: 16,
    color: '#fff',
    marginRight: 8,
  },
  phoneNumber: {
    fontSize: 16,
    color: '#fff',
  },
  button: {
    backgroundColor: colors.black,
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
});
