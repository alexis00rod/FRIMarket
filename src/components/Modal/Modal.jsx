import { Button } from "../Button/Button"

export const Modal = ({title,handle,children}) => {
  return (
    <div className="modal" onClick={() => handle(false)}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <Button icon='x' color='btn-gray' onClick={() => handle(false)} />
        </div>
        {children}
      </div>
    </div>
  )
}
