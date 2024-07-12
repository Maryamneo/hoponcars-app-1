// import React, {useContext} from 'react';
// import {
//   Text,
//   StyleSheet,
//   View,
//   Image,
//   ScrollView,
//   TouchableOpacity,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {UserContext} from '../Screens/UserContext';

// const SelectedRideList = ({navigation}) => {
//   const {selectedItems, totalAmount} = useContext(UserContext);
//   console.log('selectedItems=====', selectedItems);
//   if (!selectedItems || selectedItems.length === 0) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.title}>Selected Rides</Text>
//         <Text style={styles.message}>No rides selected.</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={() => navigation.goBack()}>
//         <Ionicons
//           name="arrow-back"
//           size={24}
//           color="gray"
//           style={styles.arrowStyle}
//         />
//       </TouchableOpacity>
//       <Text style={styles.title}>Selected Rides</Text>
//       <ScrollView contentContainerStyle={styles.containerBox}>
//         {selectedItems.map((item, index) => (
//           <View key={index} style={styles.rideItem}>
//             <Image source={item.image} style={styles.rideImage} />
//             <View style={styles.rideDetails}>
//               <Text style={styles.rideName}>{item.carName}</Text>
//               <Text style={styles.rideDetail}>
//                 {item.passangers} Passengers
//               </Text>
//               <Text style={styles.rideDetail}>{item.suitcase} Suitcases</Text>
//               <Text style={styles.rideDetail}>{item.Luggages} Luggages</Text>
//               <Text style={styles.ridePrice}>
//                 One Way ${item.price * item.quantity}
//               </Text>
//               <Text style={styles.rideQuantity}>Quantity: {item.quantity}</Text>
//             </View>
//           </View>
//         ))}
//       </ScrollView>
//       <Text style={styles.totalAmount}>Total Amount: ${totalAmount}</Text>
//       <TouchableOpacity
//         style={styles.payNowButton}
//         onPress={() => navigation.navigate('SelectPaymentMethod')}>
//         <Text style={styles.payNowText}>Proceed to Pay</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#1A1A1A',
//     padding: 16,
//   },
//   containerBox: {
//     justifyContent: 'center',
//     backgroundColor: '#333',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#FFD700',
//     textAlign: 'center',
//     marginVertical: 10,
//   },
//   message: {
//     fontSize: 18,
//     color: '#FFFFFF',
//     textAlign: 'center',
//     marginTop: 20,
//   },
//   rideItem: {
//     flexDirection: 'row',
//     backgroundColor: '#444',
//     borderRadius: 10,
//     padding: 10,
//     marginVertical: 10,
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#FFB300',
//   },
//   rideImage: {
//     width: 100,
//     height: 100,
//     resizeMode: 'contain',
//   },
//   rideDetails: {
//     marginLeft: 10,
//   },
//   rideName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#FFFFFF',
//   },
//   rideDetail: {
//     color: '#FFD700',
//   },
//   ridePrice: {
//     color: '#FFFFFF',
//     fontWeight: 'bold',
//   },
//   rideQuantity: {
//     color: '#FFD700',
//   },
//   totalAmount: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#FFD700',
//     textAlign: 'center',
//     marginVertical: 20,
//   },
//   payNowButton: {
//     backgroundColor: '#FFB300',
//     paddingVertical: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginHorizontal: 20,
//     marginBottom: 20,
//   },
//   payNowText: {
//     color: '#1A1A1A',
//     fontWeight: 'bold',
//     fontSize: 18,
//   },
// });

// export default SelectedRideList;
import React, {useContext} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {UserContext} from '../Screens/UserContext';
import {useCreateBookingMutation} from '../RTKApis/services/userApi'; // Adjust the import path as necessary
import AsyncStorage from '@react-native-async-storage/async-storage';
const SelectedRideList = ({navigation}) => {
  const {selectedItems, totalAmount, userId} = useContext(UserContext); // Assume userId is stored in UserContext
  const [createBooking, {isLoading}] = useCreateBookingMutation();
  console.log('selectedItems++++', selectedItems);

  const handleProceedToPay = async () => {
    const value = await AsyncStorage.getItem('UserID');
    const bookingData = {
      userId: value,
      vehicleId: selectedItems[0]?._id || '', // Assuming the vehicle ID is in _id
      vehicleQuantity: selectedItems.length,
      pickup_location: {
        coordinates: [32.54325, 92.352423],
      },
      drop_location: {
        coordinates: [32.532325, 92.35242532],
      },
      booking_date: '10-12-2023',
      booking_time: '11:24',
      passengers: selectedItems.reduce(
        (acc, item) => acc + (item.passengers || 0),
        0,
      ),
      luggages: selectedItems.reduce(
        (acc, item) => acc + (item.suit_cases || 0),
        0,
      ), // Ensure field name matches
      hand_luggages: selectedItems.reduce(
        (acc, item) => acc + (item.hand_bags || 0),
        0,
      ), // Ensure field name matches
      fair: totalAmount,
      miles: 5, // Assuming this is constant or calculate based on data
      pay_by: 'cash', // Assuming this is constant or get from selected payment method
    };
    console.log('bookingData=-=-=-============', bookingData);
    try {
      await createBooking(bookingData).unwrap();
      navigation.navigate('SelectPaymentMethod');
    } catch (error) {
      console.error('Failed to create booking:', error);
      // Handle error appropriately
    }
  };

  if (!selectedItems || selectedItems.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Selected Rides</Text>
        <Text style={styles.message}>No rides selected.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="gray"
          style={styles.arrowStyle}
        />
      </TouchableOpacity>
      <Text style={styles.title}>Selected Rides</Text>
      <ScrollView contentContainerStyle={styles.containerBox}>
        {selectedItems.map((item, index) => (
          <View key={index} style={styles.rideItem}>
            <Image source={{uri: item.image}} style={styles.rideImage} />
            <View style={styles.rideDetails}>
              <Text style={styles.rideName}>{item.name}</Text>
              <Text style={styles.rideDetail}>
                {item.passengers} Passengers
              </Text>
              <Text style={styles.rideDetail}>{item.suit_cases} Suitcases</Text>
              <Text style={styles.rideDetail}>{item.luggages} Luggages</Text>
              <Text style={styles.ridePrice}>
                One Way ${item.price * item.quantity}
              </Text>
              <Text style={styles.rideQuantity}>Quantity: {item.quantity}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <Text style={styles.totalAmount}>Total Amount: ${totalAmount}</Text>
      <TouchableOpacity
        style={styles.payNowButton}
        onPress={handleProceedToPay}
        disabled={isLoading}>
        <Text style={styles.payNowText}>Proceed to Pay</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    padding: 16,
  },
  containerBox: {
    justifyContent: 'center',
    backgroundColor: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginVertical: 10,
  },
  message: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 20,
  },
  rideItem: {
    flexDirection: 'row',
    backgroundColor: '#444',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFB300',
  },
  rideImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  rideDetails: {
    marginLeft: 10,
  },
  rideName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  rideDetail: {
    color: '#FFD700',
  },
  ridePrice: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  rideQuantity: {
    color: '#FFD700',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginVertical: 20,
  },
  payNowButton: {
    backgroundColor: '#FFB300',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  payNowText: {
    color: '#1A1A1A',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default SelectedRideList;
