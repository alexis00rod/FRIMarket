export const ButtonLoader = () => {
  return (
    <button className="btn btn-m btn-blue" title="Cargando...">
      <div
        className="inline-block w-[20px] h-[20px] animate-spin rounded-full text-white border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status">
      </div>
    </button>
  )
}
