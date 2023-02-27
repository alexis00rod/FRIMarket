export const Loader = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className="inline-block h-14 w-14 animate-spin rounded-full text-blue-500 border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status">
      </div>
    </div>
  )
}
