export const insertDataToSignUpTable = async (db,data) =>{
    console.log('inserted' +db)
       
    const query = `INSERT INTO SignUP(email,userName,password) VALUES ('${data.email}','${data.userName}','${data.password}')`
    return  db.executeSql(query)
}
export const getAllDataFromSignUp = async (db) =>{
    const signUp = [];
    const res =   await db.executeSql("SELECT * FROM SignUP")
    res.forEach(
       function(result){

           for(let i = 0; i < result.rows.length; i++){
            signUp.push(result.rows.item(i));
                    console.log(result.rows.item(i))
           } 

       }
    );
  
    return signUp;

}