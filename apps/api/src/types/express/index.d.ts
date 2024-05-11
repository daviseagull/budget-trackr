export {}

declare global {
  namespace Express {
    export interface Request {
      user?: string | undefined
      token?: string | undefined
    }
  }
}
