import { formatPrice } from '../../../services/format'

export const DetailPrice = ({price}) => {
  return (
    <h3 className='px-2 mb-2 text-3xl text-yellow-500 font-medium'>${formatPrice(price)}</h3>
  )
}
