import {createNativeStackNavigator} from '@react-navigation/native-stack';
import firstlastname from '../Screens/firstlastname';
import TermAndPolicy from '../Screens/TermAndPolicy';
import NumberVerify from '../Screens/NumberVerify';
import LoginScreen from '../Screens/LoginScreen';
import EnterPickerlocation from '../Screens/AcessMaplocation/EnterPickerlocation';
import PickSaveLocation from '../Screens/AcessMaplocation/PickSaveLocation';
import AddMorePickerlocation from '../Screens/AcessMaplocation/AddMorePickerlocation';
import AddMoreInputField from '../Screens/AcessMaplocation/AddMoreInputField';
import MapPinLocation from '../Screens/AcessMaplocation/MapPinLocation';
import SplashScreenOne from '../Screens/SplashScreenOne';
import SplashScreenTwo from '../Screens/SplashScreenTwo';
import Cars from '../Screens/Cars';
import SuccessfullPayment from '../Screens/SuccessfullPayment';
import PayByDebit from '../Screens/PayByDebit';
import SelectPaymentMethod from '../Screens/SelectPaymentMethod';
import MoreDetails from '../Screens/MoreDetails';
import SelectedRideList from '../Screens/SelectedRideList';
import LoginUser from '../Screens/LoginUser';
import EmailPass from '../Screens/EmailPass';
import ForgotPass from '../Screens/ForgotPass';
import ForgetSuccess from '../Screens/ForgetSuccess';
import {UserProvider} from '../Screens/UserContext';
import ResetPass from '../Screens/ResetPass';
import ForgetPassOTP from '../Screens/ForgetPassOTP';
const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <UserProvider>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="firstlastname"
          component={firstlastname}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="EmailPass"
          component={EmailPass}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NumberVerify"
          component={NumberVerify}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TermAndPolicy"
          component={TermAndPolicy}
          options={{headerShown: false}}
        /> */}

        {/* ////////Login Screen  */}
        {/* <Stack.Screen
          name="LoginUser"
          component={LoginUser}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgotPass"
          component={ForgotPass}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgetPassOTP"
          component={ForgetPassOTP}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ResetPass"
          component={ResetPass}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgetSuccess"
          component={ForgetSuccess}
          options={{headerShown: false}}
        /> */}

        <Stack.Screen
          name="MapPinLocation"
          component={MapPinLocation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MoreDetails"
          component={MoreDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Cars"
          component={Cars}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="SelectedRideList"
          component={SelectedRideList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SelectPaymentMethod"
          component={SelectPaymentMethod}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SuccessfullPayment"
          component={SuccessfullPayment}
          options={{headerShown: false}}
        />

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

        {/* <Stack.Screen   name="firstlastname"    component={firstlastname}    options={{headerShown: false}}/>   */}
        {/* <Stack.Screen  name="LoginScreen"       component={LoginScreen}      options={{headerShown: false}}/>  */}
        {/* <Stack.Screen   name="TermAndPolicy"    component={TermAndPolicy}    options={{headerShown: false}} />      */}

        {/* <Stack.Screen name="MoreDetails" component={MoreDetails} options={{headerShown: false}}/>   */}

        {/* <Stack.Screen name="PayByDebit" component={PayByDebit} options={{headerShown: false}}/> */}
      </Stack.Navigator>
    </UserProvider>
  );
};
export default Navigation;
