import { useRegistrationContext } from "./context/RegistrationContext"
import { RegistrationStepItem } from "./components/RegistrationStepItem"

export const RegistrationSteps = () => {
  const {steps, userToRegister,step} = useRegistrationContext()

  return (
    <main className="grow flex flex-col">
      <section className="w-full md:max-w-[33rem] mx-auto md:mt-12 px-6 md:px-12 md:py-12 grow md:grow-0 bg-white md:border md:border-slate-300 md:rounded-md">
        <h2 className="mt-6 md:mt-0 text-2xl font-medium">Completá los datos para crear tu cuenta</h2>
        <ul className="mt-6 flex flex-col">
          {steps.map(e => {
            if(step === e.id) return <RegistrationStepItem key={e.id} item={e} />
            if(step < e.id) return <RegistrationStepItem key={e.id} item={e} state='pending' />
            if(step > e.id) return <RegistrationStepItem key={e.id} item={e} state='finish' user={userToRegister} />
          })}
        </ul>
      </section>
    </main>
  )
}
