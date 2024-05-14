import { CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider'
import { CognitoJwtVerifier } from 'aws-jwt-verify'
import { env } from '../config/env'

export const cognitoUtils = {
  getVerifier: () => {
    return CognitoJwtVerifier.create({
      userPoolId: env.COGNITO_USER_POOL_ID,
      tokenUse: 'access',
      clientId: env.COGNITO_CLIENT_ID,
    })
  },

  cognitoServiceProvider: () => {
    return new CognitoIdentityProvider({
      region: env.REGION,
    })
  },
}
