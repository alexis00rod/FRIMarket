import { useCheckoutContext } from "../context/CheckoutContext"
import { InputNumber, InputText } from "../../../components"

export const CheckoutAddress = () => {
  const {checkoutOrder, setCheckoutOrder, checkoutOrderError} = useCheckoutContext()

  return (
    <>
      <div className="relative mt-6 mb-1.5">
        <InputText 
        label='Calle'
        size='input-m'
        name='street'
        id='street'
        value={checkoutOrder.shipping?.address.street || ''}
        onChange={({target:{value}}) => setCheckoutOrder({...checkoutOrder,shipping: {...checkoutOrder.shipping,address: {...checkoutOrder.shipping.address,street: value}}})}
        />
        {checkoutOrderError.includes('street') &&
          <p className="top-full left-2 absolute w-max pt-0.5 flex items-center text-[0.8rem] text-red-500">
            <i className="fa-solid fa-circle-exclamation"></i>
            <span className="pl-2 font-medium">Agrega el nombre de la calle.</span>
          </p>}
      </div>
      <div className="relative mt-6 mb-1.5">
        <InputNumber
        label='Número de casa o apartamento'
        size='input-m'
        name='number'
        id='number'
        value={checkoutOrder.shipping?.address.number || ''}
        onChange={({target:{value}}) => setCheckoutOrder({...checkoutOrder,shipping: {...checkoutOrder.shipping,address: {...checkoutOrder.shipping.address,number: value}}})}
        />
        {checkoutOrderError.includes('number') &&
          <p className="top-full left-2 absolute w-max pt-0.5 flex items-center text-[0.8rem] text-red-500">
            <i className="fa-solid fa-circle-exclamation"></i>
            <span className="pl-2 font-medium">Agrega el número de casa o apartamento.</span>
          </p>}
      </div>
      <div className="mt-6 mb-1.5">
        <InputText
        label='Piso (opcional)'
        size='input-m'
        name='apartment'
        id='apartment'
        value={checkoutOrder.shipping?.address.apartment || ''}
        onChange={({target:{value}}) => setCheckoutOrder({...checkoutOrder,shipping: {...checkoutOrder.shipping,address: {...checkoutOrder.shipping.address,apartment: value ?? ''}}})}
        />
      </div>
      <div className="relative mt-6 mb-1.5">
        <InputNumber
        label='Código postal'
        size='input-m'
        name='postalCode'
        id='postalCode'
        value={checkoutOrder.shipping?.address.postalCode || ''}
        onChange={({target:{value}}) => setCheckoutOrder({...checkoutOrder,shipping: {...checkoutOrder.shipping,address: {...checkoutOrder.shipping.address,postalCode: value}}})}
        />
        {checkoutOrderError.includes('pc') &&
          <p className="top-full left-2 absolute w-max pt-0.5 flex items-center text-[0.8rem] text-red-500">
            <i className="fa-solid fa-circle-exclamation"></i>
            <span className="pl-2 font-medium">Agrega tu código postal.</span>
          </p>}
      </div>
    </>
  )
}
