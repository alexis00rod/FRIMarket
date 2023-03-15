import { useState } from 'react'

export const Accordion = ({title,open = true,children}) => {
  const [accordion, setAccordion] = useState(open)

  return (
    <div className="w-full flex flex-col">
      <div 
        className={`w-full px-1 py-1 flex items-center ${accordion && 'text-blue-500'} cursor-pointer hover:text-blue-500`}
        onClick={() => setAccordion(!accordion)}
      >
        <h2 className="px-1 grow font-medium">{title}</h2>
        <button className="w-8 h-8 flex justify-center items-center">
          <i className={`fa-solid fa-${accordion ? 'minus' : 'plus'}`}></i>
        </button>
      </div>
      {accordion &&
      <div className="w-full px-2 pb-2 flex flex-col">
        {children}
      </div>}
    </div>
  )
}
