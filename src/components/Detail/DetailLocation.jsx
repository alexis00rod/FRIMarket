import { useGeo } from "../../hooks/useGeo"

export const DetailLocation = ({province,city}) => {
  const {provinces, cities} = useGeo(province)
  const handleProvince = provinces.find(e => e.id === province)
  const handleCity = cities.find(e => e.id === city)

  return (
    <p className='flex items-center gap-2 capitalize'>
      <span className='font-medium'>Ubicacion: </span>
      {handleProvince && handleProvince.nombre}, {handleCity && handleCity.nombre}
    </p>
  )
}
