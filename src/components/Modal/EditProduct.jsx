import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteProduct, editProduct, updatePostsUser } from "../../services/firestore"
import { useProfile } from "../../hooks/useProfile"
import { Modal, InputNumber, Button } from "../index.js"

export const EditProduct = ({product, handle}) => {
  const {profile} = useProfile()
  const {id, name, stock, price} = product
  const [changes, setChanges] = useState({})
  const navigate = useNavigate()

  const handleEditProduct = ({target: {name,value}}) => {
    setChanges({
      ...changes,
      [name]: parseFloat(value)
    })
  }

  const handleDeleteProduct = e => {
    e.preventDefault()
    deleteProduct(id)
    updatePostsUser(profile,'remove')
    navigate('/shop/all')
  }

  const submitChanges = e => {
    e.preventDefault()
    editProduct(product,changes)
    handle(false)
  }

  return (
    <Modal direction='modal-center' title='Editar producto' size='modal-l' handle={handle}>
      <form className="w-full px-2 flex flex-col gap-4" onSubmit={submitChanges}>
        <h4 className="font-medium">{name}</h4>
        <div className="w-full flex flex-wrap gap-4">
          <InputNumber label='Precio' name='price' id='price' defaultValue={price} onChange={handleEditProduct} />
          <InputNumber label='Cantidad' name='stock' id='stock' defaultValue={stock} onChange={handleEditProduct} />
        </div>
        <div className="w-full flex justify-center flex-wrap gap-4">
          <Button icon='trash' color='btn-red' size='btn-l' onClick={handleDeleteProduct} >
            <span className="text-sm font-medium">Eliminar producto</span>
          </Button>
          <Button type='submit' icon='check' color='btn-green' size='btn-l' >
            <span className="text-sm font-medium">Guardar cambios</span>
          </Button>
        </div>
      </form>
    </Modal>
  )
}
