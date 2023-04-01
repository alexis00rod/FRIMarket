import { useState } from "react"
import { Button } from "../index.js"

export const InputProductQty = () => {
  
  return (
    <div className="input-qty">
      <Button icon='chevron-down' color='btn-gray' size='btn-s' />
        <input type="number" name="" id="" />
      <Button icon='chevron-up' color='btn-gray' size='btn-s' />
    </div>
  )
}
