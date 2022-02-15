import { Tweets } from "./tweets"

export class User {
    firstName:String
    lastName:String
    userId:String
    password:String
    email:String
    contactNumber:String
    tweets:Tweets[]
    constructor(firstName:String,lastName:String,userId:String,password:String,email:String,contactNumber:String,tweets:Tweets[]){
        this.firstName=firstName;
        this.lastName=lastName;
        this.userId=userId;
        this.password=password;
        this.email=email;
        this.contactNumber=contactNumber;
        this.tweets=tweets;
    }
}
