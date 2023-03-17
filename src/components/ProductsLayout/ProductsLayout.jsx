export const ProductsLayout = ({size, ...props}) => {

  return (
    <div className="w-max px-2 flex items-center gap-2">
      <div className="flex" title="Cuadricula">
        <input 
        type="radio" 
        name="layout" 
        id="s" 
        defaultValue='s'
        checked={size === 's'}
        className='hidden'
        {...props}
        />
        <label 
        htmlFor="s"
        className={`w-8 h-8 flex items-center justify-center flex-none ${size === 's' && 'text-blue-500'} hover:text-blue-500 cursor-pointer`}
        >
          <i className="fa-solid fa-table-cells"></i>
        </label>
      </div>
      <div className="flex" title="Lista">
        <input 
        type="radio" 
        name="layout" 
        id="l" 
        defaultValue='l'
        checked={size === 'l'}
        className='hidden'
        {...props}
        />
        <label 
        htmlFor="l" 
        className={`w-8 h-8 flex items-center justify-center flex-none ${size === 'l' && 'text-blue-500'} hover:text-blue-500 cursor-pointer`}
        >
          <i className="fa-solid fa-list"></i>
        </label>
      </div>
    </div>
  )
}
