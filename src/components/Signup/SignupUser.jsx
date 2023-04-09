import { InputEmail } from "../Form/InputEmail"
import { InputPassword } from "../Form/InputPassword"

export const SignupUser = ({user,err, ...props}) => {
  const {email, password, confirmPassword, conditions} = user

  return (
    <div className="w-full flex flex-col gap-4">
      {err && <p className="w-full px-2 py-2 text-sm text-red-500">{err}</p>}
      <InputEmail 
      label='Email' 
      size='input-l'
      value={email} 
      {...props}
      required
      />
      <InputPassword 
      label='Contraseña' 
      size='input-l'
      id='password' 
      value={password} 
      {...props} 
      required
      />
      <InputPassword 
      label='Repetir contraseña' 
      size='input-l'
      id='confirmPassword' 
      value={confirmPassword} 
      {...props}
      required
      />
      <div className="w-full px-2">
        <div className="w-max flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="conditions" id="conditions" {...props} />
          <label htmlFor="conditions" className="cursor-pointer">Aceptar terminos y condiciones</label>
        </div>
      </div>
    </div>
  )
}
