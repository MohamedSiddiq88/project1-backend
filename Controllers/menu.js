import { ObjectId } from "bson";
import { client } from "../db.js";

export function getAllMenu() {
  return client.db("project1").collection("items").find().toArray();
}

export function getMenuById(id) {
  return client
    .db("project1")
    .collection("items")
    .findOne({ _id: new ObjectId(id) });
}

export function addMenu(menuItem) {
  return client.db("project1").collection("items").insertMany(menuItem);
}

export function updateMenu(id, updatedMenuItem) {
  return client
    .db("project1")
    .collection("items")
    .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: updatedMenuItem });
}

export function deleteAllMenu() {
  return client.db("project1").collection("items").deleteMany({});
}
