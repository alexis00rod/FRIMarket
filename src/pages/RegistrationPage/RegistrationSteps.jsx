import { useRegistrationContext } from "./context/RegistrationContext"
import { RegistrationStepItem } from "./components/RegistrationStepItem"

export const RegistrationSteps = () => {
  const {steps, userToRegister,step} = useRegistrationContext()

  return (
    <section className="section section-sm">
      <div className="form">
        <h2 className="form-title">Completá los datos para crear tu cuenta</h2>
        <ul className="mt-6 flex flex-col">
          {steps.map(e => {
            if(step === e.id) return <RegistrationStepItem key={e.id} item={e} />
            if(step < e.id) return <RegistrationStepItem key={e.id} item={e} state='pending' />
            if(step > e.id) return <RegistrationStepItem key={e.id} item={e} state='finish' user={userToRegister} />
          })}
        </ul>
      </div>
    </section>
  )
}
