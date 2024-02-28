import { Hero, HomeCategories, HomeFeaturedProducts, HomeOffers, HomeWishlist } from "../../components"

export const Home = () => {
  return (
    <main className="flex flex-col grow">
      <section className="w-full max-w-[1200px] px-2 py-4 mx-auto flex flex-col gap-4">
        <Hero />
        <HomeCategories />
        <HomeWishlist />
        <HomeOffers />
        <HomeFeaturedProducts />
      </section>
    </main>
  )
}
