import { SelectProvince, SelectCity } from "../index.js"

export const PostProductLocation = ({product, profile, handle}) => {
  const {province, city} = product

  return (
    <div className="w-full px-2 py-4 flex flex-col gap-4">
      <h4 className="font-medium">Confirma tu ubicacion</h4>
      <div className="w-full flex flex-col md:flex-row items-center justify-between flex-wrap gap-4">
        <SelectProvince 
        label='Provincia'
        selected={province ? province : profile.province}
        onChange={handle}
        />
        <SelectCity 
        label='Ciudad'
        province={province ? province : profile.province}
        selected={city ? city : profile.city}
        onChange={handle}
        />
      </div>
    </div>
  )
}