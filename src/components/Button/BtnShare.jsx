import { Button } from "../index.js"

export const BtnShare = () => {

  const shareProduct = () => {
    console.log("share")
  }

  return (
    <Button icon='share' color='btn-text-yellow' size='btn-m' title='Compartir' onClick={shareProduct}>
      <span className="text-sm font-medium">Compartir</span>
    </Button>
  )
}
