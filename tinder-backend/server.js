import express from "express";
import mongoose from "mongoose";
import Cards from "./dbCards.js";
import cors from "cors";


const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(cors());

mongoose.connect("mongodb+srv://mernuser:user1@mernproject.iccbl.mongodb.net/TinderCLone?retryWrites=true&w=majority",{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then (()=>{
    console.log("Connection Successful");
}).catch(()=>{
    console.log("Connection Unsuccessful");

})


app.get("/", (req,res)=>
    res.status(200).send("Connected")
);
app.post("/tinder/cards",(req,res)=>{
    const dbCard = req.body;
    Cards.create(dbCard,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }
            else{
                res.status(201).send(data)
            }
        }
    )
})
app.get("/tinder/cards",(req,res)=>{

    Cards.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }
            else{
                res.status(201).send(data)
            }
        }
    )
})



app.listen(port,()=>{
    console.log(`server is connected at port :${port}`)
})
