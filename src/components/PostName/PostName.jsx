export const PostName = ({...props}) => {
  return (
    <div className="px-2 py-2 flex flex-col">
      <label htmlFor='name' className="px-1 text-sm font-medium">Nombre</label>
      <input 
      type="text"
      name='name'
      id='name'
      className="w-full max-w-xs h-8 px-2 border border-gray-300 rounded-md outline-none" 
      {...props}
      />
    </div>
  )
}
