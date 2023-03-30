export const DetailImage = ({thumb, name}) => {
  return (
    <figure className='w-full lg:w-1/2 flex items-center justify-center flex-none border border-gray-300 rounded-md'>
      <img src={thumb} alt={name} className='w-full object-contain' />
    </figure>
  )
}