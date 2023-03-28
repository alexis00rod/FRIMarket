export const InputPhoto = ({photo,newPhoto,name,...props}) => {
  return (
    <div className="px-2 py-2 flex flex-col">
      <span className="px-1 text-sm font-medium">Foto</span>
      <input 
      type="file" 
      name='photoURL' 
      id='photoURL' 
      className="hidden"
      {...props}
      />
      <label 
      htmlFor='photoURL' 
      className="w-24 h-24 px-1 py-1 flex items-center justify-center flex-none border border-gray-300 rounded-md cursor-pointer"
      >
        {newPhoto
        ? <img src={newPhoto} alt={name} className='w-full h-full object-cover' />
        : <img src={photo} alt={name} className='w-full h-full object-cover' />}
      </label>
    </div>
  )
}
