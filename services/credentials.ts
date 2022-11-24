import axios from "axios"
import Cookies from "js-cookie"

export const getCredentials = async (provider: string) => {
  const { data: { hasCredentials } } = await axios.get('/api/credentials', {
    params: { provider }
  })
  return hasCredentials
}