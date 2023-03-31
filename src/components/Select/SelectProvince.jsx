import { useGeo } from "../../hooks/useGeo"
import { Select, SelectItem } from "../index.js"

export const SelectProvince = ({label,selected, ...props}) => {
  const {provinces} = useGeo()

  return (
    <Select label={label} selected={selected === 'all' ? 'Todas las ubicaciones' : provinces.find(e => e.id === selected)?.nombre}>
      {label !== 'Provincia' && <SelectItem name='province' id='all' {...props} >Todas las ubicaciones</SelectItem>}
      {provinces.map(e => (
        <SelectItem key={e.id} name='province' id={e.id} {...props} >{e.nombre}</SelectItem>
      ))}
    </Select>
  )
}
