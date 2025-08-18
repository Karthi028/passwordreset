const express = require('express')

const app = express();

app.get('/',(req,res)=>{
    res.json({message:"hello world!!"})
})

app.listen(3000,()=>{
    console.log("server runs on http://localhost:3000")
})