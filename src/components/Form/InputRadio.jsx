export const InputRadio = ({id,name,checked,children, ...props}) => {
  return (
    <label htmlFor={id} className="input-radio">
      <input
        type="radio"
        name={name}
        id={id}
        checked={checked}
        {...props}
      />
      <span className="input-radio-checkmark"></span>
      <span className='input-radio-name'>{children}</span>
    </label>
  )
}
