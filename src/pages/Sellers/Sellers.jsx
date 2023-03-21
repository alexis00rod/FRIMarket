import { useState, useEffect } from 'react'
import { Breadcrumb, Loader, SellerCard, SellersLocations, SellersSort } from '../../components/index.js'
import { getUsers } from '../../services/firestore'

export const Sellers = () => {
  const [sellers, setSellers] = useState()
  const [location, setLocation] = useState('all')
  const [sort, setSort] = useState('old')

  useEffect(() => {
    getUsers(location,sort)
    .then(resp => setSellers(resp.docs.map(e => ({
      id: e.id,
      ...e.data()
    }))))
  },[location,sort])

  if(!sellers) return <Loader />

  return (
    <>
      <Breadcrumb />
      <main className="w-full max-w-screen-2xl mx-auto px-2 py-4 flex flex-col grow">
        <div className='w-full flex flex-col gap-4'>
          <div className="w-full px-2 py-2 flex items-center gap-4 bg-white border border-gray-300 rounded md">
            <SellersLocations selected={location} onChange={({target:{id}}) => setLocation(id)} />
            <SellersSort selected={sort} onChange={({target:{id}}) => setSort(id)} />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {sellers.map(e => <SellerCard key={e.id} seller={e} />)}
          </div>
        </div>
      </main>
    </>
  )
}
