// import React from 'react';
// import {Text, StyleSheet, View, Image, Button, ScrollView,TouchableOpacity} from 'react-native';
// import {colors} from '../Constants';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from "react-native-responsive-screen";
// import { useSelector } from 'react-redux';
// const Cars = ({ navigation}) => {
//   const pickerPoint1 = useSelector(state => state.pickerPoints.pickerPoint1);
//   const pickerPoint2 = useSelector(state => state.pickerPoints.pickerPoint2);

//   const CarsData = [
//     {
//       carName: 'Saloon Car',
//       passangers: 4,
//       suitcase: 2,
//       Luggages: 1,
//       price: 25,
//       img: require('../Images/car1.png'),
//     },
//     {
//       carName: 'Range Rover ',
//       passangers: 6,
//       suitcase: 3,
//       Luggages: 2,
//       price: 35,
//       img: require('../Images/car2.png'),
//     },
//     {
//       carName: 'Saloon Car',
//       passangers: 4,
//       suitcase: 2,
//       Luggages: 1,
//       price: 25,
//       img: require('../Images/car1.png'),
//     },
//     {
//       carName: 'Saloon Car',
//       passangers: 4,
//       suitcase: 2,
//       Luggages: 1,
//       price: 25,
//       img: require('../Images/car1.png'),
//     },
//   ];

//   return (
//     <View style={styles.container}>
//  {/* <Text style={{color:'white'}}>Picker Point 1: {pickerPoint1}</Text>
//       <Text style={{color:'white'}}>Picker Point 2: {pickerPoint2}</Text>
//       */}
//       <TouchableOpacity onPress={() => navigation.goBack()}>
//       <Ionicons name="arrow-back" size={24} color="gray" style={styles.arrowStyle} />
//       </TouchableOpacity>
//     <ScrollView contentContainerStyle={styles.containerBox}>
        
//       {CarsData.map((item, index) => (
//         <View key={index} style={styles.carItem}>
//           <Image source={item.img} style={styles.carImage} />
//           <Text style={styles.carName}>{item.carName}</Text>
//           <Text style={styles.carDetails}>{item.passangers} Passengers</Text>
//           <Text style={styles.carDetails}>{item.suitcase} Suitcases</Text>
//           <Text style={styles.carDetails}>{item.Luggages} Luggages</Text>
//           <Text style={styles.carPrice}>One Way ${item.price}</Text>
//           <View style={styles.buttonContainer}>
//             <Button title="Book Now" color="#FFB300"
//              onPress={() => navigation.navigate('SelectPaymentMethod')} />
//           </View>
//         </View>
//       ))}
//     </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#1A1A1A',
//     padding: 16,
//     justifyContent: 'space-between',

//   },
//   containerBox: {
//     // display: 'flex',
//     // flex: 1,
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//      justifyContent: 'center',
//     backgroundColor: colors.lightblack,
//   },
//   arrowStyle: {
//     marginRight: 'auto',
    
//     // color:Colors.lightGray
//   },
//   carItem: {
//     backgroundColor: '#333',
//     borderRadius: 10,
//     padding: 10,
//     width: '45%',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#FFB300',
//     margin: 5,
//     marginTop:hp(5)
//   },
//   carName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#FFFFFF',
//     marginVertical: 5,
//   },
//   carDetails: {
//     color: '#FFD700',
//     marginVertical: 2,
//   },
//   carPrice: {
//     color: '#FFFFFF',
//     marginVertical: 5,
//     fontWeight: 'bold',
//   },
//   buttonContainer: {
//     marginTop: 10,
//     width: '100%',
//     borderRadius: 5,
//     overflow: 'hidden',
//   },
//   carImage: {
//     width: '100%',
//     height: 100,
//     resizeMode: 'contain',
//     marginBottom: 10,
//   },
// });

// export default Cars;
import React, { useState } from 'react';
import { Text, StyleSheet, View, Image, Button, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '../Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSelector } from 'react-redux';

const Cars = ({ navigation }) => {
  const pickerPoint1 = useSelector(state => state.pickerPoints.pickerPoint1);
  const pickerPoint2 = useSelector(state => state.pickerPoints.pickerPoint2);

  const initialCarsData = [
    {
      carName: 'Saloon Car',
      passangers: 4,
      suitcase: 2,
      Luggages: 1,
      price: 25,
      img: require('../Images/car1.png'),
      quantity: 1
    },
    {
      carName: 'Range Rover ',
      passangers: 6,
      suitcase: 3,
      Luggages: 2,
      price: 35,
      img: require('../Images/car2.png'),
      quantity: 1
    },
    {
      carName: 'Saloon Car',
      passangers: 4,
      suitcase: 2,
      Luggages: 1,
      price: 25,
      img: require('../Images/car1.png'),
      quantity: 1
    },
    {
      carName: 'Saloon Car',
      passangers: 4,
      suitcase: 2,
      Luggages: 1,
      price: 25,
      img: require('../Images/car1.png'),
      quantity: 1
    },
  ];

  const [carsData, setCarsData] = useState(initialCarsData);

  const incrementQuantity = (index) => {
    const newCarsData = [...carsData];
    newCarsData[index].quantity += 1;
    setCarsData(newCarsData);
  };

  const decrementQuantity = (index) => {
    const newCarsData = [...carsData];
    if (newCarsData[index].quantity > 1) {
      newCarsData[index].quantity -= 1;
      setCarsData(newCarsData);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="gray" style={styles.arrowStyle} />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.containerBox}>
        {carsData.map((item, index) => (
          <View key={index} style={styles.carItem}>
            <Image source={item.img} style={styles.carImage} />
            <Text style={styles.carName}>{item.carName}</Text>
            <Text style={styles.carDetails}>{item.passangers} Passengers</Text>
            <Text style={styles.carDetails}>{item.suitcase} Suitcases</Text>
            <Text style={styles.carDetails}>{item.Luggages} Luggages</Text>
            <Text style={[styles.carDetails,{marginRight:wp(2),fontWeight:'600'}]}>Quantity</Text>
             
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={() => decrementQuantity(index)} style={styles.quantityButton}>
                <Text style={styles.quantityText}>-</Text>
              </TouchableOpacity>
              
              <Text style={styles.quantity}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => incrementQuantity(index)} style={styles.quantityButton}>
                <Text style={styles.quantityText}>+</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.carPrice}>One Way ${item.price}</Text>
        
            <View style={styles.buttonContainer}>
              <Button title="Book Now" color="#FFB300"
                onPress={() => navigation.navigate('SelectPaymentMethod')} />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    padding: 16,
    justifyContent: 'space-between',
  },
  containerBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: colors.lightblack,
  },
  arrowStyle: {
    marginRight: 'auto',
  },
  carItem: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 10,
    width: '45%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFB300',
    margin: 5,
    marginTop: hp(5),
  },
  carName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginVertical: 5,
  },
  carDetails: {
    color: '#FFD700',
    marginVertical: 2,
  },
  carPrice: {
    color: '#FFFFFF',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    borderRadius: 5,
    overflow: 'hidden',
  },
  carImage: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  quantityContainer: {
     flexDirection: 'row',
    alignItems: 'center',
     marginVertical: 10,
    borderWidth:1,
    borderColor:'#FFB300',
    paddingHorizontal:wp(5)
 
  },
  quantityButton: {
    borderWidth:1,
    width:wp(-20),
    // borderColor:'#FFB300',
    // backgroundColor: '#FFB300',
    borderRadius: 5,
    paddingHorizontal: 1,
    paddingVertical: 0,
  },
  quantityText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  quantity: {
    color: '#FFFFFF',
    fontSize: 14,
    marginHorizontal: 1,
  },
});

export default Cars;
