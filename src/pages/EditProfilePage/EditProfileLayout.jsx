import { Outlet } from "react-router-dom"

export const EditProfileLayout = () => {
  return (
    <main className="flex flex-col grow">
      <section className="w-full max-w-[600px] mx-auto px-2 py-4 flex flex-col gap-4">
        <Outlet />
      </section>
    </main>
  )
}
