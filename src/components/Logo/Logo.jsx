import { Link } from "react-router-dom"

export const Logo = () => {
  return (
    <Link to='/' className="logo" title="Pagina de inicio de FRIMarket">
      <h1><span>FRI</span>Market</h1>
    </Link>
  )
}
