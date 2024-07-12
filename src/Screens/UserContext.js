// // UserContext.js
// import React, { createContext, useState } from 'react';

// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [pickerPoint1, setPickerPoint1] = useState('');
//   const [pickerPoint2, setPickerPoint2] = useState('');
//   const [coord1, setCoord1] = useState(null);
//   const [coord2, setCoord2] = useState(null);
// console.log('pickupLocation========',pickupLocation);
// console.log('pickupLocation',pickupLocation)

//   return (
//     <UserContext.Provider value={{ username, setUsername ,email,setEmail,password,setPassword,phoneNumber, setPhoneNumber,pickerPoint1, setPickerPoint1, pickerPoint2, setPickerPoint2, coord1, setCoord1, coord2, setCoord2}}>
//       {children}
//     </UserContext.Provider>
//   );
// };
import React, {createContext, useState} from 'react';

export const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pickerPoint1, setPickerPoint1] = useState('');
  const [pickerPoint2, setPickerPoint2] = useState('');
  const [coord1, setCoord1] = useState(null);
  const [coord2, setCoord2] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const addSelectedItem = item => {
    setSelectedItems(prevItems => [...prevItems, item]);
  };

  const removeSelectedItem = item => {
    setSelectedItems(prevItems => prevItems.filter(i => i.id !== item.id));
  };
  const pickupLocation = {
    coordinates: coord1 ? [coord1.latitude, coord1.longitude] : [],
  };

  const dropLocation = {
    coordinates: coord2 ? [coord2.latitude, coord2.longitude] : [],
  };

  console.log('pickupLocation========+++++', pickerPoint1);
  console.log('dropLocation========+++++++', pickerPoint2);

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        phoneNumber,
        setPhoneNumber,
        pickerPoint1,
        setPickerPoint1,
        pickerPoint2,
        setPickerPoint2,
        coord1,
        setCoord1,
        coord2,
        setCoord2,
        pickupLocation,
        dropLocation,
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
        selectedItems,
        setSelectedItems,
        totalAmount,
        setTotalAmount,
        selectedItems,
        setSelectedItems,
        
      }}>
      {children}
    </UserContext.Provider>
  );
};
