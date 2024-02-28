export const DetailAdditionalInfo = ({title, info}) => {
  return (
    <p className='flex items-center gap-2 font-medium capitalize'>
      {title}: 
      {title !== 'Disponibilidad'
      ? <span className="font-normal">{info}</span>
      : <span className={`flex items-center gap-2 ${info > 0 ? 'text-green-500' : 'text-red-500'}`}>
          {info}
          <i className={`fa-solid fa-${info > 0 ? 'check' : 'circle-xmark'}`}></i>
        </span>}
    </p>
  )
}
