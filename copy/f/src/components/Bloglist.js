import React from 'react'
import {useSelector} from 'react-redux'
import Blog from '../components/Blog'



const BlogList = ({user}) => {

    const blogs = useSelector(state => state.blogs)

    return (
        <div>
          {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
            <Blog key = {blog.id} blog = {blog} user = {user} />
          )}
        </div>
    )
}

export default BlogList
