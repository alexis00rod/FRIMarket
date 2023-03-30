import { Button } from "../Button/Button"

export const ProductsLayout = ({size,handle}) => {
  return (
    <div className="w-max px-2 flex items-center gap-2">
      <Button icon='table-cells' color={size === 's' ? 'btn-blue' : 'btn-white'} size='btn-s' onClick={() => handle('s')} />
      <Button icon='list' color={size === 'l' ? 'btn-blue' : 'btn-white'} size='btn-s' onClick={() => handle('l')} />
    </div>
  )
}
