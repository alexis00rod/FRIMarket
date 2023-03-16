import { HomeHero, HomeSpecialProducts } from "../../components"
import { HomeTabs } from "../../components/HomeTabs/HomeTabs"

export const Home = () => {
  return (
    <section className="w-full flex flex-col gap-4">
      <HomeHero />
      <HomeTabs />
      <span>HomeBanners2</span>
      <HomeSpecialProducts />
      <span>HomeBanners3</span>
    </section>
  )
}
