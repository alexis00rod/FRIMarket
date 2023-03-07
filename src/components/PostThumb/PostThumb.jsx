export const PostThumb = ({selected, ...props}) => {
  return (
    <div className="px-2 py-2 mb-2 flex flex-col">
      <span className="px-1 text-sm font-medium">Foto</span>
      <input 
      type="file" 
      name='thumb' 
      id='thumb' 
      className="hidden" 
      {...props}
      />
      <label htmlFor='thumb' className="w-40 h-40 px-1 py-1 flex items-center justify-center border border-gray-300 rounded-md cursor-pointer">
        {selected
        ? <img src={selected} className='w-full h-full object-contain' />
        : <i className="fa-solid fa-camera"></i>}
      </label>
    </div>
  )
}
