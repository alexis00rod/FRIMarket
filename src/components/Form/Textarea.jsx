export const Textarea = ({label, id, name, ...props}) => {
  return (
    <div className="input">
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
