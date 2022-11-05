import { View, Text ,FlatList} from 'react-native'
import React ,{useState,useEffect}from 'react'
import {  NativeBaseProvider,VStack,Input, Flex,Button, FormControl } from 'native-base';
import {initDb,dbConnection} from '../db/db';
import {SearchData} from '../db/educationTable'

export default function studentEducationalDeatails({route}) {
    const [posts, setPosts] = useState([]);
    const [email,setEmail]=useState('')

    useEffect(()=>{
        const student=route.params.obj;
        setEmail(student.email)
         const init = async () =>{
             await initDb();
         }  
      
         init();
         search();
      
     },[])

     const search=()=>{
        LoadAll();
        for (const s of posts) {
            if(email==s.studentEmail){
              setPosts(posts)
            }else{
              alert('Not Found')
            }
            
          }
     }

    const LoadAll=async()=>{
        try {
            const db=await dbConnection();

            const students=await SearchData(db);

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
                         
                        
                        <Text style={{marginBottom:10,marginTop:10,color:'black',fontWeight:'bold'}} >Student Email:  {item.studentEmail}</Text>
                        <Text style={{marginBottom:10,marginTop:10,color:'black',fontWeight:'bold'}} >Qualification  :  {item.qualification}</Text>
                        <Text style={{marginBottom:10,marginTop:10,color:'black',fontWeight:'bold'}} >Institute :  {item.institute}</Text>
                        <Text style={{marginBottom:10,marginTop:10,color:'black',fontWeight:'bold'}} >started Date:  {item.startedDate}</Text>
                        <Text style={{marginBottom:10,marginTop:10,color:'black',fontWeight:'bold'}} >End Date :  {item.endDate}</Text>
                        <Text style={{marginBottom:10,marginTop:10,color:'black',fontWeight:'bold'}} >Grade :  {item.grade}</Text>
                       
                        {/* <Button 
                        style={{marginTop:'3%'}} 
                        size="md" 
                        colorScheme={'info'}
                        onPress={()=> 
                          navigation.navigate('MoreDetails',{obj:item})
                       }
                       
                        >
                        <Text style={{color:'white',fontWeight:'bold'}}>See More</Text>
                        </Button> */}
                              
                          
                    </View>
                  
                }
            />
    </View>
    </NativeBaseProvider>
  )
}