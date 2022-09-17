import axios from "axios"

export const getCredentials = async (accessToken: string, provider: string) => {
  const { data: { credentials } } = await axios.get(`${process.env.LAMBDA_URL}/credentials`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    params: { provider }
  })
  return credentials
}