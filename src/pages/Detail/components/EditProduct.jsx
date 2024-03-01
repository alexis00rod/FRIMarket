import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteProduct, editProduct } from "../../../services/shop.js"
import { updatePostsUser } from "../../../services/user.js"
import { useProfile } from "../../../hooks/useProfile.jsx"
import { Modal, InputNumber } from "../../../components/index.js"
// import { Modal, InputNumber, Button } from "../../../components/index.js"

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
      <form className="w-full px-2 flex flex-col gap-4">
        <h4 className="font-medium">{name}</h4>
        <div className="w-full flex flex-wrap gap-4">
          <InputNumber 
          label='Precio' 
          size='input-m'
          name='price' 
          id='price' 
          defaultValue={price} 
          onChange={handleEditProduct} 
          />
          <InputNumber 
          label='Cantidad' 
          size='input-m'
          name='stock' 
          id='stock' 
          defaultValue={stock} 
          onChange={handleEditProduct} 
          />
        </div>
        <div className="w-full flex justify-center flex-wrap gap-4">
          {/* <Button icon='trash' color='btn-red' size='btn-l' onClick={handleDeleteProduct} >
            <span className="text-sm font-medium">Eliminar producto</span>
          </Button> */}
          {/* <Button icon='check' color='btn-green' size='btn-l' onClick={submitChanges} >
            <span className="text-sm font-medium">Guardar cambios</span>
          </Button> */}
        </div>
      </form>
    </Modal>
  )
}
