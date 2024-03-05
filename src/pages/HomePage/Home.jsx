import { Hero, HomeCategories, HomeFeaturedProducts, HomeOffers, HomeWishlist } from "../../components"

export const Home = () => {
  return (
    <section className="home">
      <Hero />
      <HomeCategories />
      <HomeWishlist />
      <HomeOffers />
      <HomeFeaturedProducts />
    </section>
  )
}
