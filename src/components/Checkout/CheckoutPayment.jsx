import { InputNumber } from "../index.js"

export const CheckoutPayment = ({order}) => {
  // const {cardNumber, cardDate,}

  return (
    <div className="box-body flex flex-col gap-2">
      <h4 className='font-medium'>Metodo de pago</h4>
      <div className='w-full flex flex-wrap gap-4'>
        <InputNumber 
        label='Numero de tarjeta'
        size='input-m'
        id="cardNumber" 
        name="cardNumber" 
        // defaultValue={order.user.cardNumber}
        // onChange={handleOrder}
        />
        <InputNumber 
        label='Fecha de expiracion'
        size='input-m'
        name="cardDate" 
        id="cardDate" 
        className="w-full h-8 px-2 border border-gray-300 rounded-md outline-none"
        // defaultValue={order.user.cardDate}
        // onChange={handleOrder}
        />
        <InputNumber 
        label='Codigo de seguridad'
        size='input-m'
        name="cardCVV" 
        id="cardCVV" 
        className="w-full h-8 px-2 border border-gray-300 rounded-md outline-none"
        // defaultValue={order.user.cardCVV}
        // onChange={handleOrder}
        />
      </div>
    </div>
  )
}
