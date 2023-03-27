export const InputCP = ({...props}) => {
  return (
    <div className="px-2 py-2 flex flex-col">
      <label htmlFor='cp' className="px-1 text-sm font-medium">Codigo postal</label>
      <input 
      type="number" 
      name="cp" 
      id="cp" 
      className="w-full h-8 px-2 border border-gray-300 rounded-md outline-none"
      {...props}
      />
    </div>
  )
}
