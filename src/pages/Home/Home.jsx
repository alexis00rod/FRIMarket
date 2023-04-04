import { useState } from "react"
import { Hero, Main, CategorySlider, ProductsSlider, SpecialsSlider } from "../../components"

export const Home = () => {
  const [tabs, setTabs] = useState('phones')

  return (
    <Main>
      <Hero />
      <CategorySlider active={tabs} onChange={({target: {id}}) => setTabs(id)} />
      <ProductsSlider category={tabs} />
      <SpecialsSlider />
    </Main>
  )
}
