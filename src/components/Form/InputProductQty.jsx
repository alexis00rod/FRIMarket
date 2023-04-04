import { Button } from "../index.js"

export const InputProductQty = ({flex, qty, stock, left, right, ...props}) => {
  return (
    <div className={`input-qty ${flex}`}>
      <Button icon='minus' color='btn-gray' size='btn-s' onClick={left} disabled={qty <= 1} />
      <input type="number" name="productQty" id="productQty" value={qty} {...props}  />
      <Button icon='plus' color='btn-gray' size='btn-s' onClick={right} disabled={qty >= stock} />
    </div>
  )
}
