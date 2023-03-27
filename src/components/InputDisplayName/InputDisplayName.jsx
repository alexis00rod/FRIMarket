export const InputDisplayName = ({...props}) => {
  return (
    <div className="px-2 py-2 flex flex-col">
      <label htmlFor='displayName' className="px-1 text-sm font-medium">Nombre y apellido</label>
      <input 
      type="text" 
      name="displayName" 
      id="displayName"
      className="w-full h-8 px-2 border border-gray-300 rounded-md outline-none"
      {...props}
      />
    </div>
  )
}
