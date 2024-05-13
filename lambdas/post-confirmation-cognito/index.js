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

  console.log(`user ${user}`)

  return event
}
