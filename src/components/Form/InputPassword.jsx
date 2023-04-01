export const InputPassword = ({id, label, value, size, ...props}) => {
  return (
    <div className={`input-box ${size}`}>
      <label htmlFor={id} className="input-label">{label}</label>
      <input type="password" name={id} id={id} defaultValue={value} {...props} />
    </div>
  )
}
