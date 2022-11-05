
import React from 'react'
import Login from './screen/login'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import student from './screen/student'
import education from './screen/education'
import signUp from './screen/signUp'
import loadStudents from './screen/loadStudents';
import EducationalDetails from './screen/studentEducationalDeatails'
import DashBoard from './screen/DashBoard';


const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Login"  component={Login} />
        <Stack.Screen name="signUp" component={signUp} />
        <Stack.Screen name="DashBoard"  component={DashBoard} />
        <Stack.Screen name="student" component={student} />
         <Stack.Screen name="education"  component={education} />
         <Stack.Screen name="loadStudents"  component={loadStudents} />
         <Stack.Screen name="EducationalDetails"  component={EducationalDetails} />
        
        
      </Stack.Navigator>
 </NavigationContainer>
  )
}
