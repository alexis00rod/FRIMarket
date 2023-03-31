export const InputText = ({label, id, name, ...props}) => {
  return (
    <div className="input">
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
