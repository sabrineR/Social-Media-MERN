const Post = require("../models/Post");
const User = require("../models/User");


//create post : 
exports.createPost =async(req,res)=>{
    const newPost =  new Post({...req.body})
    try{
    const post = await newPost.save();
    //retour post :  res.status(210).json(post)
   res.status(210).json({
       msg:"Post added seccesufuly"
   })
    }
    catch(error){
        console.log(error);
        res.status(410).json({
            msg : "post add failed"
        })
    }
}

//get all post :
exports.getAllPost = (req,res)=>{
    Post.find()
.then((posts)=>res.send(posts))
.catch((err)=>res.send(err))
}

// get post by id 
exports.getPostByID=async(req,res)=>{
    let {_id}=req.params;
    try{
        const post = await Post.findById({_id})
        res.status(202).json(post);
    }
    catch(error){
      res.status(402).json({msg : "post not found"})
    }
}

//update Post
exports.updatePost=(req,res)=>{
    let {_id} =req.params;
     Post.findByIdAndUpdate({_id},{$set:{...req.body}})
    .then(()=>res.send("update post success"))
    .catch((err)=>res.send(err))
}
//DELETE 
exports.deletePost= (req,res)=>{
    let {_id} =req.params;
    Post.findByIdAndDelete({_id},(err,docs)=>{
        if(!err) res.send(docs);
    else console.log("delete error")
})}

//like post : 
exports.likePost = async(req,res)=>{
    let {_id}= req.params;
    //The $addToSet operator adds a value to an array unless the 
    // value is already present, in which case $addToSet 
    // does nothing to that array.rajoute elemt
    try{
    const post = await Post.findByIdAndUpdate({_id},
        { $addToSet: { likers: req.body.id}  },
       // new Optional. When true, returns the modified document 
       //  rather than the original. 
    { new : true },
    // (err,docs)=>{
    //     (!err)?res.send(docs):res.status(415).send(err);} 
    )
    post.save();

    res.status(215).json({
            msg:"like post seccesufuly"
        })
    }

    catch(error){
        console.log(error);
        // res.status(415).json({msg : "like post failed" }) }
    
    
    }}

// dislike post : 

exports.UnlikePost = async(req,res)=>{
    let {_id}= req.params;
    try{
    await Post.findByIdAndUpdate({_id},
        {
            //retirer element du tableau sans l ecraser 
             $pull: { likers: req.body.id} 
        },
       // new Optional. When true, returns the modified document 
//  rather than the original. 
    // { new : true },
    // (err,docs)=>{
    //     (!err)?res.send(docs):res.status(415).send(err);}
     )

        res.status(215).json({msg:"unlike post seccesufuly" })
    }
    catch(error){
        console.log(error);
        // res.status(415).json({
        //     msg : "unlike post failed"
        // })
    }
}
// create comment for post :
exports.addComment =async(req,res)=>{
let {_id}=req.params;
const { commenterID,commenterPseudo,text}=req.body;
try {
    await Post.findByIdAndUpdate({_id},
        {
            $push:{comments : {
                commenterID,
                commenterPseudo,
                text } } })
        res.status(220).json({msg:"comment success"})}
catch(error){
    console.log(error);
    res.status(420).json ({msg:"add comment failed"})}}

    // edit comment : 
exports.editComment =async (req,res)=>{
    let {_id}=req.params;
    try {
        await Post.findById({_id},(err,docs)=>{
                const currentComment=docs.comments.find((comment)=>
                comment._id.equals(req.body.commentId) )

                if(!currentComment) return res.status(404).json({msg:" comment not fond"})
                currentComment.text=req.body.text;
        
              return  docs.save((err)=>{
                  if(!err)return res.status(200).send(docs);
                  return res.status(500).send(err);
              });
        }
            )

    }
    catch(error){
        console.log(error);
        res.status(421).json ({msg:"edit comment failed"})}}

// delete comment:
        exports.deleteComment = async (req,res)=>{
            let {_id}=req.params;
            try{
                  await Post.findByIdAndUpdate({_id},
                    {
                        $pull:{
                            comments:{_id : req.body.commentId} }})
                    res.status(222).json({msg:"delete comment success"})
            }
            catch(error){
                console.log(error);
                res.status(422).json ({msg:"delete comment failed"})}}

        









// get By ID user
// exports.getPostByID = (req,res)=>{
//     Post.find({posterId})
//     .then((posts)=>res.send(posts))
//     .catch((err)=>res.send(err))

