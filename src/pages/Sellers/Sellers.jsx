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
      <main>
        <section className='w-full flex flex-col gap-2 md:gap-4'>
          <div className="box flex items-center flex-wrap">
            <SellersLocations selected={location} onChange={({target:{id}}) => setLocation(id)} />
            <SellersSort selected={sort} onChange={({target:{id}}) => setSort(id)} />
          </div>
          <div className="w-full grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4">
            {sellers.map(e => <SellerCard key={e.id} seller={e} />)}
          </div>
        </section>
      </main>
    </>
  )
}
