const express = require("express");
const app = express(); // to run express
const cors = require('cors');
const pg = require("pg");


app.use(cors())
app.use(express.json())

app.get("/", (req,res) => {
    res.json("Working")
})


app.listen(4000, () => 
    {
        console.log("Listening on port 4000",);
    }
)