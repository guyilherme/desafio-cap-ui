import api from '../components/api'

export default {

  login(user) {
    let data = {
        grant_type: 'password',
        client_id: 2,
        client_secret: 'r94dpJxT6U7msQQa8f5sfJs1zMVtsnZ2wAuVZedm',
        username: user.email,
        password: user.password,
        scope: ''
      }
    return api.post('oauth/token', data)
      .then(response => {
        return response.data
      })
  },
}