export const InputEmail = ({label, value, size, ...props}) => {
  return (
    <div className={`input-box ${size}`}>
      <label htmlFor="email" className="input-label">{label}</label>
      <input type="email" name="email" id="email" defaultValue={value} {...props} />
    </div>
  )
}
