import { useGeo } from "../../hooks/useGeo"

export const DetailLocation = ({location}) => {
  const {provinces} = useGeo()
  const province = provinces.find(e => e.id === location)

  return (
    <p className='flex items-center gap-2 capitalize'>
      <span className='font-medium'>Ubicacion: </span>
      {province && province.nombre}
    </p>
  )
}
