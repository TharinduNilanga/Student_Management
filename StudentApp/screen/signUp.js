import { View, Text,ImageBackground ,StyleSheet,TouchableOpacity,Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import {  NativeBaseProvider,VStack,Input, } from 'native-base';
import sqlite from 'react-native-sqlite-storage';


const db= sqlite.openDatabase({name:'StudentMangement',location:'default'},
            ()=>{
                console.log("created")
            },
            error=>{
                console.log(error)
            }

)

export default function SignUp({navigation}) {
    const [userName,setUserName]= useState('')
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
    useEffect(()=>{
        createTableSignUp();
        getAll()

    })
    const getAll=()=>{
        try{
          db.transaction((tx)=>{
            tx.executeSql("SELECT email,userName FROM SignUp",
            [],
            (tx,results)=>{
              var len =results.rows.length;
              if(len>0){
            
                // for (const r of results.rows) {
                //     console.log(r.email)
                    
                // }
                for (let index = 0; index < len; index++) {
                  
                    var email=results.rows.item(index).email;
                    var userName=results.rows.item(index).userName;
                   console.log(email,userName)
                }
               
              }
            }
            )
          })
        }catch(e){
          console.log(e)
        }
       }
       
    const createTableSignUp=async()=>{
       await db.transaction((tx)=>{
        console.log("run")
            tx.executeSql("CREATE TABLE IF NOT EXISTS SignUP(email VARCHAR(225) PRIMARY KEY,userName VARCHAR(225),password VARCHAR(225))")
            ,()=>{
                console.log("tbl")
            },
            error((e)=>{
                console.log("error"+e)
            })
           
        })
        // const query=`INSERT INTO signUp(email,username,password) VALUES('${data.email}','${data.userName}','${data.password}')`
        // return db.executeSql(query)

    }
    const fetchData=async()=>{
        
        try{
            console.log('insert')
           await db.transaction( async(tx)=>{
              await  tx.executeSql("INSERT INTO SignUp(email,username,password) VALUES(?,?,?)",
              [email,userName,password])
            })
            console.log('insert 1')
            navigation.navigate('Login')
        }catch(e){
            console.log("error"+e)
        }
    }
 
 
  return (
<NativeBaseProvider>
    <View style={style.container}>
       
            <View style={style.form}> 
                <VStack space={7}  w="75%" maxW="300px" mx="auto" mt="20%" style={{alignItems:'center',justifyContent:'center'}}>
                    <Input 
                        type='text' 
                        style={{ borderWidth:1,borderColor:'black'}} 
                        size="md" 
                        placeholder="userName" 
                        value={userName}
                        onChangeText={(e)=>{
                            setUserName(e)
                        }}

                     />
                    <Input 
                        type='text'
                        style={{ borderWidth:1,borderColor:'black'}} 
                        size="md" 
                        placeholder="email" 
                        value={email}
                        onChangeText={(e)=>{
                            setEmail(e)
                        }}
                    
                    />
                    <Input 
                        type='text'  
                        style={{borderWidth:1,borderColor:'black'}} 
                        size="md" 
                        placeholder="password" 
                        value={password}
                        onChangeText={(e)=>{
                            setPassword(e)
                        }}
                    />
                    <TouchableOpacity 
                        style={style.btn} 
                        onPress={(e)=>{
                            fetchData()
                          
                            // if(fetchData()){
                            //     // navigation.navigate('LoginScreen')
                            //     console.log("ok")
                            // }
                            
                        }}
                    >
                            <Text style={{fontWeight:'bold',color:'white'}}>Sign Up</Text>
                    </TouchableOpacity>
                   
                </VStack>

            </View>

       
        {/* <View style={style.form}>

        </View> */}
    </View>
    </NativeBaseProvider>
  )
}
const style = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:'center',
      alignItems:'center'
    },
   
    form:{
        position:'absolute',
    //     left:0,
    //     right:0,
    //     top:0,
    //     bottom:0,
    //   margin:'auto',
        
        height:'60%',
        backgroundColor: "#FFFFFF",
        borderWidth:1,
       
        borderRadius:10,
        width:'90%',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 10,
        elevation: 9,
    },
    btn:{
        alignItems:'center',
        justifyContent:'center',
        
        width:'60%',
        height:'20%',
    
        backgroundColor:'#008321',
        borderRadius:10
        
    },
    account:{
   //  marginTop:-10
    }
    
})