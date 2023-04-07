import { Link } from "react-router-dom"

export const Logo = ({color}) => {
  return (
    <Link to='/' className={`logo logo-${color}`} title="Pagina de inicio de FRIMarket">
      <h1><span>FRI</span>Market</h1>
    </Link>
  )
}
