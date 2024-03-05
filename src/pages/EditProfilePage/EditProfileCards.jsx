import { Link } from "react-router-dom"
import { useState } from "react"
import { formatCardNumber, formatCvv, formatExpirationDate, formatHideCardNumber } from "../../services/format"
import { addCardToUser, deleteCardToUser } from "../../services/user"
import { useProfile } from "../../hooks/useProfile"
import { ButtonLoader, InputNumber, InputText, Loader } from "../../components"

export const EditProfileCards = () => {
  const {profile} = useProfile()
  const [addCard, setAddCard] = useState(false)
  const [cardToAdd, setCardToAdd] = useState()
  const [addCardLoading, setAddCardLoading] = useState(false)

  const submitAddCard = async e => {
    e.preventDefault()
    setAddCardLoading(true)
    try { 
      await addCardToUser(profile,cardToAdd)
      setAddCardLoading(false)
      setAddCard(false)
      setCardToAdd()
    } catch (err) {
      alert(err)
    }
  }

  const deleteCard = async (user,card) => {
    try {
      await deleteCardToUser(user,card)
    } catch (err) {
      alert(err)
    }
  }

  if(!profile) return <Loader />

  return (
    <section className="editProfile">
      <div className="editProfile-form">
        <div className="editProfile-form-header">
          <h3>Datos personales</h3>
          <Link to='/editProfile' className="btn btn-m btn-blue btn-text">Volver</Link>
        </div>
        {addCard
        ? <>
            <div className="editProfile-form-inputs">
              <div className="editProfile-form-input">
                <InputText
                label='Número de la tarjeta'
                size='input-m'
                id='cardNumber'
                name='cardNumber'
                value={cardToAdd?.cardNumber || ''}
                onChange={({target:{value}}) => setCardToAdd({...cardToAdd, cardNumber:formatCardNumber(value)})}
                />
              </div>
              {/* Titular de la tarjeta */}
              <div className="editProfile-form-input">
                <InputText
                label='Titular de la tarjeta'
                size='input-m'
                id='cardName'
                name='cardName'
                value={cardToAdd?.cardName || ''}
                onChange={({target:{value}}) => setCardToAdd({...cardToAdd, cardName:value.toUpperCase()})}
                />
              </div>
                {/* Fecha de expiracion */}
              <div className="editProfile-form-input">
                <InputText
                label='Fecha de expiracíon'
                size='input-s'
                id='cardExpirationDate'
                name='cardExpirationDate'
                value={cardToAdd?.cardExpirationDate || ''}
                onChange={({target:{value}}) => setCardToAdd({...cardToAdd, cardExpirationDate:formatExpirationDate(value)})}
                />
              </div>
                {/* Codigo de seguridad */}
              <div className="editProfile-form-input">
                <InputNumber 
                label='Código de seguridad'
                size='input-s'
                id='cardCvv'
                name='cardCvv'
                value={cardToAdd?.cardCvv || ''}
                onChange={({target:{value}}) => setCardToAdd({...cardToAdd, cardCvv:formatCvv(value)})}
                />
              </div>
            </div>
            <div className="editProfile-form-buttons">
              {addCardLoading
                ? <ButtonLoader />
                : <button onClick={submitAddCard} className="btn btn-m btn-blue btn-text" >Agregar</button>}
            </div>
          </>
        : <>
            {profile.cards && profile.cards.length >= 1 &&
              <ul className="editProfile-form-list">
                {profile.cards && 
                  profile.cards.map((e,i) => 
                  <li key={i} className="editProfile-form-item">
                    <i className='editProfile-icon fa-solid fa-credit-card'></i>
                    <div className="editProfile-form-item-summary">
                      <p>{formatHideCardNumber(e.cardNumber)}</p>
                      <p>Vencimiento: {e.cardExpirationDate}</p>
                    </div>
                    <button className="btn btn-s btn-text-red" onClick={() => deleteCard(profile,e)}><i className="fa-solid fa-x"></i></button>
                  </li>)}
              </ul>}
            <div className="editProfile-form-buttons">
              <button onClick={() => setAddCard(true)} className="btn btn-m btn-blue btn-text">
                <i className="fa-solid fa-plus"></i>
                Agregar nueva tarjeta
              </button>
            </div>
          </>}
      </div>
    </section>
  )
}
