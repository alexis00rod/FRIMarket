import { Button } from '../index.js'

export const Modal = ({title, handle, direction, size, children}) => {
  return (
    <div className={`modal ${direction}`} onClick={() => handle(false)}>
      <div className={`modal-container ${size}`} onClick={e => e.stopPropagation()}>
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
