const api = 'http://localhost:3001'

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8)

const headers = {
  Accept: 'application/json',
  Authorization: token,
  'Content-Type': 'application/json'
}

// Categories
export const getCategories = () => {
  return fetch(`${api}/categories/`, { headers })
    .then(response => response.json())
    .then(data => data.categories)
}

export const getPostsFromCategory = category => {
  return fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())
    .then(data => data.posts)
}

// Posts
export const getPosts = () => {
  return fetch(`${api}/posts`, { headers }).then(res => res.json())
}

export const getPost = postId => {
  return fetch(`${api}/posts/${postId}`, { headers }).then(res => res.json())
}

export const addPost = post => {
  const body = JSON.stringify(post)

  return fetch(`${api}/posts/`, { method: 'POST', headers, body }).then(response => response.json())
}

export const editPost = post => {
  const body = JSON.stringify(post)

  return fetch(`${api}/posts/${post.id}`, { method: 'PUT', headers, body }).then(response =>
    response.json()
  )
}

// Comments
export const getCommentsFromPost = postId => {
  return fetch(`${api}/posts/${postId}/comments`, { headers }).then(res => res.json())
}

export const addComment = comment => {
  const body = JSON.stringify(comment)

  return fetch(`${api}/comments/`, { method: 'POST', headers, body }).then(response =>
    response.json()
  )
}
