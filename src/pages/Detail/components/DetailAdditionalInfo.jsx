export const DetailAdditionalInfo = ({title, info}) => {
  return (
    <p className='flex items-center gap-2 capitalize'><span className='font-medium'>{title}: </span>{info}</p>
  )
}
