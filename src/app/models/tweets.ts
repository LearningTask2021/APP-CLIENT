

export class Tweets {
    tweetId:String
    tweetText:String
    createdAt:Date
    likes:number
    parentTweetId:String
    replies:Tweets[]
    showReplies:boolean=false;
    
    constructor(tweetId:String,tweetText:String,createdAt:Date,likes:number,parentTweetId:String,replies:Tweets[]){
        this.tweetId=tweetId
        this.tweetText=tweetText
        this.createdAt=createdAt
        this.likes=likes
        this.parentTweetId=parentTweetId
        this.replies=this.replies
    }

}
