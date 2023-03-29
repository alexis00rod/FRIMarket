import { useEffect, useState } from "react"
import { getLocation } from "../../services/locations"

export const DetailLocation = ({location}) => {
  const [productLocation, setProductLocation] = useState({})
  useEffect(() => {
    getLocation(location)
    .then(resp => setProductLocation(resp))
  },[location])

  return (
    <span className='text-sm text-gray-500'>{productLocation.nombre}, Argentina</span>
  )
}
