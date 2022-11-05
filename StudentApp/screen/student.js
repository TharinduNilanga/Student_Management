import { View, Text,StyleSheet ,TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import { LogBox } from "react-native"
import {  NativeBaseProvider,VStack,Input, } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import sqlite from 'react-native-sqlite-storage';
import { useEffect } from 'react';


import {initDb,dbConnection} from '../db/db';
import {insertDataToStudentTable,getAllDataFromStudent} from '../db/StudentTable'

export default function student({navigation}) {
    LogBox.ignoreAllLogs(true)
    const [Icolor,setIcolor]=useState(style.success)
    const [fcolor,setFcolor]=useState(style.success)
    const [lColor,setLColor]=useState(style.success)
    const [ccolor,setCColor]=useState(style.success)
    const [ecolor,seteColor]=useState(style.success)
    const [PNColor,setPNColor]=useState(style.success)
    const [PCColor,setPCColor]=useState(style.success)
    const [PEColor,setPEColor]=useState(style.success)

    const [studentId,setStudentId]=useState('')
    const [firstname,setFirstName]=useState('');
    const [lastName,setLastName]=useState('');
    const [contactNumber,setContactNumber]=useState('');
    const [email,setEmail]=useState('');
    const [parentName,setParentName]=useState('');
    const [ParentContact,setParentContact]=useState('');
    const [parentEmail,setParentEmail]=useState('');

    const [studentDetails,setStudentDetails] = useState([])

    useEffect(()=>{
        getAll();
        const init = async () =>{
            await initDb();
        }  
     
        init();
     
    },[])

    const studentdata={
        email:email,
        firstName:firstname,
        lastName:lastName,
        contactNumber:contactNumber,
        parentName:parentName,
        parentContactNumber:ParentContact,
        parentEmail:parentEmail
    }

    const saveData= async()=>{
       // navigation.navigate('education',{obj:email})
        try {
            const db=await dbConnection();
            console.log("db connection ===================================================="+db)
            const save=await insertDataToStudentTable(db,studentdata);
            alert('save success')
            getAll();
            navigation.navigate('education',{obj:email})
            console.log(save)
        } catch (error) {
            alert("error inserting student data");
        }finally{
             // close connection
             db.close();
        }
    }
    const getAll=async()=>{
        try {
            const db=await dbConnection();

            const students=await getAllDataFromStudent(db);

            setStudentDetails(students);
            console.log(studentDetails)
          
        }catch(err){
            alert("error gettig from student tbl");
        }finally{
            // close connection
            db.close();
        }
    }
    const  fetchData=()=>{
        saveData();
        
    }

    
    const validateText = (text) => {
       
        var e =/^[A-z]*$/;
       
         if( e.test(text)){
            return true;
         }
         return false;
      };
    const ValidateNumber = (num) => {
        var e =/^[0-9]{9}$/;
       
         if( e.test(num)){
            return true;
         }
         return false;
      };
    const validateEmail = (email) => {
        var e =/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
       
         if( e.test(email)){
            return true;
         }
         return false;
      };


    
  
    



  return (
    <NativeBaseProvider>
        <ScrollView>
    <View style={style.conatainer}>
        <View style={style.body}>
            <VStack space={7}  w="75%" maxW="300px" mx="auto" mt="20%" style={{alignItems:'center',justifyContent:'center'}}>
            <Input
                type='email'
                placeholder='Student Email'
                size="md" 
                style={ecolor}
                value={email}
                onChangeText={(e)=>{
                    setEmail(e)
                    if(validateEmail(email)){
                        console.log('ok')
                      seteColor(style.successText)
                       
                    }else{
                        console.log('fail')
                        seteColor(style.fail)
                    }
                }}
            />
            <Input
                type='text'
                placeholder='First Name'
                size="md" 
                style={fcolor}
                value={firstname}
                onChangeText={(e)=>{
                    setFirstName(e)
                    if(validateText(firstname)){
                        console.log('ok')
                      setFcolor(style.successText)
                       
                    }else{
                        console.log('fail')
                        setFcolor(style.fail)
                    }
                }}
            />
             <Input
                type='text'
                placeholder='Last Name'
                size="md" 
                style={lColor}
                value={lastName}
                onChangeText={(e)=>{
                    setLastName(e)
                    if(validateText(lastName)){
                        console.log('ok')
                      setLColor(style.successText)
                       
                    }else{
                        console.log('fail')
                        setLColor(style.fail)
                    }
                }}
            />
             <Input
                type='text'
                placeholder='Contact Number'
                size="md" 
                style={ccolor}
                value={contactNumber}
                onChangeText={(e)=>{
                    setContactNumber(e)
                    if(ValidateNumber(contactNumber)){
                        console.log('ok')
                      setCColor(style.successText)
                       
                    }else{
                        console.log('fail')
                        setCColor(style.fail)
                    }
                }}
            />
           
             <Input
                type='text'
                placeholder='Parent Name'
                size="md" 
                style={PNColor}
                value={parentName}
                onChangeText={(e)=>{
                    setParentName(e)
                    if(validateText(parentName)){
                        console.log('ok')
                      setPNColor(style.successText)
                       
                    }else{
                        console.log('fail')
                        setPNColor(style.fail)
                    }
                }}
            />
             <Input
                type='text'
                placeholder='Parent Contact Number'
                size="md" 
                style={PCColor}
                value={ParentContact}
                onChangeText={(e)=>{
                    setParentContact(e)
                    if(ValidateNumber(ParentContact)){
                        console.log('ok')
                      setPCColor(style.successText)
                       
                    }else{
                        console.log('fail')
                        setPCColor(style.fail)
                    }
                }}
            />
             <Input
                type='email'
                placeholder='Parent Email'
                size="md" 
                style={PEColor}
                value={parentEmail}
                onChangeText={(e)=>{
                    setParentEmail(e)
                    if(validateEmail(parentEmail)){
                        console.log('ok')
                      setPEColor(style.successText)
                       
                    }else{
                        console.log('fail')
                        setPEColor(style.fail)
                    }
                }}
            />

            <TouchableOpacity
              style={style.btn}
              onPress={fetchData}
            >
                <Text style={{color:'white',fontWeight:'bold'}}>Add Student</Text>
            </TouchableOpacity>
            </VStack>
        </View>
     
    </View>
    </ScrollView>
    </NativeBaseProvider>
  )
}
const style=StyleSheet.create({
    conatainer:{
        flex:1,
        justifyContent: "center",
        alignItems:'center',
    },
    body:{
       
        width:400,
        height:800,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 10,
        elevation: 9,
        backgroundColor: "#FFFFFF",
        borderWidth:1,
        borderRadius:10,
        marginTop:'15%'
      
    },
    success:{
        borderWidth:1,
        borderColor:'black'
    },
    successText:{
        borderWidth:1,
        borderColor:'green'
    },
    fail:{
        borderWidth:1,
        borderColor:'red'
    },

    btn:{
        alignItems:'center',
        justifyContent:'center',
        
        width:'50%',
        height:'10%',
    
        backgroundColor:'green',
        borderRadius:10
        
    }
  
})