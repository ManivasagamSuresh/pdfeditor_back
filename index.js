const express = require("express")
const app = express();
const cors = require("cors");

const user = require("./Routes/User")

app.use(express.json())

// app.use(cors({
//     origin:"http://localhost:3000"
// }))

app.use(cors({
    origin:"https://rad-lamington-2d2845.netlify.app"
}))

app.use("/api",user)


app.listen(5000,()=>{
    console.log("connected")
});