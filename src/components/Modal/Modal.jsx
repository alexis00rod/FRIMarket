import { useEffect, useRef } from 'react';
import { Button } from '../index.js'

export const Modal = ({title, handle, direction, size, children}) => {
  const modalRef = useRef(null)

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Tab') {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (!event.shiftKey && document.activeElement === lastElement) {
          firstElement.focus()
          event.preventDefault()
        } else if (event.shiftKey && document.activeElement === firstElement) {
          lastElement.focus()
          event.preventDefault()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className={`modal ${direction}`} onClick={() => handle(false)}>
      <div className={`modal-container ${size}`} onClick={e => e.stopPropagation()} ref={modalRef}>
        <div className="modal-header">
          <h3>{title}</h3>
          <Button icon='x' color='btn-gray' size='btn-s' onClick={() => handle(false)} />
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  )
}
