import { Select, SelectItem } from "../index.js"

export const SelectProductType = ({category, selected, ...props}) => {
  const {types} = category

  return (
    <Select label='Tipo' selected={selected}>
      {types.map((e,i) => <SelectItem key={i} name='type' id={e} {...props} >{e}</SelectItem>)}
    </Select>
  )
}
