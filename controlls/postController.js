const postModel = require("../models/postModel")

const createPostController= async(req,res ) =>{
    try {
        const {title, description} =req.body
        if(!title || !description){
            return res.status(500).send({
                success:false,
                message:"Please Provide All Fields"
            })
        }
        console.log('start_Request');
        console.log(req);
        const post = await postModel({
            title,description,
            postedBy: req?.auth?._id
        }).save()
        res.status(201).send({
            success:true,
            message:"Post Created Successfully",
            post,
        })
        console.log(req)
    } catch (error) {
     console.log(error)
     res.status(500).send({
        success:false,
        message:"Error in Create Post Api",
        error,
     })        
    }
}






const getAllpostsController = async(req,res) =>{
    try {
        const posts = await postModel.find()
        .populate('postedBy',("_id name"))
        .sort({ createdAt: -1})
        res.status(200).send({
            success:true,
            message:"All posts Data",
            posts,
        })
    } catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error in Get All Posts Api",
        error
    })
    }
}

// get user post
const getUserPostsController = async (req,res) => {
    try {
        const UserPosts = await postModel.find({postedBy:req.auth._id})
        res.status(200).send({
            success:true,
            message:"User Posts",
            UserPosts,
        })
    } catch (error) {
     console.log(error)
     return res.status(500).send({
        success:false,
        message:"Error in User Post Api"
     })   
    }
}


//delet post

const deletPostController = async (req,res) => {
    try {
        const {id} = req.params
        await postModel.findByIdAndDelete({_id:id})
        res.status(200).send({
            success:true,
            message:"Your Post Has Been Deleted..!"
        })
    } catch (error) {
        console.log(error)
       res.status(500).send({
        success:false,
        message:"Error in Delete Post Api",
        error,
       })
    }
}




// update post
const updatePostController = async(req,res) => {
    try {
        const {title,description}=req.body
        //to get post data
        const post = await postModel.findById({_id:req.params.id})
        // validation

        if(!title || !description) {
            return res.status(500).send({
                success:false,
                message:"Please provide title or description...",
            })
        }
       
        const updatedPost = await postModel.findByIdAndUpdate({_id: req.params.id},{
            title:title || post?.title,
            description:description || post?.description
        },{new:true});
        res.status(200).send({
            success:true,
            message:"Post Updated Successfully",
            updatedPost,
        })

    } catch (error) {
    console.log(error)    
    res.status(500).send({
        success:false,
        message:"Error in Update Post",
        error
    })

    }
}





module.exports ={ createPostController,getAllpostsController, getUserPostsController,deletPostController,updatePostController}