import axios from 'axios'
import createHttpError from 'http-errors'
import { env } from '../config/env'

export const authUseCases = {
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
}
