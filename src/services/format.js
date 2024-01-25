export const generateDisplayName = (user) => {
  const {name, lastName} = user

  const nameUser = `${name} ${lastName}`
  return nameUser.replace(/\b\w/g, (char) => char.toUpperCase());
}

export const generateIdUser = (user) => {
  const {name, lastName} = user

  const nameUser = `${name} ${lastName}`.replace(/\s/g, '')
  const id = ((Math.floor(Math.random() * 10000) + 1).toString())
  return (nameUser+id).toLowerCase()
}