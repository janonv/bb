
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {

    if(blogs.length === 0){
        return 0
    }

    const likes = blogs.reduce((total,blog) => {
        return total + blog.likes
    },0)

    return likes
}

const favoriteBlog = (blogs) => {
    if(blogs.length === 0){
        return null
    }

    const copy = [...blogs]
    copy.sort((x,y) => (
        y.likes - x.likes
    ))

    return copy[0]
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}