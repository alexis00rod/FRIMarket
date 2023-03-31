import {useState, useEffect} from 'react'

export const SelectItem = ({name,id,children,...props}) => {
  return (
    <li className='select-item'>
      <input 
      type="radio" 
      name={name} 
      id={id} 
      className='hidden' 
      {...props} 
      />
      <label 
      htmlFor={id}
      className='select-item-input'
      >
        {children}
      </label>
    </li>
  )
}

export const SelectSearch = ({name, placeholder, ...props}) => {
  return (
    <li className='select-search'>
      <input 
        type="text" 
        name={name} 
        className='select-search-input' 
        placeholder={placeholder}
        {...props}
        />
    </li>
  )
}

export const Select = ({label, selected, children}) => {
  const [expand, setExpand] = useState(false)

  useEffect(() => {
    setExpand(false)
  },[selected])

  const handleExpand = e => {
    e.preventDefault()
    setExpand(!expand)
  }

  return (
    <div className="select">
      <span className="select-label">{label}</span>
      <div className="select-body">
        <button className={`select-handle ${expand ? 'rounded-t-md' : 'rounded-md'}`} onClick={handleExpand}>
          <span className="select-selected">{selected}</span>
          <i className={`select-arrow ${expand && '-rotate-180'} fa-solid fa-chevron-down`}></i>
        </button>
        {expand &&
        <ul className='select-expand'>
          {children}
        </ul>}
      </div>
    </div>
  )
}
