import { client } from "../db.js";
import  jwt  from "jsonwebtoken";

export function  addUsers(userInfo){
    return client
    .db("project1")
    .collection("users")
    .insertOne(userInfo)
}

export function  getUser(userEmail){
    return client
    .db("project1")
    .collection("users")
    .findOne({email:userEmail})
}

export function  generateJwtToken(id){
    return jwt.sign({id}, process.env.SECRETKEY, {expiresIn:"30d"})   
}

export function addRandomString(randomString,email){
    
    const existMail = client
    .db("project1")
    .collection("randomstring")
    .findOne({email:email})

    if(existMail){
        return client
        .db("project1")
        .collection("randomstring")
        .findOneAndUpdate({email:email},{$set:{randomString:randomString}})   
    }else{
        return client
        .db("project1")
        .collection("randomstring")
        .insertOne({
            randomString: randomString,
            email:email
          })
    }

    
}

export function  getRandom(randomString){
    return client
    .db("project1")
    .collection("randomstring")
    .findOne({randomString: randomString})
}

export function deleteRandomString(randomString){
     client
        .db("project1")
        .collection("randomstring")
        .deleteOne({ randomString: randomString });
}

export function updatePassword(email,password){
    return client
        .db("project1")
        .collection("users")
        .updateOne({ email: email }, { $set: { password: password } });
}