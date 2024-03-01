import { Hero, HomeCategories, HomeFeaturedProducts, HomeOffers, HomeWishlist } from "../../components"

export const Home = () => {
  return (
    <section className="section section-xl">
      <Hero />
      <HomeCategories />
      <HomeWishlist />
      <HomeOffers />
      <HomeFeaturedProducts />
    </section>
  )
}
