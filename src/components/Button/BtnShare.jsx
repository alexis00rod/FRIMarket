import { Button } from "./Button"

export const BtnShare = () => {

  const shareProduct = () => {
    console.log("share")
  }

  return (
    <Button icon='share' color='btn-yellow' onClick={shareProduct}>
      <span className="hidden md:flex text-sm font-medium">Compartir</span>
    </Button>
  )
}
