export const PostStock = ({...props}) => {
  return (
    <div className="px-2 py-2 flex flex-col">
      <label htmlFor="stock" className="px-1 text-sm font-medium">Cantidad:</label>
      <input 
      type="number" 
      name="stock" 
      id="stock" 
      className="w-full max-w-xs h-8 px-2 border border-gray-300 rounded-md outline-none" 
      {...props}
      />
    </div>
  )
}
