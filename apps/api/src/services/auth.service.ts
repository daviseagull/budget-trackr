import {
  AdminUpdateUserAttributesCommand,
  CognitoIdentityProviderClient,
  GlobalSignOutCommand,
  NotAuthorizedException,
  ResourceNotFoundException,
} from '@aws-sdk/client-cognito-identity-provider'
import axios from 'axios'
import createHttpError from 'http-errors'
import { env } from '../config/env'

export const authService = {
  signIn: async (code: string) => {
    const authorization = btoa(
      `${env.COGNITO_CLIENT_ID}:${env.COGNITO_CLIENT_SECRET}`
    )

    const response = axios
      .post(
        `${env.COGNITO_URL}/oauth2/token`,
        {
          grant_type: 'authorization_code',
          code,
          redirect_uri: env.APP_URL,
          client_id: env.COGNITO_CLIENT_ID,
          client_secret: env.COGNITO_CLIENT_SECRET,
        },
        {
          headers: {
            Authorization: `Basic ${authorization}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
      .then((data) => {
        return data.data
      })
      .catch(() => {
        throw new createHttpError.InternalServerError(
          'Unknown error while trying to log in'
        )
      })
    return response
  },

  updateIdAttribute: async (sub: string, id: string) => {
    try {
      const client = new CognitoIdentityProviderClient({})

      const input = {
        UserPoolId: env.COGNITO_USER_POOL_ID,
        Username: sub,
        UserAttributes: [
          {
            Name: 'custom:id',
            Value: id,
          },
        ],
      }

      const command = new AdminUpdateUserAttributesCommand(input)

      await client.send(command)
    } catch (err) {
      if (err instanceof ResourceNotFoundException) {
        throw new createHttpError.BadRequest("User doesn't exist in cognito")
      }
      throw new createHttpError.InternalServerError(
        'Unknown error while updating user in cognito.'
      )
    }
  },

  signOut: async (token: string) => {
    try {
      const client = new CognitoIdentityProviderClient({})

      const input = {
        AccessToken: token,
      }
      const command = new GlobalSignOutCommand(input)
      await client.send(command)
    } catch (err) {
      if (err instanceof NotAuthorizedException)
        throw new createHttpError.BadRequest(err.message)

      throw new createHttpError.InternalServerError(
        'Unknown error while revoking token.'
      )
    }
  },
}