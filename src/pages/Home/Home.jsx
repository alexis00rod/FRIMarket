import { Hero, HomeHero, HomeSpecialProducts } from "../../components"
import { HomeTabs } from "../../components/HomeTabs/HomeTabs"

export const Home = () => {
  return (
    <main>
      <section className="w-full flex flex-col gap-2 md:gap-4">
        <Hero />
        {/* <HomeHero /> */}
        <HomeTabs />
        <HomeSpecialProducts />
      </section>
    </main>
    
  )
}
