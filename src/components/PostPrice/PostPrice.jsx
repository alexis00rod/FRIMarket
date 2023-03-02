export const PostPrice = ({...props}) => {
  return (
    <div className="px-2 py-2 flex flex-col">
      <label htmlFor="price" className="px-1 text-sm font-medium">Precio:</label>
      <div className="w-full max-w-xs h-8 flex items-center border border-gray-300 rounded-md">
        <span className="w-8 h-full flex items-center justify-center text-gray-400">$</span>
        <input 
        type="number" 
        name="price" 
        id="price" 
        className="h-full px-2 grow outline-none"
        {...props}
        />
      </div>
    </div>
  )
}
