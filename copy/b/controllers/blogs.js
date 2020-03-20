
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogRouter.get('/',(req,res) => {
    Blog.find({}).populate('user',{username: 1,name: 1})
    .then(blogs => {
        res.json(blogs.map(blog => blog.toJSON()))
    })
})

blogRouter.get('/:id',(req,res,next) => {

    Blog.findById(req.params.id)
    .then(person => {
        if(person){
            res.json(person.toJSON())
        }else{
            res.status(404).end()
        }
    })
    .catch(err => next(err))
})

blogRouter.delete('/:id',async (req,res,next) => {

    const token = req.token

    try {
        const decodedToken = jwt.verify(token,process.env.SECRET)

        if(!token || !decodedToken.id){
            return res.status(401).json({error: 'token missing or invalid'})
        }

        const blog = await Blog.findById(req.params.id)

        if(blog.user.toString() !== decodedToken.id.toString()){
            return res.status(401).json({error: 'invalid user'})
        }

        await Blog.findByIdAndDelete(req.params.id)

        res.status(204).end()


    } catch (error) {
        next(error)
    }
})

blogRouter.put('/:id',(req,res,next) => {

    Blog.findByIdAndUpdate(req.params.id,req.body,{new:true})
    .then(updated => {
        res.json(updated.toJSON())
    })
    .catch(err => next(err))
})

blogRouter.post('/',async (req,res,next) => {
    
    const body = req.body
    const token = req.token

    try {
        const decodedToken = jwt.verify(token,process.env.SECRET)

        if(!token || !decodedToken.id){
            return res.status(401).json({error: 'token missing or invalid'})
        }

        const user = await User.findById(decodedToken.id)

        const blog = new Blog({...body,user: user._id})        

        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        res.status(201).json(savedBlog.toJSON())
    } catch (error) {
        next(error)
    }
})


module.exports = blogRouter