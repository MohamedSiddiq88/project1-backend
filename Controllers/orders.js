import { ObjectId } from "bson";
import { client } from "../db.js";

export function getAllOrders() {
  return client
    .db("project1")
    .collection("order")
    .find()
    .toArray();
}

export function getOrderById(id) {
  return client
    .db("project1")
    .collection("order")
    .findOne({ _id: new ObjectId(id) });
}

export  async function createOrder(orderData) {
  const {productId,userId} = orderData;
  const existingOrder =  await client
  .db("project1")
  .collection("order")
  .findOne({ userId, productId });
  

// console.log(typeof productId);
  if(existingOrder){
    let updatedSubTotal = (existingOrder.quantity+1)*orderData.subTotal;
  // console.log("updatedSubTotal",updatedSubTotal)
    return client
    .db("project1")
    .collection("order")
    .findOneAndUpdate(
      {userId:userId,productId:productId},{ $inc: { quantity: 1 },$set:{subTotal:updatedSubTotal} });  
  }
  else{
    return client
    .db("project1")
    .collection("order")
    .insertOne(orderData);
  }

  
}

export function updateOrder(updatedData) {
  return client
    .db("project1")
    .collection("order")
    .findOneAndUpdate({ productId: updatedData.productId, userId:updatedData.userId }, { $set: {quantity:updatedData.quantity ,subTotal:updatedData.subTotal}});
}

export async function deleteOrder(id) {
  const result = await client
  .db("project1")
  .collection("order")
  .findOneAndDelete({ _id: new ObjectId(id)},{ projection: { _id: 0 }})
  return result
}
