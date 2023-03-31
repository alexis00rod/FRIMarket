export const InputPassword = ({id,label, value, ...props}) => {
  return (
    <div className="input">
      <label htmlFor={id} className="input-label">{label}</label>
      <input type="password" name={id} id={id} defaultValue={value} {...props} />
    </div>
  )
}
