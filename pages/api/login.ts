import { CognitoUserPool, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import type { NextApiRequest, NextApiResponse } from 'next'

interface LoginParams {
  userName: string
  password: string
}

interface LogedParams {
  accessToken: string
  payload: { [key: string]: any }
}

const login = ({ userName: Username, password: Password }: LoginParams): Promise<LogedParams> => (
  new Promise((resolve, reject) => {
    const userPool = new CognitoUserPool({
      UserPoolId: `${process.env.COGNITO_POOL_ID}`,
      ClientId: `${process.env.COGNITO_CLIENT_ID}`,
    });
    const authenticationDetails = new AuthenticationDetails({
      Username,
      Password
    });

    const cognitoUser = new CognitoUser({
      Username,
      Pool: userPool
    });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        resolve({ accessToken: result.getAccessToken().getJwtToken(), payload: result.getAccessToken().payload })
      },
      onFailure: (function (err) {
        reject(err)
      }),
      newPasswordRequired: (userAttributes, requiredAttributes) => {
        cognitoUser.completeNewPasswordChallenge('Test-123', {}, {
          onSuccess: function (result) {
            console.log('----- newPasswordRequired -----');
            console.log(result);
          },
          onFailure: (function (err) {
            console.log('----- failed change password -----');
            console.log(err);
          }),
        });
      }
    })
  })
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'POST') {
      return res.status(400).json({})
    }
    const { accessToken, payload } = await login(req.body)
    return res.status(200).json({ accessToken, payload });
  }
  catch (error) {
    res.status(500).json({ message: 'error create credencials' })
  }
}
