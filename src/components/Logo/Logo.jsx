import { Link } from "react-router-dom"

export const Logo = () => {
  return (
    <Link to='/' className="w-max px-2 flex">
      <h1 className="flex items-center text-3xl text-blue-500 font-black"><span className="text-yellow-500">FRI</span>Market</h1>
    </Link>
  )
}
