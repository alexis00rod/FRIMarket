import { Select, SelectItem } from "./select"

export const SelectProductsSort = ({selected, ...props}) => {
  const options = [
    {id:'highPrice',title:'Precio: mas alto'},
    {id:'lowPrice',title:'Precio: mas bajo'},
    {id:'postDate',title:'Fecha de publicacion'},
  ]

  return (
    <Select label='Ordenar por' selected={options.find(e => e.id === selected).title} >
      {options.map(e => <SelectItem key={e.id} name='productsSort' id={e.id} {...props}>{e.title}</SelectItem>)}
    </Select>
  )
}
