import React from 'react'
import {useDispatch} from 'react-redux'
import {create} from '../reducers/blogReducer'
import {useField} from '../hooks/index'





const BlogForm = ({blogFormRef}) => {

    const title = useField('text')
    const author = useField('text')
    const url = useField('text')
    const dispatch = useDispatch()

    const addBlog = async (event) => {

        event.preventDefault()
    
        blogFormRef.current.toggleVisibility()
    
        const blogObject = {
          title: title.value,
          author: author.value,
          url: url.value
        }
        
        dispatch(create(blogObject))
        title.reset()
        author.reset()
        url.reset()         
    }

    return(

        <div>
            <form onSubmit = {addBlog}>
                <div>
                    title: <input {...title.input} />
                </div>
                <div>
                    author: <input {...author.input} />
                </div>
                <div>
                    url: <input {...url.input} />
                </div> 
                <button type = 'submit'>create</button>                      
            </form>
        </div>
    )
}







export default BlogForm