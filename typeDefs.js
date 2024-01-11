import { gql } from "apollo-server-express";
import User from "./models/UserSchema.js";
const typeDefs=gql `

scalar Date
type User{
    id:ID,
    name:String,
    email:String,
 }


type Query{
    welcome:String
    getUsers:[User]  
    getUser(id:ID):User

   
}
type Mutation{
    addUser(name:String,email:String,password:String):User
    SignUser(email:String,password:String):User
    }
`
export default typeDefs