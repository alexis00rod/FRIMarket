import { Link } from "react-router-dom"
import { useNavbarContext } from "../../context/NavbarContext/NavbarContext"

export const BtnCart = ({qty}) => {
  const {closeMenu} = useNavbarContext()

  return (
    <Link to='/cart' className="btn-cart" onClick={() => closeMenu()}>
      <i className="fa-solid fa-cart-shopping"></i>
      {qty !== 0 && <span className="btn-cart-counter">{qty}</span>}
    </Link>
  )
}
