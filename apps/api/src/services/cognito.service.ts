import {
  AuthFlowType,
  CodeMismatchException,
  ExpiredCodeException,
  InvalidPasswordException,
  LimitExceededException,
  NotAuthorizedException,
  UserNotConfirmedException,
  UsernameExistsException
} from '@aws-sdk/client-cognito-identity-provider'
import { SignUpRequest } from '@budget-trackr/dtos'
import createHttpError from 'http-errors'
import { env } from '../config/env'
import { cognitoUtils } from '../utils/cognito.utils'

const getUserAttributes = (user: SignUpRequest) => {
  return [
    { Value: user.email, Name: 'email' },
    { Value: user.birthday.toString(), Name: 'birthdate' },
    { Value: `${user.name.first} ${user.name.last}`, Name: 'name' },
    { Value: user.name.first, Name: 'given_name' },
    { Value: user.name.last, Name: 'family_name' },
    {
      Value: `${user.phone.country}${user.phone.areaCode}${user.phone.number}`,
      Name: 'phone_number'
    }
  ]
}

export const cognitoService = {
  signIn: async (username: string, password: string) => {
    const params = {
      AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
      ClientId: env.COGNITO_CLIENT_ID,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
        SECRET_HASH: cognitoUtils.hashCognitoSecret(username)
      }
    }
    try {
      const data = await cognitoUtils.provider().initiateAuth(params)
      return {
        accessToken: data.AuthenticationResult!.AccessToken!,
        type: 'Bearer'
      }
    } catch (err) {
      if (err instanceof UserNotConfirmedException) {
        throw new createHttpError.BadRequest(`User ${username} isn't confirmed`)
      }
      if (err instanceof NotAuthorizedException) {
        throw new createHttpError.BadRequest('Invalid username or password')
      }

      if (err instanceof Error) {
        throw new createHttpError.InternalServerError(
          'Unknown error while trying to authenticate'
        )
      }

      throw new createHttpError.InternalServerError(
        'Unknown error while trying to authenticate'
      )
    }
  },

  signUp: async (user: SignUpRequest) => {
    const params = {
      ClientId: env.COGNITO_CLIENT_ID,
      Password: user.password,
      Username: user.email,
      SecretHash: cognitoUtils.hashCognitoSecret(user.email),
      UserAttributes: getUserAttributes(user)
    }

    try {
      const cognitoUser = await cognitoUtils.provider().signUp(params)

      return cognitoUser.UserSub!
    } catch (err) {
      if (err instanceof UsernameExistsException) {
        throw createHttpError.BadRequest(
          `User with email ${user.email} already exists`
        )
      }

      if (err instanceof InvalidPasswordException) {
        throw createHttpError.BadRequest(`Password is invalid`)
      }

      if (err instanceof Error) {
        throw new createHttpError.InternalServerError(
          `Unknown error while trying to create user in IAM`
        )
      }

      throw new createHttpError.InternalServerError(
        `Unknown error while trying to create user in IAM`
      )
    }
  },

  confirmUser: async (email: string, code: string) => {
    const params = {
      ClientId: env.COGNITO_CLIENT_ID,
      ConfirmationCode: code,
      Username: email,
      SecretHash: cognitoUtils.hashCognitoSecret(email)
    }
    try {
      await cognitoUtils.provider().confirmSignUp(params)
    } catch (err) {
      if (err instanceof ExpiredCodeException) {
        throw new createHttpError.BadRequest('Code has expired')
      }

      if (err instanceof CodeMismatchException) {
        throw new createHttpError.BadRequest(
          "Code doesn't match with what server was expecting"
        )
      }

      if (err instanceof Error) {
        throw new createHttpError.InternalServerError(
          'Unknown error while trying to confirm user'
        )
      }

      throw new createHttpError.InternalServerError(
        'Unknown error while trying to confirm user'
      )
    }
  },

  resendConfirmationCode: async (email: string) => {
    const params = {
      ClientId: env.COGNITO_CLIENT_ID,
      SecretHash: cognitoUtils.hashCognitoSecret(email),
      Username: email
    }
    try {
      await cognitoUtils.provider().resendConfirmationCode(params)
    } catch (err) {
      if (err instanceof LimitExceededException) {
        throw new createHttpError.InternalServerError(
          'Attempt limit exceeded, please try after some time'
        )
      }

      if (err instanceof Error) {
        throw new createHttpError.InternalServerError(
          'Unknown error while trying to resend confirmation code'
        )
      }

      throw new createHttpError.InternalServerError(
        'Unknown error while trying to resend confirmation code'
      )
    }
  },

  signOut: async (token: string) => {
    const params = {
      AccessToken: token
    }

    try {
      await cognitoUtils.provider().globalSignOut(params)
    } catch (err) {
      if (err instanceof Error) {
        throw new createHttpError.InternalServerError(
          'Unknown error while trying to resend confirmation code'
        )
      }

      throw new createHttpError.InternalServerError(
        'Unknown error while trying to resend confirmation code'
      )
    }
  },

  confirmResetPassword: async (
    email: string,
    code: string,
    password: string
  ) => {
    const params = {
      ClientId: env.COGNITO_CLIENT_ID,
      SecretHash: cognitoUtils.hashCognitoSecret(email),
      Username: email,
      ConfirmationCode: code,
      Password: password
    }

    try {
      await cognitoUtils.provider().confirmForgotPassword(params)
    } catch (err) {
      if (err instanceof Error) {
        throw new createHttpError.InternalServerError(
          'Unknown error while trying to resend confirmation code'
        )
      }

      throw new createHttpError.InternalServerError(
        'Unknown error while trying to resend confirmation code'
      )
    }
  },

  forgotPassword: async (email: string) => {
    const params = {
      ClientId: env.COGNITO_CLIENT_ID,
      SecretHash: cognitoUtils.hashCognitoSecret(email),
      Username: email
    }

    try {
      await cognitoUtils.provider().forgotPassword(params)
    } catch (err) {
      throw new createHttpError.InternalServerError(
        'Unknown error while trying to forgot password'
      )
    }
  }
}
