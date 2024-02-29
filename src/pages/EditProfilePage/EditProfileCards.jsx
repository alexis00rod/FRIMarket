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
    <div className="w-full p-6 md:p-12 flex flex-col bg-white border border-gray-300 rounded-md">
      <div className="w-full flex items-center">
        <h3 className="grow text-lg font-medium">Datos personales</h3>
        <Link to='/editProfile' className="btn btn-m btn-blue btn-text">Volver</Link>
      </div>
      <div className="w-full flex flex-col">
        {addCard
        ? <>
            <div className="relative mt-6 mb-1 5">
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
            <div className="relative mt-6 mb-1 5">
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
            <div className="relative mt-6 mb-1 5">
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
            <div className="relative mt-6 mb-1 5">
              <InputNumber 
              label='Código de seguridad'
              size='input-s'
              id='cardCvv'
              name='cardCvv'
              value={cardToAdd?.cardCvv || ''}
              onChange={({target:{value}}) => setCardToAdd({...cardToAdd, cardCvv:formatCvv(value)})}
              />
            </div>
            <div className="mt-6">
              {addCardLoading
              ? <ButtonLoader />
              : <button onClick={submitAddCard} className="btn btn-m btn-blue btn-text" >Agregar</button>}
            </div>
          </>
        : <>
          {profile.cards && profile.cards.length >= 1 &&
            <ul className="w-full mt-6 mb-1.5 flex flex-col gap-4">
              {profile.cards && 
                profile.cards.map((e,i) => 
                <li key={i} className="w-full flex items-center">
                  <div className="w-[50px] h-[50px] flex items-center justify-center flex-none text-blue-500 rounded-full border border-gray-300">
                    <i className='text-xl fa-solid fa-credit-card'></i>
                  </div>
                  <div className="ml-4 flex flex-col grow">
                    <p className="text-lg">{formatHideCardNumber(e.cardNumber)}</p>
                    <p className="text-[.8rem] leading-4">Vencimiento: {e.cardExpirationDate}</p>
                  </div>
                  <button className="btn btn-s btn-text-red" onClick={() => deleteCard(profile,e)}><i className="fa-solid fa-x"></i></button>
                </li>)}
            </ul>}
            <div className="mt-6">
              <button onClick={() => setAddCard(true)} className="btn btn-m btn-blue btn-text">
                <i className="fa-solid fa-plus"></i>
                Agregar nueva tarjeta
              </button>
            </div>
          </>}
      </div>
    </div>
  )
}
