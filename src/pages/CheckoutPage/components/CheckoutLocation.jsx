import { useCheckoutContext } from "../context/CheckoutContext"
import { Select, SelectItem } from "../../../components"

export const CheckoutLocation = ({locations}) => {
  const {checkoutOrder, setCheckoutOrder, checkoutOrderError} = useCheckoutContext()

  if(locations) {
    return (
      <div className="mt-6 mb-1.5 relative flex flex-col gap-4">
        <div className="flex flex-col">
          <span className="ml-1.5 text-[.8rem]">Provincia</span>
          <Select
          selected={checkoutOrder.shipping.province.name || ''}
          >
            {locations.map(e => 
              <SelectItem
              key={e.idProvince}
              name='province'
              id={e.idProvince}
              onChange={() => setCheckoutOrder({...checkoutOrder,shipping:{...checkoutOrder.shipping, province: {id: e.idProvince,name: e.nameProvince}, city: {}}})}
              >
                {e.nameProvince}
              </SelectItem>)}
          </Select>
        </div>
        {checkoutOrder.shipping.province.id &&
          <div className="flex flex-col">
            <span className="ml-1.5 text-[.8rem]">Ciudad</span>
            <Select
            selected={checkoutOrder.shipping.city.name || ''}
            >
            {locations.find(e => e.idProvince === checkoutOrder.shipping.province.id).cities.map(e => 
              <SelectItem
              key={e.idCity}
              name='city'
              id={e.idCity}
              onChange={() => setCheckoutOrder({...checkoutOrder, shipping: {...checkoutOrder.shipping, city: {id: e.idCity, name: e.nameCity}}})}
              >
                {e.nameCity}
              </SelectItem>)}  
            </Select>
          </div>}
        {checkoutOrderError.includes('city') &&
          <p className="top-full left-2 absolute w-max pt-0.5 flex items-center text-[0.8rem] text-red-500">
            <i className="fa-solid fa-circle-exclamation"></i>
            <span className="pl-2 font-medium">Agrega tu localización.</span>
          </p>}
      </div>
    )
  }
}
