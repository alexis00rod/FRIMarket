import { InputNumber, InputText } from "../../../components"
import { formatCardNumber, formatCvv, formatExpirationDate } from "../../../services/format"
import { useCheckoutContext } from "../context/CheckoutContext"

export const CheckoutCard = () => {
  const {checkoutOrder, setCheckoutOrder, checkoutOrderError} = useCheckoutContext()

  return (
    <>
      {/* Numero de la tarjeta */}
      <div className="relative mt-6 mb-1 5">
        <InputText
        label='Número de la tarjeta'
        size='input-m'
        id='cardNumber'
        name='cardNumber'
        value={checkoutOrder.payment?.cardNumber || ''}
        onChange={({target:{value}}) => setCheckoutOrder({...checkoutOrder, payment: {...checkoutOrder.payment,cardNumber: formatCardNumber(value)}})}
        />
        {checkoutOrderError.includes('cardNumber') &&
          <p className="top-full left-2 absolute w-max pt-0.5 flex items-center text-[0.8rem] text-red-500">
            <i className="fa-solid fa-circle-exclamation"></i>
            <span className="pl-2 font-medium">Completá este dato.</span>
          </p>}
      </div>
      {/* Titular de la tarjeta */}
      <div className="relative mt-6 mb-1 5">
        <InputText
        label='Titular de la tarjeta'
        size='input-m'
        id='cardName'
        name='cardName'
        value={checkoutOrder.payment?.cardName || ''}
        onChange={({target:{value}}) => setCheckoutOrder({...checkoutOrder, payment: {...checkoutOrder.payment,cardName: value.toUpperCase()}})}
        />
        {checkoutOrderError.includes('cardName') &&
          <p className="top-full left-2 absolute w-max pt-0.5 flex items-center text-[0.8rem] text-red-500">
            <i className="fa-solid fa-circle-exclamation"></i>
            <span className="pl-2 font-medium">Completá este dato.</span>
          </p>}
      </div>
      {/* Fecha de expiracion */}
      <div className="relative mt-6 mb-1 5">
        <InputText
        label='Fecha de expiracíon'
        size='input-s'
        id='cardExpirationDate'
        name='cardExpirationDate'
        value={checkoutOrder.payment?.cardExpirationDate || ''}
        onChange={({target:{value}}) => setCheckoutOrder({...checkoutOrder, payment: {...checkoutOrder.payment,cardExpirationDate: formatExpirationDate(value)}})}
        />
        {checkoutOrderError.includes('cardExpirationDate') &&
          <p className="top-full left-2 absolute w-max pt-0.5 flex items-center text-[0.8rem] text-red-500">
            <i className="fa-solid fa-circle-exclamation"></i>
            <span className="pl-2 font-medium">Completá este dato.</span>
          </p>}
      </div>
      {/* Codigo de seguridad */}
      <div className="relative mt-6 mb-1 5">
        <InputNumber 
        label='Código de seguridad'
        size='input-s'
        id='cardCvv'
        name='cardCvv'
        value={checkoutOrder.payment?.cardCvv || ''}
        onChange={({target:{value}}) => setCheckoutOrder({...checkoutOrder, payment: {...checkoutOrder.payment,cardCvv: formatCvv(value)}})}
        />
        {checkoutOrderError.includes('cardCvv') &&
          <p className="top-full left-2 absolute w-max pt-0.5 flex items-center text-[0.8rem] text-red-500">
            <i className="fa-solid fa-circle-exclamation"></i>
            <span className="pl-2 font-medium">Completá este dato.</span>
          </p>}
      </div>
    </>
  )
}
