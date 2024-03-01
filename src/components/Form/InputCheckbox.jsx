export const InputCheckbox = ({name, id, checked,children, ...props}) => {
  return (
    <div className="px-1 flex">
      <input
      type="checkbox"
      name={name}
      id={id}
      checked={checked}
      {...props}
    />
    <label
      htmlFor={id}
      className="pl-2 flex items-center text-sm font-light cursor-pointer"
    >
      {children}
    </label>
    </div>
  )
}
