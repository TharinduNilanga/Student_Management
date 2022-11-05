import { View, Text ,FlatList} from 'react-native'
import React ,{useState,useEffect}from 'react'
import {  NativeBaseProvider,VStack,Input, Flex,Button, FormControl } from 'native-base';
import {initDb,dbConnection} from '../db/db';
import {insertDataToStudentTable,getAllDataFromStudent} from '../db/StudentTable'


export default function loadStudents({navigation}) {
    const [posts, setPosts] = useState([]);
    useEffect(()=>{
       LoadAll();
        const init = async () =>{
            await initDb();
        }  
     
        init();
     
    },[])

    const LoadAll=async()=>{
        try {
            const db=await dbConnection();

            const students=await getAllDataFromStudent(db);

            setPosts(students);
        
          
        }catch(err){
            alert("error gettig from load data");
        }finally{
            // close connection
            db.close();
        }
    }

  return (
    <NativeBaseProvider>
    <View style={{padding:20}}>
     <FlatList
                data={posts}
                renderItem={({ item }) =>
              
                <View style={{borderWidth:4, marginBottom:'1%', padding:5}}>
                        {/* <Text style={{marginBottom:10,color:'black',fontWeight:'bold',fontSize:20}} >{item.regNo}</Text> */}
                         
                        <Text style={{marginTop:10,color:'black',fontWeight:'bold'}} >email : {item.email}</Text>
                        <Text style={{marginBottom:10,marginTop:10,color:'black',fontWeight:'bold'}} >First Name :  {item.firstName}</Text>
                        <Text style={{marginBottom:10,marginTop:10,color:'black',fontWeight:'bold'}} >Last Name :  {item.lastName}</Text>
                        <Text style={{marginBottom:10,marginTop:10,color:'black',fontWeight:'bold'}} >Contact :  {item.contactNumber}</Text>
                        <Text style={{marginBottom:10,marginTop:10,color:'black',fontWeight:'bold'}} >Parent Name :  {item.parentName}</Text>
                        <Text style={{marginBottom:10,marginTop:10,color:'black',fontWeight:'bold'}} >Parent Contact :  {item.parentContactNumber}</Text>
                        <Text style={{marginBottom:10,marginTop:10,color:'black',fontWeight:'bold'}} >Parent Email :  {item.parentEmail}</Text>
                       
                        <Button 
                        style={{marginTop:'3%'}} 
                        size="md" 
                        colorScheme={'info'}
                        onPress={()=> 
                          navigation.navigate('EducationalDetails',{obj:item})
                       }
                       
                        >
                        <Text style={{color:'white',fontWeight:'bold'}}>See More</Text>
                        </Button>
                              
                            {/* <Button
                              style={{height:48,backgroundColor:'#980007c0',alignItems:'center',justifyContent:'center'}}
                              variant='outline'
                              onPress={()=>{
                                console.log('ok')
                              }}
                            >
                            <Text style={{color:'white',fontWeight:'bold'}}>Edit</Text>
                            </Button>
                            <Button
                              style={{height:48,backgroundColor:'#595959c0',alignItems:'center',justifyContent:'center'}}
                              variant='outline'
                            >
                            <Text style={{color:'white',fontWeight:'bold'}}>See More</Text>
                            </Button> */}
                            
                        
                    {/* </TouchableOpacity> */}
                    </View>
                  
                }
            />
    </View>
    </NativeBaseProvider>
  )
}