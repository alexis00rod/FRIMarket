import { HomeHero, HomeSpecialProducts } from "../../components"
import { HomeTabs } from "../../components/HomeTabs/HomeTabs"

export const Home = () => {
  return (
    <main className="w-full max-w-screen-2xl mx-auto px-2 py-4 flex flex-col grow">
      <section className="w-full flex flex-col gap-4">
        <HomeHero />
        <HomeTabs />
        <span>HomeBanners2</span>
        <HomeSpecialProducts />
        <span>HomeBanners3</span>
      </section>
    </main>
    
  )
}
