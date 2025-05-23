const { validationResult } = require("express-validator");
const prisma = require("../prisma/client");

// Import fs
const fs = require("fs");
//import path
const path = require('path');

const findPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            select: {
                id: true,
                image: true,
                content: true,

            }, orderBy: {
                id: "desc",
            },
        })

        // send response
        res.status(200).send({
            success: true,
            message: "Get All posts successfully",
            data: posts
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        })
    }
}

// function create post
const createPost = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty) {
        return res.status(422).json({
            success: false,
            message: "Validation error"
        });
    }

    try {
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

    } catch (error) {

        console.error('Error creating user:', error);

        res.status(500).send({
            success: false,
            message: error,
        });
    }
}
// function findPostById

const findPostById = async (req, res) => {

    const { id } = req.params;

    try {

        const post = await prisma.post.findUnique({
            where: {
                id: Number(id),
            },
            select: {
                id: true,
                image: true,
                title: true,
                content: true
            }
        });

        //send response
        res.status(200).send({
            success: true,
            message: `Get post By ID :${id}`,
            data: post,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
}

// function updatePost
const updatePost = async (req, res) => {

    const { id } = req.params;

    const errors = validationResult(req);

    if (!errors.isEmpty) {
        return res.status(422).json({
            success: false,
            message: "Validation Error",
            errors: errors.array(),
        })
    }

    try {

        const dataPost = {
            title: req.body.title,
            content: req.body.content,
            updatedAt: new Date()
        }

        if (req.file) {

            dataPost.image = req.file.filename;
            //get post by ID
            const post = await prisma.post.findUnique({
                where: {
                    id: Number(id),
                },
            });

            if (post && post.image) {
                // Bangun path lengkap ke file lama
                const oldImagePath = path.join(process.cwd(), 'uploads', post.image);

                // Hapus gambar lama jika file ada
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                } else {
                    console.log('File tidak ditemukan:', oldImagePath);
                }
            }
            //update post
            const postUpdate = await prisma.post.update({
                where: {
                    id: Number(id),
                },
                data: dataPost,
            });

            //send response
            res.status(200).send({
                success: true,
                message: 'Post updated successfully',
                data: postUpdate,
            });
        }
    } catch (error) {
        // console.error('Error creating user:', error);
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }};
    //function deletePost
const deletePost = async (req, res) => {

    //get ID from params
    const { id } = req.params;

    try {

        //delete post
        const post = await prisma.post.delete({
            where: {
                id: Number(id),
            },
        });

        if (post && post.image) {
            // Bangun path lengkap ke file lama
            const imagePath = path.join(process.cwd(), 'uploads', post.image);

            // Hapus gambar lama jika file ada
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            } else {
                console.log('File tidak ditemukan:', imagePath);
            }
        }

        //send response
        res.status(200).send({
            success: true,
            message: 'Post deleted successfully',
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }

};
module.exports = { findPosts, createPost, findPostById, updatePost,deletePost };