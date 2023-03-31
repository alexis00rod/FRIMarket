import { Button } from "../index.js"

export const BtnShare = ({size}) => {

  const shareProduct = () => {
    console.log("share")
  }

  return (
    <Button icon='share' color='btn-yellow' size={size} onClick={shareProduct}>
      {size !== 'btn-s' && <span className="hidden md:flex text-sm font-medium">Compartir</span>}
    </Button>
  )
}
