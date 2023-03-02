export const PostCategory = ({category, ...props}) => {
  const {idCategory, icon, name} = category
  return (
    <div key={idCategory}>
      <input type="radio" name="category" id={idCategory} {...props} className='hidden' />
      <label 
      htmlFor={idCategory}
      className='w-full h-36 px-2 py-2 flex flex-col justify-center items-center bg-yellow-500 text-white rounded-md cursor-pointer'
      >
        <i className={`w-full h-2/3 flex items-center justify-center flex-none text-4xl fa-solid fa-${icon}`}></i>
        <span className="grow font-medium text-center">{name}</span>
      </label>
    </div>
  )
}
