const exp = require("express");
const entry = exp();
const mclient=require("mongodb").MongoClient;
const path=require('path');

const cors = require('cors');

entry.use(cors({ origin: 'http://localhost:3000' })); // Allow requests from localhost:3000 only


async function connectDB(){
    var client = await mclient.connect("mongodb+srv://rinku:Rinku%402002@cluster0.u9rsl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    var dbObj=client.db("major");
    var users=dbObj.collection("users");
    entry.set("users",users);
    
    entry.listen(4000, () => console.log("localhost:4000"));
}

connectDB()

entry.get("", (req, res) => res.send("Hello"))

entry.use("/users", require("./routes/users"));
entry.use("/certificate", require("./routes/certificate"));
