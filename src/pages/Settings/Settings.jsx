import { NavLink, Outlet } from "react-router-dom"
import { Breadcrumb } from "../../components"

const SettingLink = ({children,...props}) => {
  return (
    <NavLink {...props}
      className={({isActive}) => `w-full px-2 py-2 flex items-center justify-between gap-2 hover:text-yellow-500 ${isActive && "text-yellow-500"}`}
      >
      {children}
    </NavLink>
  )
}

export const Settings = () => {
  return (
    <>
      <Breadcrumb></Breadcrumb>
      <main className="w-full max-w-screen-2xl mx-auto px-2 py-4 flex flex-col grow">
        <div className="w-full flex gap-4">
          <aside className="w-full max-w-xs h-max px-2 py-2 flex flex-col flex-none bg-white border border-gray-300 divide-y divide-gray-300 rounded-md">
            <SettingLink to='/settings/profile'>Editar perfil</SettingLink>
            <SettingLink to='/settings/privacity'>Privacidad</SettingLink>
          </aside>
          {/* <section className="w-full px-2 py-2 flex flex-col bg-white border border-gray-300 divide-y divide-gray-300 rounded-md"> */}
            <Outlet />
          {/* </section> */}
        </div>
      </main>
    </>
  )
}
