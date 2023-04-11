import { Select, SelectItem } from '../index.js'

export const SelectReviewsSort = ({selected, ...props}) => {
  const options = [
    {id:'highRating',title:'Calificacion: mas alta'},
    {id:'lowRating',title:'Calificacion: mas baja'},
    {id:'new',title:'Mas nuevos'},
    {id:'old',title:'Mas antiguos'},
  ]

  return (
    <Select label='Ordernar por' selected={options.find(e => e.id === selected).title}>
      {options.map(e => <SelectItem key={e.id} name='reviewsSort' id={e.id} {...props} >{e.title}</SelectItem>)}
    </Select>
  )
}
