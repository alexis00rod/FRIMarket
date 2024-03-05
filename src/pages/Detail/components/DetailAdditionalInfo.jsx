export const DetailAdditionalInfo = ({title, info}) => {
  return (
    <p className='detail-info-additional'>
      {title}: 
      {title !== 'Disponibilidad'
      ? <span>{info}</span>
      : <span className={`${info > 0 ? 'text-green-500' : 'text-red-500'}`}>
          {info}
          <i className={`ml-1 fa-solid fa-${info > 0 ? 'check' : 'circle-xmark'}`}></i>
        </span>}
    </p>
  )
}
