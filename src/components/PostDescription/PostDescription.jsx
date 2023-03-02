export const PostDescription = ({...props}) => {
  return (
    <div className="px-2 py-2 flex flex-col">
      <label htmlFor='description' className="px-1 text-sm font-medium">Descripcion</label>
      <textarea 
      name='description' 
      id='description' 
      className="w-full max-w-xs h-24 px-2 py-2 border border-gray-300 rounded-md outline-none resize-none" 
      {...props}
      ></textarea>
    </div>
  )
}
