import mysql2 from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const db=mysql2.createConnection({
    host:process.env.HOST_NAME,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE

})

db.connect(err =>{
    if(err){
        console.error(`error : ${err.message}`)
    }  else{
        console.log("connection successfully")
    }
    
    
})

export default db
