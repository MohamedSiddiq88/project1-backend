import {MongoClient} from "mongodb";
import Obj from "mongodb"
import dotenv from "dotenv"

// configure the envirenment.
dotenv.config()

const secretkey=process.env.SECRETKEY;
const MongoURL = `mongodb+srv://siddiq:${secretkey}@project1.dee1vi6.mongodb.net/?retryWrites=true&w=majority`;

async function createConnection(){
    const client=new MongoClient(MongoURL);
    await client.connect();
    console.log("connected successfully");
    return client;
}

export var ObjectId=Obj.ObjectId;
export const client=await createConnection();