
import React,{useImperativeHandle} from 'react'
import {useField} from '../hooks'

const LoginForm = React.forwardRef(({handleLogin},ref) => {

    const username = useField('text')
    const password = useField('password')

    const credentials = {
        username: username.value,
        password: password.value
    }

    useImperativeHandle(ref,() => {
        return {credentials}
    })

    return(
    <div>
        <form onSubmit = {handleLogin}>

            <div>
                username <input {...username.input} />
            </div>
            <div>
                password <input {...password.input} />
            </div>

            <div>
                <button type = 'submit'>
                    login
                </button>
            </div>

        </form>
    </div>
    )
})

export default LoginForm