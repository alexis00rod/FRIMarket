export const InputNumber = ({label, name, id, size, ...props}) => {
  return (
    <div className={`input-box ${size}`}>
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
