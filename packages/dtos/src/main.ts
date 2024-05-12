type Name = {
  first: string
  last: string
}

type Phone = {
  country: string
  areaCode: number
  number: number
}

export type SignUpRequest = {
  password: string
  email: string
  name: Name
  birthday: Date
  phone: Phone
}

export type SignInRequest = {
  email: string
  password: string
}

export type ConfirmUserRequest = {
  email: string
  code: string
}

export type ConfirmForgotPassword = {
  email: string
  code: string
  password: string
}
