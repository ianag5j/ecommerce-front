import axios from 'axios'
import Cookies from 'js-cookie';

export const signIn = async (userName: string, password: string) => {
  try {
    const { data } = await axios.post('/api/login', { userName, password })
    Cookies.set('sess', data.accessToken, {
      expires: new Date(data.payload.exp * 1000)
    })
    return data
  } catch (error) {
    throw error
  }
}