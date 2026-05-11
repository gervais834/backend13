import db from './db.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()
 
export const getAllUsers= (req,res)=>{
    const sql="SELECT * FROM users";
 
    db.query(sql,(err,users)=>{
        if(err) return res.status(500).json({Error: `error : ${err.message}`});
        res.status(200).json({users})
        
    })
}

export const getUser= (req,res)=>{
    const {id}=req.params;
    if(!id) return res.status(400).json({Error: `id not set `});

    const sql="SELECT * FROM users where id=?";

    db.query(sql, [id],(err,user)=>{
        if(err) return res.status(500).json({Error:` error : ${err.message}`});
        res.status(200).json({user})
    })
}

export const insertUser=async(req,res)=>{
    const {username,email,password}=req.body;
    if(!username || !email || !password) return res.status(400).json({Error: "All fields are required"});
    
    const hashedPassword=await bcrypt.hash(password,10) ;
    const sql="INSERT INTO users(username,email,password) VALUES(?,?,?)";
    
    db.query(sql, [username,email,hashedPassword],(err)=>{
        if(err) return res.status(500).json({Error: `error ${err.message}`});

        res.status(201).json({Message: `User ${username} is registered successfully`})
    })
}

//login

export const login= (req,res)=>{
    const {username,password}=req.body;
    if(!username || !password) return res.status(400).json({Error:"All fields are required"})

    const sql="select * from users where username=?";
    db.query(sql, [username],async (err,users)=>{
        if(err) return res.status(500).json({Error: `error ${err.message}`});
        
        if(users.length === 0) return res.status(404).json({Error: "user not found"});
        
        const user=await users[0]
        
        const isMatch=await bcrypt.compare(password, user.password);

        if(!isMatch) return res.status(401).json({  Error: "wrong password"});

        const token=jwt.sign({id: user.id, username:user.username, email:user.email},process.env.JWT_SECRET,{expiresIn:"1h"});
        res.status(200).json({
            user: {id:user.id, username:user.username,email:user.email},
            token
        })
      
        

        
    })    
}

