import { Select, SelectItem } from '../index.js'

export const SelectSellersSort = ({selected, ...props}) => {
  const options = [
    {id:'new',title: 'Mas nuevos'},
    {id:'old',title: 'Mas antiguos'},
    {id:'posts',title: 'Mas publicaciones'},
    {id:'sales',title: 'Mas ventas'},
  ]

  return (
    <Select label='Ordenar por' selected={options.find(e => e.id === selected).title} >
      {options.map(e => <SelectItem key={e.id} name='sellersSort' id={e.id} {...props}>{e.title}</SelectItem>)}
    </Select>
  )
}
