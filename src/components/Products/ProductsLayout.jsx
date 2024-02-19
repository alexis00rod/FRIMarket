export const ProductsLayout = ({size,handle}) => {
  return (
    <div className="w-max px-2 flex items-center gap-2">
      <button className={`btn btn-s btn-${size === 's' ? 'blue' : 'white'}`} onClick={() => handle('s')}>
        <i className="fa-solid fa-table-cells"></i>
      </button>
      <button className={`btn btn-s btn-${size === 'l' ? 'blue' : 'white'}`} onClick={() => handle('l')}>
        <i className="fa-solid fa-list"></i>
      </button>
    </div>
  )
}
