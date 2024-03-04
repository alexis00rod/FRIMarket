import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCheckoutContext } from "./context/CheckoutContext"
import { addCardToUser } from "../../services/user"
import { formatCardNumber, formatCvv, formatExpirationDate, formatHideCardNumber } from "../../services/format"
import { useProfile } from "../../hooks/useProfile"
import { ButtonLoader, InputNumber, InputRadio, InputText, Loader } from "../../components/"

export const CheckoutPayment = () => {
  const {checkoutOrder, setCheckoutOrder} = useCheckoutContext()
  const navigate = useNavigate()
  const {profile} = useProfile()
  const [addCard, setAddCard] = useState(false)
  const [cardToAdd, setCardToAdd] = useState()
  const [cardToAddLoader, setCardToAddLoader] = useState(false)

  const submitCheckoutPayment = e => {
    e.preventDefault()
    navigate('/checkout/confirm')
  }

  const submitAddCard = async e => {
    e.preventDefault()
    console.log(cardToAdd)
    setCardToAddLoader(true)
    setCardToAddLoader(true)
    try {
      const card = await addCardToUser(profile,cardToAdd)
      setCheckoutOrder({
        ...checkoutOrder,
        payment: card
      })
      navigate('/checkout/confirm')
      setCardToAddLoader(false)
    } catch (err) {
        alert(err)
        setCardToAddLoader(false)
    }
  }

  const handleCancelAddCard = () => {
    setAddCard(false)
    setCardToAdd()
  }

  if(!profile) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader />
      </div>
    )
  }

  return (
    <>
      <h3>Método de pago</h3>
      {addCard
      ? <>
          <div className="checkout-inputs">
            <div className="checkout-input">
              <InputText 
              label='Número de la tarjeta'
              size='input-m'
              id='cardNumber'
              name='cardNumber'
              value={cardToAdd?.cardNumber || ''}
              onChange={({target:{value}}) => setCardToAdd({...cardToAdd, cardNumber:formatCardNumber(value)})}
              />
            </div>
            <div className="checkout-input">
              <InputText
              label='Titular de la tarjeta'
              size='input-m'
              id='cardName'
              name='cardName'
              value={cardToAdd?.cardName || ''}
              onChange={({target:{value}}) => setCardToAdd({...cardToAdd, cardName:value.toUpperCase()})}
              />
            </div>
            <div className="checkout-input">
              <InputText
              label='Fecha de expiracíon'
              size='input-s'
              id='cardExpirationDate'
              name='cardExpirationDate'
              value={cardToAdd?.cardExpirationDate || ''}
              onChange={({target:{value}}) => setCardToAdd({...cardToAdd, cardExpirationDate:formatExpirationDate(value)})}
              />
            </div>
            <div className="checkout-input">
              <InputNumber 
              label='Código de seguridad'
              size='input-s'
              id='cardCvv'
              name='cardCvv'
              value={cardToAdd?.cardCvv || ''}
              onChange={({target:{value}}) => setCardToAdd({...cardToAdd, cardCvv:formatCvv(value)})}
              />
            </div>
          </div>
          <div className="checkout-buttons">
            {cardToAddLoader
            ? <ButtonLoader />
            : <button 
              className="btn btn-blue btn-m btn-text"
              onClick={submitAddCard}
              disabled={!cardToAdd?.cardNumber || !cardToAdd?.cardName || !cardToAdd?.cardExpirationDate || !cardToAdd?.cardCvv}
              >
                Agregar
              </button>}
            <button 
            className="btn btn-text-blue btn-m btn-text"
            onClick={handleCancelAddCard}
            >
              Cancelar
            </button>
          </div>
        </>
      : <>
          <div className="checkout-inputs gap-1 pb-4">
            {profile.cards.map(e => 
              <InputRadio
              key={e.idCard}
              name='card'
              id={e.idCard}
              checked={e.idCard === checkoutOrder.payment?.idCard}
              onChange={() => setCheckoutOrder({...checkoutOrder,payment: e})}
              >
                <div className="flex flex-col">
                  <p className="mb-1 font-medium">{formatHideCardNumber(e.cardNumber)}</p>
                  <p className="text-sm leading-4">Vencimiento: {e.cardExpirationDate}</p>
                </div>
              </InputRadio>)}
          </div>
          <div className="checkout-buttons">
            <button 
            className="btn btn-blue btn-m btn-text"
            disabled={!checkoutOrder.payment}
            onClick={submitCheckoutPayment}
            >
              Continuar
            </button>
            <button 
            className="btn btn-text-blue btn-m btn-text"
            onClick={() => setAddCard(true)}
            >
              Agregar tarjeta
            </button>
          </div>
        </>}
    </>
  )
}
