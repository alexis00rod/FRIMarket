import { useState, useEffect } from 'react'
import { getCities, getProvinces } from '../services/locations'

export const useGeo = (province) => {
  const [provinces, setProvinces] = useState([])
  const [cities, setCities] = useState([])

  useEffect(() => {
    getProvinces().then(resp => setProvinces(resp))
  },[])

  useEffect(() => {
    getCities(province).then(resp => setCities(resp))
  },[province])

  return {provinces, cities}
}
