import React, {useEffect, useState, useContext} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useGetVehiclesQuery} from '../RTKApis/services/vehicleApi';
import {UserContext} from '../Screens/UserContext';

const Cars = ({navigation}) => {
  const {selectedItems, setSelectedItems, totalAmount, setTotalAmount} =
    useContext(UserContext);
  const {data, isLoading} = useGetVehiclesQuery();
  const [carsData, setCarsData] = useState([]);

  useEffect(() => {
    if (data && data.vehicles) {
      const initializedData = data.vehicles.map(car => ({
        ...car,
        quantity: 1,
        selected: false,
      }));
      setCarsData(initializedData);
    }
  }, [data]);

  const incrementQuantity = index => {
    const newCarsData = [...carsData];
    newCarsData[index].quantity += 1;
    setCarsData(newCarsData);
  };

  const decrementQuantity = index => {
    const newCarsData = [...carsData];
    if (newCarsData[index].quantity > 1) {
      newCarsData[index].quantity -= 1;
      setCarsData(newCarsData);
    }
  };

  const toggleSelection = index => {
    const newCarsData = carsData.map((item, i) => ({
      ...item,
      selected: i === index && !item.selected, // Toggle selected state for clicked item
    }));
    setCarsData(newCarsData);
  };

  const handleBookNow = () => {
    const selectedItems = carsData.filter(item => item.selected);
    const totalAmount = selectedItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );

    setSelectedItems(selectedItems);
    setTotalAmount(totalAmount);

    navigation.navigate('SelectedRideList');
  };

  const calculateBorderColor = item => {
    if (item.selected) {
      return '#00CED1'; // Selected color for Range Rover (adjust as needed for other car types)
    } else {
      return 'black'; // Default color (yellow)
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
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

      <ScrollView contentContainerStyle={styles.containerBox}>
        {carsData.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.carItem,
              {borderColor: calculateBorderColor(item)},
              item.selected ? styles.selectedItem : null,
            ]}
            onPress={() => toggleSelection(index)}
            activeOpacity={0.8}>
            <View style={styles.leftContainer}>
              <Image source={{uri: item.image}} style={styles.carImage} />
              <Text style={styles.carPrice}>
                One Way ${item.price * item.quantity}
              </Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  onPress={() => decrementQuantity(index)}
                  style={styles.quantityButton}>
                  <Text style={styles.quantityText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <TouchableOpacity
                  onPress={() => incrementQuantity(index)}
                  style={styles.quantityButton}>
                  <Text style={styles.quantityText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.rightContainer}>
              <Text style={styles.carName}>{item.name}</Text>
              <Text style={styles.carDetails}>
                {item.passengers} Passengers
              </Text>
              <Text style={styles.carDetails}>{item.suit_cases} Suitcases</Text>
              <Text style={styles.carDetails}>{item.hand_bags} Hand Bags</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.bookNowButton} onPress={handleBookNow}>
        <Text style={styles.bookNowText}>Book Now</Text>
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
    backgroundColor: colors.lightblack,
  },
  arrowStyle: {
    marginBottom: 16,
  },
  carItem: {
    flexDirection: 'row',
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: wp(5),
    alignItems: 'center',
    borderWidth: 1,
  },
  leftContainer: {
    flex: 1,
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
    marginLeft: wp(4),
  },
  carImage: {
    width: wp(35),
    height: hp(10),
    resizeMode: 'contain',
  },
  carName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginVertical: 5,
  },
  carDetails: {
    color: colors.lightblack,
    marginVertical: 4,
    marginHorizontal: 5,
    fontWeight: '500',
    backgroundColor: '#FFB300',
    borderRadius: 3,
    paddingHorizontal: wp(2),
    paddingVertical: 3,
  },
  carPrice: {
    color: '#FFFFFF',
    marginVertical: 0,
    fontWeight: 'bold',
  },
  bookNowButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#FFB300',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    marginRight: 10,
    borderRadius: 20,
  },
  checked: {
    backgroundColor: '#FFB300',
    borderColor: '#FFB300',
  },
  bookNowText: {
    color: '#1A1A1A',
    fontWeight: 'bold',
    fontSize: 18,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: wp(3),
    paddingBottom: 2,
  },
  quantityButton: {
    borderWidth: 1,
    borderColor: '#FFB300',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  quantityText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  quantity: {
    color: '#FFFFFF',
    fontSize: 14,
    marginHorizontal: wp(2),
  },
  selectedItem: {
    elevation: 5,
    borderColor: '#FFB300',
  },
  icon: {
    marginRight: 5,
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default Cars;

// //////////////working fine with  redux ////////////
// import React, {useEffect, useState, useContext} from 'react';
// import {
//   Text,
//   StyleSheet,
//   View,
//   Image,
//   ScrollView,
//   TouchableOpacity,
// } from 'react-native';
// import {colors} from '../Constants';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import {useDispatch} from 'react-redux';
// import {setSelectedItems, setTotalAmount} from '../ReduxStore/actions';
// import {useGetVehiclesQuery} from '../RTKApis/services/vehicleApi';
// import {UserContext} from '../Screens/UserContext';

// const Cars = ({navigation}) => {
//   const dispatch = useDispatch();
//   const {data, isLoading} = useGetVehiclesQuery();
//   const [carsData, setCarsData] = useState([]);

//   useEffect(() => {
//     if (data && data.vehicles) {
//       // Initialize carsData with quantity and selected properties
//       const initializedData = data.vehicles.map(car => ({
//         ...car,
//         quantity: 1,
//         selected: false,
//       }));
//       setCarsData(initializedData);
//     }
//   }, [data]);

//   const incrementQuantity = index => {
//     const newCarsData = [...carsData];
//     newCarsData[index].quantity += 1;
//     setCarsData(newCarsData);
//   };

//   const decrementQuantity = index => {
//     const newCarsData = [...carsData];
//     if (newCarsData[index].quantity > 1) {
//       newCarsData[index].quantity -= 1;
//       setCarsData(newCarsData);
//     }
//   };

//   const toggleSelection = index => {
//     const newCarsData = carsData.map((item, i) => ({
//       ...item,
//       selected: i === index && !item.selected, // Toggle selected state for clicked item
//     }));
//     setCarsData(newCarsData);
//   };

//   const handleBookNow = () => {
//     const selectedItems = carsData.filter(item => item.selected);
//     const totalAmount = selectedItems.reduce(
//       (acc, item) => acc + item.price * item.quantity,
//       0,
//     );

//     dispatch(setSelectedItems(selectedItems));
//     dispatch(setTotalAmount(totalAmount));

//     navigation.navigate('SelectedRideList');
//   };

//   const calculateBorderColor = item => {
//     if (item.selected) {
//       return '#00CED1'; // Selected color for Range Rover (adjust as needed for other car types)
//     } else {
//       return 'black'; // Default color (yellow)
//     }
//   };

//   if (isLoading) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.loadingText}>Loading...</Text>
//       </View>
//     );
//   }
//   // const {selectedDate, selectedTime} = useContext(UserContext);

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
//       {/* <Text>Selected Date: {selectedDate.toLocaleDateString()}</Text>
//       <Text>Selected Time: {selectedTime.toLocaleTimeString()}</Text> */}

//       <ScrollView contentContainerStyle={styles.containerBox}>
//         {carsData.map((item, index) => (
//           <TouchableOpacity
//             key={index}
//             style={[
//               styles.carItem,
//               {borderColor: calculateBorderColor(item)},
//               item.selected ? styles.selectedItem : null,
//             ]}
//             onPress={() => toggleSelection(index)}
//             activeOpacity={0.8}>
//             <View style={styles.leftContainer}>
//               <Image source={{uri: item.image}} style={styles.carImage} />
//               <Text style={styles.carPrice}>
//                 One Way ${item.price * item.quantity}
//               </Text>
//               <View style={styles.quantityContainer}>
//                 <TouchableOpacity
//                   onPress={() => decrementQuantity(index)}
//                   style={styles.quantityButton}>
//                   <Text style={styles.quantityText}>-</Text>
//                 </TouchableOpacity>
//                 <Text style={styles.quantity}>{item.quantity}</Text>
//                 <TouchableOpacity
//                   onPress={() => incrementQuantity(index)}
//                   style={styles.quantityButton}>
//                   <Text style={styles.quantityText}>+</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//             <View style={styles.rightContainer}>
//               <Text style={styles.carName}>{item.name}</Text>
//               <Text style={styles.carDetails}>
//                 {item.passengers} Passengers
//               </Text>
//               <Text style={styles.carDetails}>{item.suit_cases} Suitcases</Text>
//               <Text style={styles.carDetails}>{item.hand_bags} Hand Bags</Text>
//             </View>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//       <TouchableOpacity style={styles.bookNowButton} onPress={handleBookNow}>
//         <Text style={styles.bookNowText}>Book Now</Text>
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
//     backgroundColor: colors.lightblack,
//   },
//   arrowStyle: {
//     marginBottom: 16,
//   },
//   carItem: {
//     flexDirection: 'row',
//     backgroundColor: '#333',
//     borderRadius: 10,
//     padding: 10,
//     marginVertical: 10,
//     marginHorizontal: wp(5),
//     alignItems: 'center',
//     borderWidth: 1,
//   },
//   leftContainer: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   rightContainer: {
//     flex: 1,
//     marginLeft: wp(4),
//   },
//   carImage: {
//     width: wp(35),
//     height: hp(10),
//     resizeMode: 'contain',
//   },
//   carName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#FFFFFF',
//     marginVertical: 5,
//   },
//   carDetails: {
//     color: colors.lightblack,
//     marginVertical: 4,
//     marginHorizontal: 5,
//     fontWeight: '500',
//     backgroundColor: '#FFB300',
//     borderRadius: 3,
//     paddingHorizontal: wp(2),
//     paddingVertical: 3,
//   },
//   carPrice: {
//     color: '#FFFFFF',
//     marginVertical: 0,
//     fontWeight: 'bold',
//   },
//   bookNowButton: {
//     position: 'absolute',
//     bottom: 20,
//     left: 20,
//     right: 20,
//     backgroundColor: '#FFB300',
//     paddingVertical: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   checkbox: {
//     width: 20,
//     height: 20,
//     borderWidth: 1,
//     marginRight: 10,
//     borderRadius: 20,
//   },
//   checked: {
//     backgroundColor: '#FFB300',
//     borderColor: '#FFB300',
//   },
//   bookNowText: {
//     color: '#1A1A1A',
//     fontWeight: 'bold',
//     fontSize: 18,
//   },
//   quantityContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 15,
//     paddingHorizontal: wp(3),
//     paddingBottom: 2,
//   },
//   quantityButton: {
//     borderWidth: 1,
//     borderColor: '#FFB300',
//     borderRadius: 5,
//     paddingHorizontal: 10,
//   },
//   quantityText: {
//     fontSize: 18,
//     color: '#FFFFFF',
//   },
//   quantity: {
//     color: '#FFFFFF',
//     fontSize: 14,
//     marginHorizontal: wp(2),
//   },
//   selectedItem: {
//     elevation: 5,
//     borderColor: '#FFB300',
//   },
//   icon: {
//     marginRight: 5,
//   },
//   loadingText: {
//     color: '#FFFFFF',
//     fontSize: 18,
//   },
// });

// export default Cars;
