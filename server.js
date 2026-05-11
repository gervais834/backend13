import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { getAllUsers,getUser,insertUser,login } from './users.js'
dotenv.config()

const app=express();
app.use(cors());
app.use(express.json());

app.get('/users',getAllUsers)
app.get('/users/:id',getUser)
app.post('/register',insertUser)
app.post('/login',login)

app.listen(process.env.PORT || 6000,()=>{
    console.log(`running on port ${process.env.PORT || 6000}`);
} )
