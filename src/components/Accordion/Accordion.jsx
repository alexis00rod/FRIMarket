import { useState } from 'react'

export const Accordion = ({title,open = true,children}) => {
  const [accordion, setAccordion] = useState(open)

  return (
    <div className="accordion">
      <button className="accordion-handle" onClick={() => setAccordion(!accordion)}>
        <span className='accordion-title'>{title}</span>
        <i className={`accordion-arrow ${accordion && '-rotate-180'} fa-solid fa-chevron-down`}></i>
      </button>
      <div className={`accordion-expand ${accordion && 'h-full py-2 opacity-100'}`}>
        {children}
      </div>
    </div>
  )
}
