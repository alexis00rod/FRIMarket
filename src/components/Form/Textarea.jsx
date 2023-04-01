export const Textarea = ({label, id, name,size, ...props}) => {
  return (
    <div className={`input-box ${size}`}>
      <label htmlFor={id} className="input-label">{label}</label>
      <textarea 
      name={name} 
      id={id} 
      {...props}
      >
      </textarea>
    </div>
  )
}
