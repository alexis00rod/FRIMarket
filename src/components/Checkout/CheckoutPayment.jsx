import { InputNumber } from "../index.js"

export const CheckoutPayment = ({...props}) => {

  return (
    <div className="box-body flex flex-col gap-2">
      <h4 className='font-medium'>Metodo de pago</h4>
      <div className='w-full flex flex-wrap gap-4'>
        <InputNumber 
        label='Numero de tarjeta'
        size='input-m'
        id="cardNumber" 
        name="cardNumber" 
        {...props}
        />
        <InputNumber 
        label='Fecha de expiracion'
        size='input-m'
        name="cardDate" 
        id="cardDate" 
        className="w-full h-8 px-2 border border-gray-300 rounded-md outline-none"
        {...props}
        />
        <InputNumber 
        label='Codigo de seguridad'
        size='input-m'
        name="cardCVV" 
        id="cardCVV" 
        className="w-full h-8 px-2 border border-gray-300 rounded-md outline-none"
        {...props}
        />
      </div>
    </div>
  )
}
