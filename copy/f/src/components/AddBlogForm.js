import React from 'react'

const AddBlogForm = 
({addBlog,title,author,url}) => (
    <div>
        <form onSubmit = {addBlog}>
            <div>
                title: <input {...title} />
            </div>
            <div>
                author: <input {...author} />
            </div>
            <div>
                url: <input {...url} />
            </div> 
            <button type = 'submit'>create</button>                      
        </form>
    </div>
)

export default AddBlogForm