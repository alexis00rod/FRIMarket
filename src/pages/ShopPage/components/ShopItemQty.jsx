import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getProductsQty } from "../../../services/shop"

export const ShopItemQty = ({item}) => {
  const [qty, setQty] = useState()

  useEffect(() => {
    getProductsQty(item)
      .then(resp => setQty(resp))
  },[item])

  return <>({qty !== undefined ? qty : 0})</>

  // return qty !== undefined ? qty : 0
}
