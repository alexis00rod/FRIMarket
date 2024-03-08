export const InputStock = ({...props}) => {
  return (
    <div className="input-stock">
      <input type="number" {...props}/>
      <span>unidad</span>
    </div>
  )
}
