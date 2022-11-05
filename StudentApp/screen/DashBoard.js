import { View, Text,StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'

export default function DashBoard({navigation}) {
    const studentOnAction=()=>{
        navigation.navigate('student')
    }
    const load=()=>{
        navigation.navigate('loadStudents')
    }
  return (
    <View style={style.container}>
         <TouchableOpacity 
            style={style.btn}
            onPress={studentOnAction}
            >
            <Text style={{fontWeight:'bold',color:'white'}}>Add Student</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={style.btn}
            onPress={load}
            >
            <Text style={{fontWeight:'bold',color:'white'}}>View Details</Text>
          </TouchableOpacity>
      
    </View>
  )
}
const style=StyleSheet.create({
  container:{
    flex:1,
    justifyContent: "center",
    alignItems:'center',
    padding:20
  },
  btn:{
    alignItems:'center',
    justifyContent:'center',
    
    width:'60%',
    height:'10%',

    backgroundColor:'green',
    borderRadius:10,
    marginBottom:10
    
},
})
