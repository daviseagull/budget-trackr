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
