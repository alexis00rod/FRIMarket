import { Link } from "react-router-dom"

export const BtnCart = ({qty}) => {
  return (
    <Link to='/cart' className="btn-cart">
      <i className="fa-solid fa-cart-shopping"></i>
      {qty !== 0 && <span className="btn-cart-counter">{qty}</span>}
    </Link>
  )
}
