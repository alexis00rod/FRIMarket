export const SignupPhoto = ({selected,...props}) => {
  return (
    <div className="w-max px-2 py-2 mb-2 flex flex-col">
      <span className="px-1 text-sm font-medium">Foto</span>
      <input 
      type="file" 
      name='photo' 
      id='photo' 
      className="hidden" 
      {...props}
      />
      <label htmlFor='photo' className="w-28 h-28 px-1 py-1 flex items-center justify-center border border-gray-300 rounded-md cursor-pointer">
        {selected
        ? <img src={selected} className='w-full h-full object-cover' />
        : <i className="fa-solid fa-camera"></i>}
      </label>
    </div>
  )
}
