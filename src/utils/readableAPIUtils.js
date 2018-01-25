const api = 'http://localhost:3001'

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8)

const headers = {
  Accept: 'application/json',
  Authorization: token
}

export const getCategories = () => {
  return fetch(`${api}/categories/`, { headers })
    .then(res => res.json())
    .then(data => data.categories)
}

export const getPostsFromCategory = category => {
  return fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())
    .then(data => data.posts)
}

export const getPosts = () => {
  return fetch(`${api}/posts`, { headers }).then(res => res.json())
  // .then(data => data.posts)
}
