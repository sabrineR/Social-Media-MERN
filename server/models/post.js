const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
    posterId:{ 
        type: String,
          required :true   },
    message:{ 
        type: String,  
        required :true,
        //trim to remove the leading and trealing whitespace
        trim:true  
     },
    image:{ 
        type: String
    },
    likers:{
        type:[String],
        required :true,
    },
    comments :{
        type:[
            {
                commenterID:String,
                commenterPseudo:String,
                text:String,
                timestamp:Number
            }
        ],
        required:true
    }
},


//timestamps : manage createdAt and updetedAt of the post automatic
{
    timestamps :true
}
)
module.exports = Post = mongoose.model("post", postSchema);