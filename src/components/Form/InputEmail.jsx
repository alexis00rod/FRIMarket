export const InputEmail = ({label, value, ...props}) => {
  return (
    <div className="input">
      <label htmlFor="email" className="input-label">{label}</label>
      <input type="email" name="email" id="email" defaultValue={value} {...props} />
    </div>
  )
}
