export {}

declare global {
  namespace Express {
    export interface Request {
      cognitoId?: string | undefined
      userId?: string | undefined
      token?: string | undefined
    }
  }
}
