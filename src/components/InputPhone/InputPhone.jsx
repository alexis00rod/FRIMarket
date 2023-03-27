export const InputPhone = ({...props}) => {
  return (
    <div className="px-2 py-2 flex flex-col">
      <label htmlFor='phone' className="px-1 text-sm font-medium">Telefono</label>
      <input 
      type="number" 
      name="phone" 
      id="phone" 
      className="w-full h-8 px-2 border border-gray-300 rounded-md outline-none"
      {...props}
      />
    </div>
  )
}
