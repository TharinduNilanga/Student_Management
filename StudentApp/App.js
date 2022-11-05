
import React from 'react'
import Login from './screen/login'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import student from './screen/student'
import education from './screen/education'
import signUp from './screen/signUp'


const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="student" options={{"headerShown":false}} component={student} /> */}
         <Stack.Screen name="education"  component={education} />
        
      </Stack.Navigator>
 </NavigationContainer>
  )
}
