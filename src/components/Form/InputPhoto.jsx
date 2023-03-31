export const InputPhoto = ({id,label,photo,name, ...props}) => {
  return (
    <div className="input">
      <span className="input-label">{label}</span>
      <input 
      type="file" 
      name={id} 
      id={id}
      className="hidden"
      {...props} 
      />
      <label htmlFor={id} className="input-photo">
        {photo
        ? <img src={photo} alt={name} />
        : <i className="fa-solid fa-camera"></i>}
      </label>
    </div>
  )
}
