const express = require("express")
//onst bodyParser = require("body-parser")
const mongoose = require("mongoose")
const route  = require("./routes/route")
const app = express()

app.use(express.json());

mongoose.connect("mongodb+srv://stuti3007:w14E1dmx6wAE1h7i@cluster0.rrvbnsb.mongodb.net/auth-assign",{

})
.then(()=>console.log("mongodb is connected"))
.catch(err  => (console.log(err)))

app.use('/',route)

app.listen(process.env.PORT || 3000, function(){
    console.log("app is running on http://localhost:" + (process.env.PORT || 3000));
})
