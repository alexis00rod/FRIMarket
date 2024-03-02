export const InputPrice = ({...props}) => {
  return (
    <div className="input-price">
      <span>$</span>
      <input type="text"{...props}/>
    </div>
  )
}
