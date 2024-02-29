import dayjs from 'dayjs'
import 'dayjs/locale/es'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
dayjs.locale("es")

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

let counter = 0
export const generateUniqueId = () => {
  counter++
  return `${Date.now().toString(16)}-${counter}`
}

export const formatPrice = (price) => {
  if (typeof price === 'number') {
    price = price.toString()
  }
  
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

export const formatNumber = (number) => {
  const numericString = number.replace(/[^\d,]/g, '').replace(/,/g, '.')
  const decimalIndex = numericString.indexOf('.')

  if (decimalIndex !== -1) {
    const formattedString = numericString.slice(0, decimalIndex + 3)
    return parseFloat(formattedString)
  }
  
  return parseFloat(numericString)
}

export const formatPhone = (phone) => phone.replace(/[^\d]/g, "")

export const formatCardNumber = (number) => {
  const digits = number.replace(/\D/g, '').slice(0, 16)

  const groups = digits.match(/(\d{1,4})/g)

  if (!groups || groups.length < 2) {
    return digits
  }

  return groups.join('-')
}

export const formatExpirationDate = (expiration) => {
  const digits = expiration.replace(/\D/g, '').slice(0, 4)

  const month = digits.slice(0, 2)
  const year = digits.slice(2, 4)

  return `${month}/${year}`
}

export const formatCvv = (code) => code.replace(/\D/g, '').slice(0, 3)

export const formatHideCardNumber = (number) => `****-****-****-${number.slice(-4)}`

export const formatDateFromNow = (date) => dayjs(date.toDate()).fromNow()

export const formatCapitalize = (txt) => txt.charAt(0).toUpperCase() + txt.slice(1) 

export const formatIdUser = (txt) => txt.toLowerCase().replace(/\s+/g, '').replace(/[^a-zA-Z0-9-_]/g, '')
