import blogService from '../services/blogs'


const reducer = (state = [],action) => {

    switch (action.type) {
        case 'INIT':  
            return action.data
        case 'CREATE':
            return [...state,action.data]
        case 'REMOVE':
            return state.filter(b => b.id !== action.id)
        case 'UPDATE':
            return  state.map(b => 
                b.id !== action.data.id ? b : action.data)
        default:
            return state
    }
}


export const initialize = () => {

    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT',
            data: blogs
        })
    }
}

export const create = (data) => {
    return async (dispatch) => {
        const blog = await blogService.create(data)
        dispatch({
            type: 'CREATE',
            data: blog
        })
    }
}

export const remove = (id) => {
    return async (dispatch) => {
        await blogService.del(id)
        dispatch({
            type: 'REMOVE',
            id: id
        })
    }
}


export const update = (id,data) => {
    return async (dispatch) => {
        const blog = await blogService.update(id,data)
        dispatch({
            type: 'UPDATE',
            data: blog
        })
    }
}



export default reducer