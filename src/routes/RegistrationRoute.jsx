import { Route, Routes } from 'react-router-dom'
import { Registration, EmailValidation, NameValidation, PasswordValidation } from '../pages'

export const RegistrationRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Registration />}></Route>
      <Route path="/email-validation" element={<EmailValidation />}></Route>
      <Route path="/name-validation" element={<NameValidation />}></Route>
      <Route path="/password-validation" element={<PasswordValidation />}></Route>
    </Routes>
  )
}
