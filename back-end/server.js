import express from 'express'
import cors from 'cors';
import 'dotenv/config'

//app config
const app = express();
const port = process.env.PORT || 4000;

// middle ware;
app.use(express.json());
app.use(cors());

//api end point 

app.get('/',(req,res)=>{
    res.send("API  Working")
});

app.listen(port, ()=> console.log("server Started",port));