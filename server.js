const expres=require("express");
const app=expres();
const cors=require('cors');
const morgan = require("morgan");
const dotenv=require('dotenv');
dotenv.config();
const connectDb  = require("./config/db");

app.use(cors());
app.use(expres.json());
app.use(morgan('dev'))


const PORT=process.env.PORT;

app.use('/api/v1/test',require('./routes/testRoute'))
app.use('/api/v1/auth',require('./routes/authRouter'))
app.use('/api/v1/user',require('./routes/userRouter'))
app.use('/api/v1/restaurent',require('./routes/restaurentRouter'))
app.use('/api/v1/category',require('./routes/categoryRouter'))
app.use('/api/v1/food',require('./routes/foodRouter'))
connectDb();
app.get("/",(req,res)=>
{
    return res.status(200).send(`<h1>Welcom to food app server</h1>`)
})
app.listen(PORT,(req,res)=>
{
    console.log("http://localhost:3000")
})