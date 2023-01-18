import axios from "axios"

const getStore = async (accessToken: string) => {
  const { data } = await axios.get(`${process.env.LAMBDA_URL}/v2/stores`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  return data
}

const createStore = async (storeName: string, accessToken: string) => {
  const { data } = await axios.post(`${process.env.LAMBDA_URL}/v2/store`, { name: storeName }, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  return data
}

export { getStore, createStore }