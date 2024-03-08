import { useRegistrationContext } from "./context/RegistrationContext"
import { RegistrationStepItem } from "../../components"

export const RegistrationSteps = () => {
  const {steps, userToRegister,step} = useRegistrationContext()

  return (
    <section className="registration">
      <div className="registration-form">
        <h2>Completá los datos para crear tu cuenta</h2>
        <div className="registration-steps">
          {steps.map(e => {
            if(step === e.id) return <RegistrationStepItem key={e.id} item={e} />
            if(step < e.id) return <RegistrationStepItem key={e.id} item={e} state='pending' />
            if(step > e.id) return <RegistrationStepItem key={e.id} item={e} state='finish' user={userToRegister} />
          })}
        </div>
      </div>
    </section>
  )
}
