export const InputCheckbox = ({name, id, checked,children, ...props}) => {

  return (
    <label htmlFor={id} className="input-checkbox">
      <input
        type="checkbox"
        name={name}
        id={id}
        checked={checked}
        {...props}
      />
      <span className="input-checkbox-checkmark"></span>
      <span className='input-checkbox-name'>{children}</span>
    </label>
  )
}
