import { View, Text,StyleSheet, TouchableOpacity } from 'react-native'
import React ,{useEffect, useState} from 'react'
import {  NativeBaseProvider,VStack,Input,Button,Flex } from 'native-base';
import { LogBox } from "react-native"
import DatePicker from 'react-native-date-picker'

import {initDb,dbConnection} from '../db/db';
import {insertDataToEducationTable,getAllDataFromEducation} from '../db/educationTable'

export default function education({route}) {
      LogBox.ignoreAllLogs(true)
    const [date, setDate] = useState(new Date())
    const [date1, setDate1] = useState(new Date())
    const [open, setOpen] = useState(false)

    const [studentEmail,setStudentEmail]=useState('');
    const [qualification,setQualification]=useState('');
    const [instituteName,setInstituteName]=useState('');
    const [startdate,setstartDate]=useState('')
    const [endDate,setEndDate]=useState('')
    const [grade,setGrade]=useState('');

    const [educationDetail,seteducationDetail] = useState([])
    

    const educationDetailsOfStudent={
      studentEmail:studentEmail,
      qualification:qualification,
      instituteName:instituteName,
      startedDate:startdate,
      endDate:endDate,
      grade:grade
    }
    useEffect(()=>{ 
     // console.log(route.params.obj)
      setStudentEmail('ovindu@gmail.com')
      getAllEducations();
     // console.log(route.params.obj.email)
     const init = async () =>{
      await initDb();
     }  

     init();

    },[])

    const saveEducationData= async()=>{
      try {
          const db=await dbConnection();
          console.log("db connection ===================================================="+db)
         
          const save=await insertDataToEducationTable(db,educationDetailsOfStudent);
          console.log('==============================================================================')
          
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
  const getAllEducations=async()=>{
      try {
          const db=await dbConnection();

          const education=await getAllDataFromEducation(db);

          seteducationDetail(education);
          console.log(educationDetail)
        
      }catch(err){
          alert("error gettig from education tbl");
      }finally{
          // close connection
          db.close();
      }
  }
  const  fetchDataEducation=()=>{
    saveEducationData();
    //getAllEducations();
    //navigation.navigate('studentEmail',{obj:studentEmail})
  }

   
  return (
    <NativeBaseProvider>
    <View style={style.container}>
      <View style={style.body} >
        <VStack space={9}  w="75%" maxW="300px" mx="auto" mt="20%" style={{alignItems:'center',justifyContent:'center'}}>
        <Input
            type='email'
            placeholder='Student Email'
            size="md" 
            value={studentEmail}
            onChangeText={(e)=>{
              setStudentEmail(e)
            }}
              
            />
             <Input
            type='text'
            placeholder='Qualification'
            size="md" 
            value={qualification}
            onChangeText={(e)=>{
              setQualification(e)
            }}
              
            />
            <Input
            type='text'
            placeholder='Institute Name'
            size='md'
            value={instituteName}
            onChangeText={(e)=>{
              setInstituteName(e)
            }}
            />
          
            <Flex style={{width:300,height:50,flexDirection:'row'}}>
                      <Flex style={style.imagepicker1}>
                        <Input 
                          type='text' 
                          style={{ borderWidth:1,borderColor:'black'}} 
                          size="md" 
                          placeholder="Start Date"
                          value={startdate}
                          onChangeText={(e)=>{
                            setstartDate(e)
                          
                          }}
                          />
                        </Flex>
                        <Flex  
                        style={style.imagepicker1} 
                        flexDirection='row'>
                           <Button 
                              style={{width:'100%',height:48,backgroundColor:'#168BFB',alignItems:'center',justifyContent:'center'}} 
                              title="Open" 
                              onPress={() => setOpen(true)} 
                              variant='subtle' 
                            > 
                                <Text style={{color:'white',fontWeight:'bold'}}>Date</Text>
                            </Button>
                            <DatePicker
                                  modal
                                  open={open}
                                  date={date}
                                  onConfirm={(date) => {
                                   
                                    setDate(date)
                                    setOpen(false)

                                  setstartDate(
                                    date.getFullYear()
                                    + "-" +
                                    (date.getMonth()+1)
                                     + "-" +
                                     date.getDate()
                                  )
                                    
                                  }}
                                  onCancel={() => {
                                    setOpen(false)
                                  }}
                              />
                           
                           </Flex>                                     
                        </Flex>
                        <Flex style={{width:300,height:50,flexDirection:'row'}}>
                      <Flex style={style.imagepicker1}>
                        <Input 
                          type='text' 
                          style={{ borderWidth:1,borderColor:'black'}} 
                          size="md" 
                          placeholder="End Date"
                          value={endDate}
                          onChangeText={(e)=>{
                            setEndDate(e)
                          
                          }}
                          />
                        </Flex>
                        <Flex  
                        style={style.imagepicker1} 
                        flexDirection='row'>
                           <Button 
                              style={{width:'100%',height:48,backgroundColor:'#168BFB',alignItems:'center',justifyContent:'center'}} 
                              title="Open" 
                              onPress={() => setOpen(true)} 
                              variant='subtle' 
                            > 
                                <Text style={{color:'white',fontWeight:'bold'}}>Date</Text>
                            </Button>
                            <DatePicker
                                  modal
                                  open={open}
                                  date={date1}
                                  onConfirm={(date) => {
                                   
                                    setDate1(date)
                                    setOpen(false)

                                  setEndDate(
                                    date.getFullYear()
                                    + "-" +
                                    (date.getMonth()+1)
                                     + "-" +
                                     date.getDate()
                                  )
                                    
                                  }}
                                  onCancel={() => {
                                    setOpen(false)
                                  }}
                              />
                           
                           </Flex>                                     
                        </Flex>
  
                        <Input
                         type='text'
                         placeholder='Grade'
                         size='md'
                         value={grade}
                         onChangeText={(e)=>{
                           setGrade(e)
                         }}
                        />
                        <TouchableOpacity
                        style={style.btn}
                        onPress={fetchDataEducation}
                        >
                            <Text style={{color:'white',fontWeight:"bold"}}>Add Details</Text>
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
    imagepicker1:{
        width:'50%',
        height:'10%',
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