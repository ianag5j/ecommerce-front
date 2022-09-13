import axios from 'axios'
import Cookies from 'js-cookie';

export const signIn = async (userName, password) => {
  try {
    const { data } = await axios.post('/api/login', { userName, password })
    Cookies.set('sess', data.accessToken, {
      expires: data.payload.exp
    })
    return data
  } catch (error) {
    throw error
  }
}