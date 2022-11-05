
import {enablePromise,openDatabase} from 'react-native-sqlite-storage';

enablePromise(true)

export const dbConnection= async()=>{
    const db = await openDatabase({name:"studentManagementInstitute.db",location:'default'})
      return db;


}
export const studentTable=(db)=>{
    try{
        const query="CREATE TABLE IF NOT EXISTS Student (email VARCHAR(225) PRIMARY KEY,firstName VARCHAR(225),lastName VARCHAR(225),contactNumber VARCHAR(12),parentName VARCHAR(225),parentContactNumber VARCHAR(12),parentEmail VARCHAR(225))"
        // console.log("db created")
        return db.executeSql(query);
        
    }catch(e){
        alert("Error"+e)
    }
}
export const signUpTable=(db)=>{
    try{
        const query ="CREATE TABLE IF NOT EXISTS SignUP(email VARCHAR(225) PRIMARY KEY,userName VARCHAR(225),password VARCHAR(225))"
        return db.executeSql(query)
    }catch(e){
        console.log(e)
    }
}
export const Education=(db)=>{
    try{
        const query ="CREATE TABLE IF NOT EXISTS Education(Id INTEGER PRIMARY KEY AUTOINCREMENT,studentEmail VARCHAR(225)  ,qualification VARCHAR(225),instituteName VARCHAR(225),startedDate DATE,endDate DATE,grade INTEGER,FOREIGN KEY(studentEmail) REFERENCES  Student(email) )"
        return db.executeSql(query)
    }catch(e){
        console.log(e)
    }
}
export  const initDb = async () =>  {
    const db = await dbConnection();
    const x = await studentTable(db);
    const y=await signUpTable(db);
    const z=await Education(db);
    console.log(x,y,z,"  xcxccxcx \n",db);
    db.close();
}  