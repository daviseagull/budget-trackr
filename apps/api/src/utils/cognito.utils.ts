import { CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider'
import { CognitoJwtVerifier } from 'aws-jwt-verify/cognito-verifier'
import crypto from 'crypto'
import { env } from '../config/env'

export const cognitoUtils = {
  provider: () => {
    return new CognitoIdentityProvider({
      region: env.REGION
    })
  },

  hashCognitoSecret: (username: string) => {
    return crypto
      .createHmac('SHA256', env.COGNITO_CLIENT_ID)
      .update(username + env.COGNITO_CLIENT_SECRET)
      .digest('base64')
  },

  getVerifier: () => {
    return CognitoJwtVerifier.create({
      userPoolId: env.COGNITO_USER_POOL_ID,
      tokenUse: 'access'
    })
  }
}
