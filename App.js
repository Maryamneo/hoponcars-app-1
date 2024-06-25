

import React from 'react';
import Navigation from './src/Navigation/index';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
 

const App=()=>{
  return(
   
    <SafeAreaView style={{flex: 1}}>
    <NavigationContainer>
    <Navigation />
  </NavigationContainer>
  </SafeAreaView>

  )
}


export default App;
