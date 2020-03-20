import React from 'react'


const Notification = ({notify}) => {

    if(!notify){
        return null
    }

    const style = {
        color: notify.color,
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    return(
        <div style = {style}>
            {notify.message}
        </div>
    )
}

export default Notification