import { useEffect, useState } from "react"
import { getProductsQty } from "../../../services/shop"

export const ShopItemQty = ({item}) => {
  const [qty, setQty] = useState()

  useEffect(() => {
    getProductsQty(item)
      .then(resp => setQty(resp))
  },[item])

  return <>({qty !== undefined ? qty : 0})</>
}
