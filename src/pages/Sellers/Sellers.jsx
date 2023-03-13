import { useState, useEffect } from 'react'
import { Loader, SellerCard } from '../../components/index.js'
import { getUsers } from '../../services/firestore'

export const Sellers = () => {
  const [sellers, setSellers] = useState()

  useEffect(() => {
    getUsers()
    .then(resp => setSellers(resp.docs.map(e => ({
      id: e.id,
      ...e.data()
    }))))
  },[])

  if(!sellers) return <Loader />

  return (
    <div className='w-full flex flex-col gap-4'>
      <div className="grid grid-cols-4 gap-4">
        {sellers.map(e => <SellerCard key={e.id} seller={e} />)}
      </div>
    </div>
  )
}
