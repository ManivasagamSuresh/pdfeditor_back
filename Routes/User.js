const express = require("express");
const { mongoConnect, closeConnection } = require("../mongoConnect");
const env = require("dotenv").config();
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/signup" ,async(req,res)=>{
   try {
    const db =await mongoConnect();
    const hash = await bcrypt.hash(req.body.password,10);
    req.body.password = hash;
    req.body.pdf=[];
    const user =await db.collection("users").insertOne(req.body);
    await closeConnection();
    res.status(201).send(user);
   } catch (error) {
    console.log(error);
   }  
})

router.post("/login",async(req,res)=>{
    try {
        const db = await mongoConnect();
        const user = await db.collection("users").findOne({email:req.body.email});
        if(user){
            const compare = await bcrypt.compare(req.body.password, user.password);
                if (compare) {
                    res.status(200).send("success");
                } else {
                    res.status(404).send("Invalid credential");        
                }
        }else{
            res.status(404).send("Invalid credential");
        }
    } catch (error) {
        console.log(error)
    }
})

router.post("/pdfadd",async(req,res)=>{
    try {
        const db = await mongoConnect();
        const pdf =await db.collection("pdf").insertOne(req.body);
        await closeConnection();
        res.status(201).send("pdf");
    } catch (error) {
        console.log(error)
    }
})


module.exports = router