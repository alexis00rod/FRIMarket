export const InputText = ({label, id, name,size, ...props}) => {
  console.log(size)
  return (
    <div className={`input-box ${size}`}>
      <label htmlFor={label} className="input-label">{label}</label>
      <input 
      type="text" 
      name={name} 
      id={label} 
      {...props}
      />
    </div>
  )
}
