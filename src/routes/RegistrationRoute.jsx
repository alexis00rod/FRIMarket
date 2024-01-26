import { Route, Routes } from 'react-router-dom'
import { Registration, EmailValidation, NameValidation, PasswordValidation } from '../pages'
import { RegistrationContextProvider } from '../context/RegistrationContext/RegistrationContext'

export const RegistrationRoute = () => {
  return (
    <RegistrationContextProvider>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/email-validation" element={<EmailValidation />} />
        <Route path="/name-validation" element={<NameValidation />} />
        <Route path="/password-validation" element={<PasswordValidation />} />
      </Routes>
    </RegistrationContextProvider>
  )
}
