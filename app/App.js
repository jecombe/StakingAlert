import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Alert from './components/Alert';
import AllBaker from './components/AllBaker';



const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <NavigationContainer>
   

      <Tab.Navigator>
    
      <Tab.Screen name="AllBakers" component={AllBaker} />
        <Tab.Screen name="Alert" component={Alert} />
    </Tab.Navigator>

    </NavigationContainer>
  );
}
