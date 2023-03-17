import { useState } from "react"

export const useCardSize = () => {
  const [cardSize, setCardSize] = useState('s')

  return {cardSize, setCardSize}
}
