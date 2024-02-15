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

export const formatPrice = (price) => {
  price = price.replace(/[^\d,]/g, "")
  let parts = price.split(",")
  if (parts[0] === "" && parts[1] !== undefined && parts[1] !== "") {
    parts[0] = "0"
  }
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  if (parts[1] && parts[1].length > 2) {
    parts[1] = parts[1].slice(0, 2)
  }
  return parts.join(",")
}

export const formatPhone = (phone) => phone.replace(/[^\d]/g, "")