import { useState, useEffect } from 'react'
import { Breadcrumb, Loader, SelectProvince, SelectSellersSort, SellerCard } from '../../components/index.js'
import { getUsers } from '../../services/firestore'

export const Sellers = () => {
  const [sellers, setSellers] = useState()
  const [province, setProvince] = useState('all')
  const [sort, setSort] = useState('old')

  useEffect(() => {
    getUsers(province,sort)
    .then(resp => setSellers(resp.docs.map(e => ({
      id: e.id,
      ...e.data()
    }))))
  },[province,sort])

  if(!sellers) return <Loader />

  return (
    <>
      <Breadcrumb />
      <main>
        <section className='w-full flex flex-col gap-2 md:gap-4'>
          <div className="box flex items-center flex-wrap gap-2 md:gap-4">
            <SelectProvince label='Buscar por ubicacion' selected={province} onChange={({target: {id}}) => setProvince(id)} />
            <SelectSellersSort selected={sort} onChange={({target: {id}}) => setSort(id)} />
          </div>
          <div className="w-full grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4">
            {sellers.map(e => <SellerCard key={e.id} seller={e} />)}
          </div>
        </section>
      </main>
    </>
  )
}
