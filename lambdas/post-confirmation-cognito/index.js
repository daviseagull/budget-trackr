// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios')

module.exports.handler = async (event) => {
  if (!event.request.userAttributes) return

  const userAttributes = event.request.userAttributes

  const user = {
    cognitoId: userAttributes.sub,
    email: userAttributes.email,
    name: {
      first: userAttributes.given_name,
      last: userAttributes.family_name,
    },
    phone: userAttributes.phone_number,
  }

  await axios
    .post(`${process.env.API_URL}/api/v1/users`, user)
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })

  return event
}
