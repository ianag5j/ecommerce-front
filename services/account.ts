import axios from "axios"

export const getAccountData = (provider: string) => {
  return axios.get('/api/account', {
    params: { provider }
  }).then(({ data }) => {
    return data
  })
}