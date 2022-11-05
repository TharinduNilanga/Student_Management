import { View, Text,ImageBackground ,StyleSheet,TouchableOpacity,Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import {  NativeBaseProvider,VStack,Input, } from 'native-base';
import {initDb,dbConnection} from '../db/db';
import {insertDataToSignUpTable,getAllDataFromSignUp} from '../db/SignUpTable'

export default function SignUp({navigation}) {
    const [userName,setUserName]= useState('')
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')

    const [SignUpDetail,setSignUpDetail] = useState([])

    useEffect(()=>{
        getAllUsers();
        const init = async () =>{
            await initDb();
           }  
      
           init();

    })
   
    const details={
        email:email,
        userName:userName,
        password:password
    }

    
    const saveSignUp= async()=>{
        try {
            const db=await dbConnection();
            console.log("db connection ===================================================="+db)
           
            const save=await insertDataToSignUpTable(db,details);
            console.log('================SignUp==============================================================')
            
             console.log(save)
             alert('save success')
            // getAllEducations();
            
        } catch (error) {
            alert("error inserting education data");
        }finally{
             // close connection
             db.close();
        }
    }
    const getAllUsers=async()=>{
        try {
            const db=await dbConnection();
  
            const education=await getAllDataFromSignUp(db);
  
            setSignUpDetail(education);
            console.log(SignUpDetail)
          
        }catch(err){
            alert("error gettig from education tbl");
        }finally{
            // close connection
            db.close();
        }
    }
    const saveUer=async()=>{
        saveSignUp();
        
      
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
                            saveUer();
                          
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