import React,{useState} from 'react'
import Button from './Button'
import {remove,update} from '../reducers/blogReducer'
import {useDispatch} from 'react-redux'


const Blog = ({blog,user}) => {

  const [show,setShow] = useState(false)
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async () => {

    const blogObject = {
      user: blog.user.id,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1
    }
    dispatch(update(blog.id,blogObject))
  }

  const handleDelete = () => {
    const res = window.confirm(`remove ${blog.title} by ${blog.author}`)
    if(!res){return}
    
    dispatch(remove(blog.id))
  
  }

//console.log(user.username,blog.user.username,user.username === blog.user.username)
  const showDelete =
   user.username === blog.user.username ? {display: ''}
  :  {display: 'none'}
   
  
  
  return(
    <div style = {blogStyle}>
      <div onClick = {() => setShow(!show)}>
        {blog.title} {blog.author}
      </div>
      <div style = {{display: show ? '' : 'none'}}>
        {blog.url}
        <div>
          {blog.likes} likes {<Button text = 'like' 
          action = {handleLike} />}
        </div>
        added by {blog.user.username}
        <div style = {showDelete} >
          <Button text = 'remove' action = {handleDelete} />
        </div>
      </div>
    </div>
  )
}
export default Blog