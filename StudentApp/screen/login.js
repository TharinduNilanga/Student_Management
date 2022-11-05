import { View, Text ,StyleSheet, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import {  NativeBaseProvider,VStack,Input, } from 'native-base';
import sqlite from 'react-native-sqlite-storage';
import { useEffect } from 'react';


const db= sqlite.openDatabase({name:'StudentMangement',location:'default'},
            ()=>{
                console.log("created")
            },
            error=>{
                console.log(error)
            }

)

export default function App({navigation}) {
   const [email,setEmail]=useState('');
   const [password,setPassword]=useState('');
  
   const [emailStyle,setEmailStyle]=useState(style.estyle)
   const [passwordStyle,setPasswordStyle]=useState(style.estyle)
   useEffect(()=>{
     getAll();
   })


   const getAll=()=>{
    try{
      db.transaction((tx)=>{
        tx.executeSql("SELECT email,userName FROM SignUp",
        [],
        (tx,results)=>{
          var len =results.rows.length;
          if(len>0){
        
            var email=results.rows.item(0).email;
            var userName=results.rows.item(0).userName;
           console.log(email,password)
          }
        }
        )
      })
    }catch(e){
      console.log(e)
    }
   }
   
 
  const validateEmail = (email) => {
    var e =/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
   
     if( e.test(email)){
        return true;
     }
     return false;
  };
  const validatePassword = (password) => {
    
    var p=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
     if( p.test(password)){
        return true;
     }
     return false;
  };

   const LoginOnAction=()=>{
     if(validateEmail(email)){
        setEmailStyle(style.estyle)
        console.log('email ok')
     }else{
        setEmailStyle(style.estyleFail)
     }

     if(validatePassword(password)){
        setPasswordStyle(style.estyle)
        console.log('password ok')
      }else{
        setPasswordStyle(style.estyleFail)
         console.log('password fail')
      }
   }

 
  return (
    <NativeBaseProvider>
    <View style={style.container}>

       <View style={style.body}>

        <VStack space={7}  w="75%" maxW="300px" mx="auto" mt="20%" style={{alignItems:'center',justifyContent:'center'}}>
          <Input
            
            type='email'
            placeholder='email'
            size="md" 
            value={email}
            onChangeText={(e)=>{
                setEmail(e)
            }}
            style={emailStyle}
          />
          {/* <Text style={emailStyle}>eg:abcd3@gmail.com</Text> */}
          <Input
            type='password'
            placeholder='password'
            size="md" 
            value={password}
            onChangeText={(e)=>{
                setPassword(e)
            }}
            style={passwordStyle} 

          />
          
          <TouchableOpacity 
            style={style.btn}
            onPress={LoginOnAction}
            >
            <Text style={{fontWeight:'bold',color:'white'}}>Login</Text>
          </TouchableOpacity>
        </VStack>

       </View>

    </View>
    </NativeBaseProvider>
  )
}
const style=StyleSheet.create({
  container:{
     flex:1,
     justifyContent: "center",
     alignItems:'center',
  },
  body:{
    position:'absolute',
    width:'90%',
    height:'50%',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2},
    shadowRadius: 10,
    elevation: 9,
    backgroundColor: "#FFFFFF",
    borderWidth:1,
    borderRadius:10,
  },
  btn:{
    alignItems:'center',
    justifyContent:'center',
    
    width:'60%',
    height:'20%',

    backgroundColor:'green',
    borderRadius:10
    
},
estyle:{
    borderWidth:1,
    borderColor:'black'
    // color:'green',
    // marginTop:'-10%'
},
estyleFail:{
    
    borderWidth:1,
    borderColor:'red'
}
})