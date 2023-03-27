export const InputAddress = ({...props}) => {
  return (
    <div className="px-2 py-2 flex flex-col">
      <label htmlFor='address' className="px-1 text-sm font-medium">Direccion</label>
      <input 
      type="text" 
      name="address" 
      id="address" 
      className="w-full h-8 px-2 border border-gray-300 rounded-md outline-none"
      {...props}
      />
    </div>
  )
}
