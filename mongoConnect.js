const mongodb = require("mongodb");
const env = require("dotenv").config();
const url = process.env.url;
const mongoclient =new mongodb.MongoClient(url);

let db;
let connect;

const mongoConnect = async()=>{
    try {
        const connect =await mongoclient.connect();
    const db = connect.db("pdfEditor");
    return db;
    } catch (error) {
        console.log(error);
    }

}

const closeConnection =async()=>{
    try {
        if(connect){
            await connect.close();
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {mongoConnect,closeConnection,db,connect}