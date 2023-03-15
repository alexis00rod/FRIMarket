import { useState, useEffect } from 'react'
import { Loader, SellerCard, SellersLocations } from '../../components/index.js'
import { getUsers } from '../../services/firestore'

export const Sellers = () => {
  const [sellers, setSellers] = useState()
  const [location, setLocation] = useState('all')

  useEffect(() => {
    getUsers(location)
    .then(resp => setSellers(resp.docs.map(e => ({
      id: e.id,
      ...e.data()
    }))))
  },[location])

  console.log(sellers)

  if(!sellers) return <Loader />

  return (
    <div className='w-full flex flex-col gap-4'>
      <div className="w-full px-2 py-2 flex items-center bg-white border border-gray-300 rounded md">
        <SellersLocations selected={location} onChange={({target:{id}}) => setLocation(id)} />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {sellers.map(e => <SellerCard key={e.id} seller={e} />)}
      </div>
    </div>
  )
}
