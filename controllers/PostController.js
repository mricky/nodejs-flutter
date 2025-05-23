const { validationResult } = require("express-validator");
// const prisma = require("../prisma/client");


const { PrismaClient } = require('@prisma/client'); 
const prisma = new PrismaClient();

const findPosts = async (req,res) => {
    try {
        const posts = await prisma.post.findMany({
            select: {
                id: true,
                image:true,
                content:true,

            }, orderBy: {
                id: "desc",
            },
        })

        // send response
        res.status(200).send({
            success:true,
            message: "Get All posts successfully",
            data:posts
        })
    }catch(error){
       
        console.error('Error creating user:', error);
        res.status(500).send({
            success:false,
            message: error
        })
    }
}

// function create post
const createPost = async (req,res)=>{

    const errors = validationResult(req);

    if(!errors.isEmpty){
        return res.status(422).json({
            success:false,
            message: "Validation error"
        });
    }

    try{
        const post = await prisma.post.create({
            data: {
                image: req.file.filename,
                title: req.body.title,
                content: req.body.content,
            },
        });
        res.status(201).send({
            success: true,
            message: "Post created successfully",
            data: post,
        });

    }catch(error){
        
          console.error('Error creating user:', error);
            
           res.status(500).send({
            success: false,
            message: error,
        });
    }
}

module.exports = { findPosts,createPost };