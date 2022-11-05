export const insertDataToEducationTable = async (db,data) =>{
    console.log('inserted====================+++++++++' +db)
       
    const query = `INSERT INTO Education(studentEmail,qualification,instituteName,startedDate,endDate,grade) VALUES ('${data.studentEmail}','${data.qualification}','${data.instituteName}','${data.startedDate}','${data.endDate}','${data.grade}')`
    console.log('retun')
    return  db.executeSql(query)
}
export const getAllDataFromEducation = async (db) =>{
    const education = [];
    const res =   await db.executeSql("SELECT * FROM Education")
    res.forEach(
       function(result){

           for(let i = 0; i < result.rows.length; i++){
            education.push(result.rows.item(i));
                    console.log(result.rows.item(i))
           } 

       }
    );
  
    return education;

}
export const SearchData= async (db) =>{
    const search = [];
   
    const res =   await db.executeSql(`SELECT * FROM Education `)
    console.log('load====================')
    res.forEach(
       function(result){

           for(let i = 0; i < result.rows.length; i++){
            search.push(result.rows.item(i));
                    console.log(result.rows.item(i))
           } 

       }
    );
  
    return search;

}