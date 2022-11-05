


export const insertDataToStudentTable = async (db,data) =>{
    console.log('inserted' +db)
       
    const query = `INSERT INTO Student(email,firstName,lastName,contactNumber,parentName,parentContactNumber,parentEmail) VALUES ('${data.email}','${data.firstName}','${data.lastName}','${data.contactNumber}','${data.parentName}','${data.parentContactNumber}','${data.parentEmail}')`
    return  db.executeSql(query)
}
export const getAllDataFromStudent = async (db) =>{
    const students = [];
    const res =   await db.executeSql("SELECT * FROM Student")
    res.forEach(
       function(result){

           for(let i = 0; i < result.rows.length; i++){
                    students.push(result.rows.item(i));
                    console.log(result.rows.item(i))
           } 

       }
    );
  
    return students;

}