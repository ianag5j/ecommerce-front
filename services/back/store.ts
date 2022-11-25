import axios from "axios"

const getStore = (accessToken: string) => {
  return axios.get(`${process.env.LAMBDA_URL}/stores`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
    .then(({ data }) => {
      return data
    })
}

export { getStore }