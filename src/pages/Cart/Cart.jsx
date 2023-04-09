import { Link } from "react-router-dom"
import { Button, CartProductCard, Element, Loader, Main} from "../../components"
import { useCartContext } from "../../context/CartContext/CartContext"

export const Cart = () => {
  const {cartList, cartPriceTotal, cartQty, emptyCart} = useCartContext()

  if(!cartList && !cartPriceTotal && !cartQty) return <Loader />

  return (
    <Main flex='wrap'>
      {cartQty < 1
      ? <p className="box-header flex justify-center">Tu carrito esta vacio</p>
      : <>
          <Element flex='flex-col'>
            <div className="box-header box-header-underline flex items-center">
              <h2 className="grow text-lg font-medium">Carrito</h2>
              <Link to='/shop/all' className="btn btn-m btn-text btn-text-yellow">
                Volver a la tienda
              </Link>
            </div>
            <div className="box-body flex flex-col">
              {cartList.map(e => <CartProductCard key={e.id} product={e} />)}
            </div>
          </Element>
          <Element position='fixed bottom-0 left-0 lg:static' size='lg:max-w-sm' flex='lg:flex-col items-center'>
            <h3 className="box-header flex flex-col items-center text-lg font-medium">
              Total carrito
              <span className="text-2xl text-yellow-500">${cartPriceTotal}</span>
            </h3>
            <div className="box-body flex flex-col items-center gap-2">
              <Link to='/checkout' className="btn btn-green btn-l">
                <i className="fa-solid fa-check"></i>
                <span className="text-sm">Ir a pagar</span>
              </Link>
              <Button icon='trash' color='btn-red' size='btn-l' onClick={() => emptyCart()}>
                <span className="text-sm">Vaciar carrito</span>
              </Button>
            </div>
          </Element>
        </>}
    </Main>
  )
}
