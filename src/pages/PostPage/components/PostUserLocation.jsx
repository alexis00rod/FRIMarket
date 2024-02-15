import { usePostContext } from "../context/PostContext"
import { Select, SelectItem } from "../../../components"

export const PostUserLocation = ({locations}) => {
  const {productToPost, setProductToPost, productToPostError} = usePostContext()
  const {user:{province,city}} = productToPost

  return (
    <div className="mt-6 mb-1.5">
      <h3 className="py-3 text-lg font-medium">Localizacion</h3>
      <div className="relative">
        <div className="flex flex-wrap gap-4">
          {locations && 
            <>
              <Select
              selected={province.name || ''}
              >
                {locations.map(province => 
                <SelectItem
                key={province.idProvince}
                name='province'
                id={province.nameProvince}
                onChange={() => setProductToPost({...productToPost,user:{...productToPost.user, province:{id: province.idProvince, name: province.nameProvince}, city: {}}})}
                >
                  {province.nameProvince}
                </SelectItem>)}
              </Select>
              {province.id &&
                <Select
                selected={city.name || ''}
                >
                  {locations.find(e => e.idProvince === province.id).cities.map(city =>
                    <SelectItem
                    key={city.idCity}
                    name='city'
                    id={city.nameCity}
                    onChange={() => setProductToPost({...productToPost,user:{...productToPost.user, city:{id: city.idCity, name: city.nameCity}}})}
                    >
                      {city.nameCity}
                    </SelectItem>)}
                </Select>}
            </>}
        </div>
        {productToPostError.includes('city')  &&
          <p className="top-full left-2 absolute w-max pt-0.5 flex items-center text-[0.8rem] text-red-500">
            <i className="fa-solid fa-circle-exclamation"></i>
            <span className="pl-2 font-medium">Agrega tu localización</span>
          </p>}
      </div>
    </div>
  )
}
