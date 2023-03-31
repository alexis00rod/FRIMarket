export const InputNumber = ({label,name,id, ...props}) => {
  return (
    <div className="input">
      <label htmlFor={id} className="input-label">{label}</label>
      <input 
      type="number" 
      name={name} 
      id={id}
      {...props}
      />
    </div>
  )
}
