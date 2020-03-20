
import React,{useState,useEffect} from 'react'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Button from './components/Button'
import Toggable from './components/Toggable'
import loginService from './services/login'
import blogService from './services/blogs'
import {useDispatch} from 'react-redux'
import {initialize} from './reducers/blogReducer'
import BlogForm from './components/BlogForm'
import BlogList from './components/Bloglist'

const App = () => {

  const [user,setUser] = useState(null)
  const [notify,setNotify] = useState(null)


  const blogFormRef = React.createRef()
  const loginFormRef = React.createRef()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialize())
  },[dispatch])

  useEffect(() => {
    const loggedUserJSON = 
    window.localStorage.getItem('loggedBlogappUser')

    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])



  const handleNotify = (message,color) => {

    setNotify({message: message,color: color})
    setTimeout(() => {
      setNotify(null)
    },5000)
  }


  const handleLogin = async (event) => {
    event.preventDefault()

    try {

      const user = await loginService
      .login(loginFormRef.current.credentials)

      window.localStorage.setItem('loggedBlogappUser',
      JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)      
    } catch (error) {
      handleNotify('wrong credentials','red')
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }



  if(user === null){

    return (
      <div>
        <h2>log in to application</h2>
        <Notification notify = {notify} />
        <LoginForm handleLogin = {handleLogin} ref = {loginFormRef} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in {<Button text = 'logout' 
        action = {handleLogout} />} 
      </p>
      <h3>create new</h3>

      <Toggable buttonLabel = 'new blog' ref = {blogFormRef}>
        <BlogForm blogFormRef = {blogFormRef} />
      </Toggable>

      <BlogList user = {user} />
    </div>
  )
}

export default App;
