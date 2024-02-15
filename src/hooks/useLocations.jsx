import { useEffect, useState } from "react"
import { getLocations } from "../services/locations"

export const useLocations = () => {
  const [locations, setLocations] = useState()

  useEffect(() => {
    getLocations()
    .then(resp => setLocations(resp.map(e => ({
      idProvince: e.data().idProvince,
      nameProvince: e.data().nameProvince,
      cities: e.data().cities
    }))))
  },[])

  return {locations}
}
