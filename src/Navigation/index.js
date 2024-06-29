import { createNativeStackNavigator } from '@react-navigation/native-stack';
import firstlastname from "../Screens/firstlastname";
import TermAndPolicy from "../Screens/TermAndPolicy";
import NumberVerify from "../Screens/NumberVerify";
import LoginScreen from '../Screens/LoginScreen';
import EnterPickerlocation from "../Screens/AcessMaplocation/EnterPickerlocation";
import PickSaveLocation from "../Screens/AcessMaplocation/PickSaveLocation";
import AddMorePickerlocation from "../Screens/AcessMaplocation/AddMorePickerlocation";
import AddMoreInputField from '../Screens/AcessMaplocation/AddMoreInputField';
import MapPinLocation from '../Screens/AcessMaplocation/MapPinLocation';
import SplashScreenOne from '../Screens/SplashScreenOne';
import SplashScreenTwo from '../Screens/SplashScreenTwo';
import Cars from '../Screens/Cars';
import SuccessfullPayment from '../Screens/SuccessfullPayment';
import PayByDebit from '../Screens/PayByDebit'
import SelectPaymentMethod from '../Screens/SelectPaymentMethod';
import MoreDetails from '../Screens/MoreDetails';
const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SplashScreenOne"  component={SplashScreenOne}   options={{headerShown: false}}/>

      <Stack.Screen name="SplashScreenTwo"  component={SplashScreenTwo}   options={{headerShown: false}}/> 
      <Stack.Screen   name="firstlastname"    component={firstlastname}    options={{headerShown: false}}/> 
    
     <Stack.Screen  name="LoginScreen"      component={LoginScreen}       options={{headerShown: false}}/>

      <Stack.Screen  name="NumberVerify"     component={NumberVerify}      options={{headerShown: false}}/> 

  
     <Stack.Screen   name="TermAndPolicy"    component={TermAndPolicy}    options={{headerShown: false}} />   

      {/* <Stack.Screen  name="EnterPickerlocation" component={EnterPickerlocation}  options={{headerShown: false}}/> 
         <Stack.Screen
          name="PickSaveLocation"
          component={PickSaveLocation}
          options={{headerShown: false}}
        />   */}
       {/* <Stack.Screen
          name="AddMorePickerlocation"
          component={AddMorePickerlocation}
          options={{headerShown: false}}
        />   */}
     {/* <Stack.Screen name="AddMoreInputField" component={AddMoreInputField}
                  options={{headerShown: false}}/>  */}

    <Stack.Screen name="MapPinLocation" component={MapPinLocation}
        options={{ headerShown: false }} />
    
    <Stack.Screen name="Cars" component={Cars} options={{headerShown: false}}/>

      <Stack.Screen name="SelectPaymentMethod" component={SelectPaymentMethod} options={{headerShown: false}}/>
      <Stack.Screen name="PayByDebit" component={PayByDebit} options={{headerShown: false}}/>
      <Stack.Screen name="SuccessfullPayment" component={SuccessfullPayment} options={{headerShown: false}}/> 
   
<Stack.Screen name="MoreDetails" component={MoreDetails} options={{headerShown: false}}/> 



     


    </Stack.Navigator>
  );
};
export default Navigation;