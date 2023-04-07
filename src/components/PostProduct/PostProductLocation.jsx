import { SelectProvince, SelectCity, Loader } from "../index.js"

export const PostProductLocation = ({user, handle}) => {
  const {province, city} = user

  return (
    <div className="w-full px-2 py-4 flex flex-col gap-4">
      <h4 className="font-medium">Confirma tu ubicacion</h4>
      <div className="w-full flex flex-col md:flex-row justify-between gap-4">
        <SelectProvince 
        label='Provincia'
        selected={province}
        onChange={handle}
        />
        <SelectCity 
        label='Ciudad'
        province={province}
        selected={city}
        onChange={handle}
        />
      </div>
    </div>
  )
}