import axios from "axios"

export interface Credentials {
  Provider: string,
  externalClientId: string
  UserId: string
  externalUserName: string
  externalClientSecret: string
}

export const getCredentials = async (accessToken: string, provider: string): Promise<Credentials> => {
  const { data: { credentials } } = await axios.get(`${process.env.LAMBDA_URL}/credentials`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    params: { provider }
  })
  return credentials
}